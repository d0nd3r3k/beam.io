# Author: Spencer Russell
# Email: spencer.f.russell@gmail.com
# Github: ssfrr
# Description: Parse the JSON data sent by the Tidmarsh sensor node via serial ports.

import serial

#mac = '/dev/tty.usbserial-A603GDYK'
#mac = '/dev/tty.usbmodem1411'
rpi = '/dev/ttyUSB0'

ser = serial.Serial(rpi, 115200)

nest_level = 0
msg = ""
data = {}

while 'data' not in data:
    char = ser.read()
    if ord(char) > 127 or ord(char) == 0: 
    	continue
    msg += char
    if char == "{":
        nest_level += 1
    elif char == "}":
        nest_level -= 1
        if nest_level == 0:
            done = True
            data = msg

print data

ser.close()