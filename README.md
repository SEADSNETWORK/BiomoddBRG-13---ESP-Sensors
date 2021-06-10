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
5. Open project, select ESP folder.
6. Open `src/main.cpp`, change `const char * espId = "ESP-1";` to an unique indetifier name.
7. Optional: change host url to the ip adress of your node server, change ssid and password to connect to your wifi network.
8. Build project.
9. Flash project.
## Node test server code

### Sources
* [Socket.io](https://www.npmjs.com/package/socket.io)
*Note: SocketIoClient is only compatible with Socket.io v2.x.x. Newer versions will not work*

### Installing/Starting server
* Clone this repository.

You have now 2 choices: Running the server with Docker (This will run all services) or just only the node server with nodejs.

**Running server with nodejs.**
1. Make sure you have node and npm installed on your machine.
2. Navigate to the folder `NodeServer/app/` with your terminal.
3. Execute this command to install all the node modules: `npm i`
4. Start the server with this command: `node index.js`

**Running server with docker**
1. Install docker and docker-compose on your machine.
2. Navigate to the folder `NodeServer` with your terminal.
3. Start the server with this command: `docker-compose up -d` if you want to run the container in the background or `docker-compose up` if you want to see the live logs (works only when you are in the same folder where the docker-compose.yaml file is located).

### Extra: Docker commands
If you are using docker to run the server, here are some usefull commands:
* `docker container ls` - See all your running containers.
* `docker attach fpnode` - Watch live logs of the fpnode docker container.
* `docker compose down` - If you want to terminate the docker containers that are running in the background (works only when you are in the same folder where the docker-compose.yaml file is located).
* To terminate the container when you are watching the live logs, press `ctrl + c`.