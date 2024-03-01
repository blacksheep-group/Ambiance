#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include "Adafruit_SGP30.h"
#include <LoRa.h>

#define CS 17   
#define RST 14   
#define G0 26  
#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME680 bme;
Adafruit_SGP30 sgp;


uint32_t getAbsoluteHumidity(float temperature, float humidity) {
    const float absoluteHumidity = 216.7f * ((humidity / 100.0f) * 6.112f * exp((17.62f * temperature) / (243.12f + temperature)) / (273.15f + temperature)); // [g/m^3]
    const uint32_t absoluteHumidityScaled = static_cast<uint32_t>(1000.0f * absoluteHumidity); // [mg/m^3]
    return absoluteHumidityScaled;
}

void setup() {
 Serial.begin(9600);
  while (!Serial) {
    delay(100);
  }
  if (!bme.begin()) {
    Serial.println("temperature:None");
    Serial.println("pressure:None");
    Serial.println("humidity:None");
    Serial.println("gas:None");
    delay(1000); 
  } 
  else {
    // Set up oversampling and filter initialization
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
    bme.setPressureOversampling(BME680_OS_4X);
    bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
    bme.setGasHeater(320, 150); // 320°C for 150 ms
  }
}

void loop() {
  //location
  Serial.println("location:CONDOTEL");
  //error handling for bme
  if (! bme.performReading()) {
    Serial.println("temperature:None");
    Serial.println("pressure:None");
    Serial.println("humidity:None");
    Serial.println("gas:None");
    return;
    delay(1000);
  }
  //temperature
  Serial.print("temperature:");
  Serial.println(bme.temperature);
  //pressure
  Serial.print("pressure:");
  Serial.println(bme.pressure / 100.0);
  //humidity
  Serial.print("humidity:");
  Serial.println(bme.humidity);
  //BVOC
  Serial.print("gas:");
  Serial.println(bme.gas_resistance / 1000.0);

  delay(1000);
}



