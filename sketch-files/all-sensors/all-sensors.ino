#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME680.h>

// Define the BME680Sensor class
class BME680Sensor {
public:
  BME680Sensor() : initialized(false) {}

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

    Serial.print("temperature:");
    Serial.print(bme.temperature);
    Serial.println("°C");

    Serial.print("pressure:");
    Serial.print(bme.pressure / 100.0); // Convert Pa to hPa
    Serial.println("hPa");

    Serial.print("humidity:");
    Serial.print(bme.humidity);
    Serial.println("%");

    Serial.print("gas:");
    Serial.print(bme.gas_resistance / 1000.0); // Convert ohms to kOhms
    Serial.println("kOhms");
  }

private:
  Adafruit_BME680 bme;
  bool initialized;
};

BME680Sensor bme680Sensor;

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    delay(100); 
  }
  
  while (!bme680Sensor.begin()) {
    delay(2000); 
  }
}

void loop() {
  bme680Sensor.readSensor();
  delay(1000); 
}
