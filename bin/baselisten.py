
import serial

mac = '/dev/tty.usbserial-A603GDYK'
rpi = '/dev/ttyUSB0'

ser = serial.Serial(rpi, 115200)

nest_level = 0
msg = ""
data = {}

while 'sensors' not in data:
    char = ser.read()
    msg += char
    if char == "{":
        nest_level += 1
    elif char == "}":
        nest_level -= 1
        if nest_level == 0:
            done = True
            data = msg

print data
