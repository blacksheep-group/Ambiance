#include <SPI.h>
#include <LoRa.h>

#define CS      17   // chip select pin 
#define RST     14   // reset pin
#define G       26   // I/O pin

void setup() {
  Serial.begin(115200);
  Serial.println("Sending packet...");
  while (!Serial);
   
  Serial.println("LoRa Sender");

  // override the default CS, I/O (G0), and reset pins
  LoRa.setPins(CS, RST, G);

  if (!LoRa.begin(433E6)) {   // initialize ratio at 433 MHz
    Serial.println("LoRa init failed. Check your connections.");
    while (true);             
  }
  Serial.println("LoRa init succeeded.");

  LoRa.setSyncWord(0xF3);
}

void loop() {
  // For debugging
  Serial.println("Sending packet...");

  LoRa.beginPacket();
  LoRa.print("Merakified");
  LoRa.endPacket();

  delay(1000); 
}
