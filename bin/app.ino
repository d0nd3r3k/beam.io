#include <Wire.h>
#include <Adafruit_BMP085.h>

/*************************************************** 
  This is an example for the BMP085 Barometric Pressure & Temp Sensor

  Designed specifically to work with the Adafruit BMP085 Breakout 
  ----> https://www.adafruit.com/products/391

  These displays use I2C to communicate, 2 pins are required to  
  interface
  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/

// Connect VCC of the BMP085 sensor to 3.3V (NOT 5.0V!)
// Connect GND to Ground
// Connect SCL to i2c clock - on "168/"328 Arduino Uno/Duemilanove/etc thats Analog 5
// Connect SDA to i2c data - on "168/"328 Arduino Uno/Duemilanove/etc thats Analog 4
// EOC is not used, it signifies an end of conversion
// XCLR is a reset pin, also not used here

Adafruit_BMP085 bmp;
  
void setup() {
  Serial.begin(9600);
  bmp.begin();
  
}
  
void loop() {

    Serial.print("\n{\"data\": {");
    Serial.print("\"beam_temp\":");
    Serial.print(bmp.readTemperature());
    Serial.print(",");
    
    Serial.print("\"beam_pressure\":");
    Serial.print(bmp.readPressure());
    Serial.print(",");

    Serial.print("\"beam_alt\":");
    Serial.print(bmp.readAltitude());
    Serial.print(",");    

    Serial.print("\"beam_real_alt\":");
    Serial.print(bmp.readAltitude(101500));    
    Serial.print("}}\n");
    
    delay(15000);
}
