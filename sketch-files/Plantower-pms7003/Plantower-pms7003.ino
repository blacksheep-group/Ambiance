#include "PMS.h"

HardwareSerial SerialPMS(1);
PMS pms(SerialPMS);
PMS::DATA data;

#define RXD2 16
#define TXD2 17

void setup() {
  Serial.begin(9600);
  SerialPMS.begin(9600, SERIAL_8N1, RXD2, TXD2);
}

void loop() {

  Serial.print("pm1:");
  Serial.println(data.PM_AE_UG_1_0);
  Serial.print("pm2:");
  Serial.println(data.PM_AE_UG_2_5);
  Serial.print("pm10:");
  Serial.println(data.PM_AE_UG_10_0);
  delay(1000);
}
