#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include "Adafruit_SGP30.h"
#include <SPI.h>
#include <LoRa.h>

#define BME_SCK 22
#define BME_MISO 12
#define BME_MOSI 11
#define BME_CS 10
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
    delay(10); }

  if (! sgp.begin()){
    Serial.println("Sensor not found :(");
    while (1);
  }

  Serial.print(sgp.serialnumber[0], HEX);
  Serial.print(sgp.serialnumber[1], HEX);
  Serial.println(sgp.serialnumber[2], HEX);
  
}

void loop() {
  Serial.println("location:CONDOTEL");

  Serial.print("TVOC:"); 
  Serial.println(sgp.TVOC);
  Serial.print("ECO2:"); 
  Serial.println(sgp.eCO2); 


  delay(1000);
}



