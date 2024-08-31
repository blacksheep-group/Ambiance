#include <Wire.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"

Adafruit_BME680 bme;
bool initialized;

int baud = 9600;
int ms = 1000;

bool begin() {
  if (!bme.begin()) {
    Serial.println("exception:Failed to initialize BME680 sensor.");
    return false;
  }
  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_2X);
  bme.setPressureOversampling(BME680_OS_4X);
  bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
  bme.setGasHeater(320, 150); 
  initialized = true;
  return true;
}

void readSensor() {
  if (!initialized) {
    Serial.println("exception:Failed to initialize BME680 sensor.");
    return;
  }

  if (!bme.performReading()) {
    Serial.println("exception:BME680 sensor failed to perform sensor reading.");
    return;
  }

  Serial.println("exception:None");

  Serial.print("temperature:");
  Serial.println(bme.temperature);

  Serial.print("pressure:");
  Serial.println(bme.pressure / 100.0); 

  Serial.print("humidity:");
  Serial.println(bme.humidity);

  Serial.print("gas:");
  Serial.println(bme.gas_resistance / 1000.0); 
}

void setup() {
  Serial.begin(baud);
  while (!Serial) {
    delay(ms); 
  }
  while (!begin()) {
    delay(ms); 
  }
}

void loop() {
  Serial.println("location:PUP-Manila");
  readSensor();
  delay(ms); 
}
