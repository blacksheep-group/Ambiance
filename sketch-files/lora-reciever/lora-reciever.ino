#include <SPI.h>
#include <LoRa.h>

#define CS      17   // chip select pin
#define RST     14   // reset pin
#define DI0     26   // I/O pin

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Receiver");

  // override the default CS, I/O (G0), and reset pin
  LoRa.setPins(CS, RST, DI0);

  if (!LoRa.begin(433E6)) {   // initialize ratio at 433 MHz
    Serial.println("LoRa init failed. Check your connections.");
    while (true);             
  }
  Serial.println("LoRa init succeeded.");

  // use the same value (sync word) as the transmitter
  LoRa.setSyncWord(0xF3);


}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {

    Serial.print("Received packet: ");


    while (LoRa.available()) {
      String LoRaData = LoRa.readString();
      Serial.print(LoRaData); 
    }
 
    Serial.print(" with RSSI ");
    Serial.println(LoRa.packetRssi());
  }
}
