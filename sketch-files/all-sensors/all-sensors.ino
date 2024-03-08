#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include "Adafruit_SGP30.h"
#include <LoRa.h>

#define CS 17   
#define RST 14   
#define G 26  
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
  LoRa.setPins(CS, RST, G); // Set pins for LoRa
  while (!Serial) {
  }
  if (!bme.begin()) {
    Serial.println("Failed to initialize BME680 sensor!");
    while (1); // Infinite loop
  } 
  if (!sgp.begin()){
    Serial.println("Failed to initialize SGP30 sensor!");
    while (1); // Infinite loop
  } 
  if (!LoRa.begin(433E6)) {   // initialize radio at 433 MHz
    Serial.println("Failed to initialize LoRa radio!");
    while (true); // Infinite loop
  } else {
    LoRa.setSyncWord(0xF3);
    // Set up oversampling and filter initialization
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
    bme.setPressureOversampling(BME680_OS_4X);
    bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
    bme.setGasHeater(320, 150); // 320°C for 150 ms
  }
}

void loop() {
  // Error handling for BME680 sensor
  if (!bme.performReading()) {
    Serial.println("Failed to perform BME680 reading!");
    delay(1000);
    return;
  }

  // Error handling for SGP30 sensor
  if (!sgp.IAQmeasure()) {
    Serial.println("Failed to perform SGP30 reading!");
    delay(1000);
    return;
  }

  // Sending sensor data via LoRa
  LoRa.beginPacket();

  // Location
  Serial.println("location:CONDOTEL");
  LoRa.println("location:CONDOTEL");
  
  // Temperature
  Serial.print("temperature:");
  Serial.println(bme.temperature);
  LoRa.print("temperature:");
  LoRa.println(bme.temperature);

  // Pressure
  Serial.print("pressure:");
  Serial.println(bme.pressure / 100.0);
  LoRa.print("pressure:");
  LoRa.println(bme.pressure / 100.0);

  // Humidity
  Serial.print("humidity:");
  Serial.println(bme.humidity);
  LoRa.print("humidity:");
  LoRa.println(bme.humidity);

  // Gas resistance
  Serial.print("gas:");
  Serial.println(bme.gas_resistance / 1000.0);
  LoRa.print("gas:");
  LoRa.println(bme.gas_resistance / 1000.0);

  // TVOC
  Serial.print("tvoc:"); 
  Serial.println(sgp.TVOC);
  LoRa.print("tvoc:");
  LoRa.println(sgp.TVOC);

  // eCO2
  Serial.print("eco2:"); 
  Serial.println(sgp.eCO2); 
  LoRa.print("eco2:");
  LoRa.print(sgp.eCO2);
  LoRa.endPacket();
  delay(1000);
}
