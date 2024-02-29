#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include "Adafruit_SGP30.h"
#include <SPI.h>
#include <LoRa.h>

#define BME_SCK 13
#define BME_MISO 12
#define BME_MOSI 11
#define BME_CS 10
#define CS      17   // chip select pin 
#define RST     14   // reset pin
#define G       26   // I/O pin
#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME680 bme;
Adafruit_SGP30 sgp;


uint32_t getAbsoluteHumidity(float temperature, float humidity) {
    const float absoluteHumidity = 216.7f * ((humidity / 100.0f) * 6.112f * exp((17.62f * temperature) / (243.12f + temperature)) / (273.15f + temperature)); 
    const uint32_t absoluteHumidityScaled = static_cast<uint32_t>(1000.0f * absoluteHumidity); 
}

void setup() {
  Serial.begin(9600);
 
  // if (!bme.begin()) {
  //   Serial.println("Could not find a valid BME680 sensor, check wiring!");
  //   while (1);
  // }

  // // Set up oversampling and filter initialization
  // bme.setTemperatureOversampling(BME680_OS_8X);
  // bme.setHumidityOversampling(BME680_OS_2X);
  // bme.setPressureOversampling(BME680_OS_4X);
  // bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
  // bme.setGasHeater(320, 150); 

   if (! sgp.begin()){
    Serial.println("Sensor not found :(");
    while (1);
  }
  Serial.print("Found SGP30 serial #");
  Serial.print(sgp.serialnumber[0], HEX);
  Serial.print(sgp.serialnumber[1], HEX);
  Serial.println(sgp.serialnumber[2], HEX);

  LoRa.setPins(CS, RST, G);

  if (!LoRa.begin(433E6)) {   // initialize ratio at 433 MHz
    Serial.println("LoRa init failed. Check your connections.");
    while (true);             
  }
  Serial.println("LoRa init succeeded.");

  LoRa.setSyncWord(0xF3);
}

int counter = 0;
void loop() {

  // Adafruit-bme680
  // if (! bme.performReading()) {
  //   Serial.println("Failed to perform reading :(");
  //   return;
  // }
  // Serial.print("Temperature = ");
  // Serial.println(bme.temperature);
  // Serial.println(" *C");
  // LoRa.print(bme.temperature);
  

  // Serial.print("Pressure = ");
  // LoRa.print(bme.pressure / 100.0);
  // Serial.println(" hPa");

  // Serial.print("Humidity = ");
  // LoRa.print(bme.humidity);
  // Serial.println(" %");

  // // Serial.print("Gas = ");
  // LoRa.print(bme.gas_resistance / 1000.0);
  // // Serial.println(" KOhms");

// Adafruit-sgp30
if (! sgp.IAQmeasure()) {
    Serial.println("Measurement failed");
    return;
  }
  Serial.println("");
  Serial.print("TVOC = "); 
  Serial.print(sgp.TVOC); 
  Serial.println(" ppb");

  Serial.print("eCO2 "); 
  Serial.print(sgp.eCO2); 
  Serial.println(" ppm");

  if (! sgp.IAQmeasureRaw()) {
    Serial.println("Raw Measurement failed");
    return;
  }

  counter++;
  if (counter == 30) {
    counter = 0;

    uint16_t TVOC_base, eCO2_base;
    if (! sgp.getIAQBaseline(&eCO2_base, &TVOC_base)) {
      Serial.println("Failed to get baseline readings");
      return;
    }
    Serial.print("****Baseline values: eCO2: 0x"); Serial.print(eCO2_base, HEX);
    Serial.print(" & TVOC: 0x"); Serial.println(TVOC_base, HEX);
  }

 char tvocStr[10];  // Adjust the size based on your TVOC range
    snprintf(tvocStr, sizeof(tvocStr), "%d", sgp.TVOC);


  LoRa.beginPacket();
  LoRa.print(tvocStr);
  LoRa.endPacket();
}



