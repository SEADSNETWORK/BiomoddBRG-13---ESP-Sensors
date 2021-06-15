#include <Arduino.h>
#include <string>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

#include <socket.h>
#include <sensor.h>

const char* ssid = "FPDreamTeam";
const char* password =  "fullproject";

char host[] = "10.0.0.1"; // Socket.IO Server Address
int port = 2200; // Socket.IO Port Address
char path[] = "/socket.io/?transport=websocket"; // Socket.IO Base Path /socket.io/?transport=websocket
bool useSSL = false; // Use SSL Authentication
const char * sslFingerprint = "";  // SSL Certificate Fingerprint
bool useAuth = false; // use Socket.IO Authentication

const char * espId = "ESP_DHT10";

unsigned long previousMillis = 0;
int interval = 2000;


WiFiServer wifiServer(port);
Socket* socket = new Socket(host, port, path);

// function declaration

void locate();


// socket functions
void connected(const char * payload, size_t length) {
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

    socket->emit("identifier", result);

  }else if(String(payload) == String("locate")){
    locate();
  }else{
    Serial.print("unknown command");
  }

}


void setup() {
	Serial.begin(9600);

  // pin configuration

  pinMode(21, OUTPUT); // locate led

  // SENSOR SETUP HERE!
  sensorSetup();

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
  socket->webSocket.on("connect", connected);
  socket->webSocket.on("event", socket_event);

}

void loop() {

  socket->webSocket.loop();

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval){

    // Change here the frequency of measurements and sending data with the websocket
    //delay(500);

    //StaticJsonDocument<200> sensorData = sensorCode();

    socket->emitJson("sensor_data", sensorCode());

    //serializeJson(sensorData, Serial);




    previousMillis = millis();
  }

}



// functions

void locate(){ // flash led to locate ESP
  for (size_t i = 0; i < 10; i++)
  {
    digitalWrite(21, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(500);                       // wait for a second
    digitalWrite(21, LOW);    // turn the LED off by making the voltage LOW
    delay(500);
  }
  
}