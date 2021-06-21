# Plant-Sensors 🌻

## ESP CODE

### Sources
* [WebSocketsClient](https://github.com/zaphoyd/websocketpp)
* [SocketIoClient](https://github.com/timum-viw/socket.io-client)
*Note: SocketIoClient is only compatible with Socket.io v2.x.x. Newer versions will not work*

### Flashing to ESP
1. Clone this repository.
2. Install PlatformIO plugin for VSCode.
3. In VSCode: File > New Window.
4. Open PlatformIO plugin (left side, 'Bee' icon).
5. Open project, select a sensor folder in the sensor folder.
6. Open `src/main.cpp`, change `const char * espId = "ESP-1";` to an unique indetifier name.
7. Optional: change host url to the ip adress of your node server, change ssid and password to connect to your wifi network.
8. Build project.
9. Flash project.


### Add own sensor code
1. Clone this repository.
2. Make a new folder in the sensor folder.
3. Copy the ESP Template code to your own folder.
4. Add libraries to the lib folder.
5. Include library in the sensor.h file.
6. You can code in the `sensor.cpp` file. (In the function `sensorSetup()` you can add the code that you normaly place in the `setup()` function, in the function `sensorCode()` you can add the code that you normaly place in the `loop()` function.)
7. see "Flashing to ESP" to flash your code.