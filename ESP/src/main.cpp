#include <Arduino.h>
#include <string>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>

#include <SocketIoClient.h>

const char* ssid = "FPDreamTeam";
const char* password =  "fullproject";

char host[] = "10.0.0.1"; // Socket.IO Server Address
int port = 2200; // Socket.IO Port Address
char path[] = "/socket.io/?transport=websocket"; // Socket.IO Base Path /socket.io/?transport=websocket
bool useSSL = false; // Use SSL Authentication
const char * sslFingerprint = "";  // SSL Certificate Fingerprint
bool useAuth = false; // use Socket.IO Authentication
const char * serverUsername = "socketIOUsername";
const char * serverPassword = "socketIOPassword";

const char * espId = "ESP-1";


WiFiServer wifiServer(port);
SocketIoClient webSocket;


void socket_Connected(const char * payload, size_t length) {
  Serial.println("Connection made.");
}

void socket_event(const char * payload, size_t length) {
  Serial.print("got message: ");
  Serial.println(payload);

  if(String(payload) == String("get_name")){
    char result[100];
    strcpy(result,"\"");
    strcat(result,espId);
    strcat(result,"\"");

    webSocket.emit("identifier", result);
  }else{
    Serial.print("unknown command");
  }

}


void setup() {
	Serial.begin(9600);

  // wifi

	WiFi.begin(ssid, password);

	Serial.print("Connecting to WiFi..");
	while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

	Serial.println("");
 
  Serial.print("Connected to the WiFi network. IP:");
  Serial.println(WiFi.localIP());

	// Setup 'on' listen events
  webSocket.on("connect", socket_Connected);
  webSocket.on("event", socket_event);

  // Setup Connection
  if (useSSL) {
    webSocket.beginSSL(host, port, path, sslFingerprint);
  } else {
    webSocket.begin(host, port, path);
  }
  
  // Handle Authentication
  if (useAuth) {
    webSocket.setAuthorization(serverUsername, serverPassword);
  }

}

void loop() {

	/*
  WiFiClient client = wifiServer.available();
 
  if (client) {
 
    while (client.connected()) {
 
      while (client.available()>0) {
        char c = client.read();
        Serial.write(c);
      }

      delay(10);
    }
 
    client.stop();
    Serial.println("Client disconnected");
 
  }
  */

  webSocket.loop();

}