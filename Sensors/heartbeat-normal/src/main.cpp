// FIRST

// check if the sensor library is present in the lib folder
// include the library in sensor.h file
// write setup en loop codes in sensor.cpp
// change the espId to an unique identifier (line 30)


#include <Arduino.h>
#include <string>
#include <EEPROM.h>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

#include <socket.h>
#include <sensor.h>
#include <statusled.h>

const char* ssid = "biomodd";
const char* password =  "SEADSBRG13";

char host[] = "192.168.0.111";
int port = 2200;
char path[] = "/socket.io/?transport=websocket"; // Socket.IO Base Path /socket.io/?transport=websocket
bool useSSL = false;
const char * sslFingerprint = "";
bool useAuth = false;

const int espIdAdressSize = 10;
const char * espId = "ESP_HEA_2"; // change this to an unique identifier.
const int version = 3;

unsigned long previousMillis = 0;
int interval = 2000; // time between sensor mesuerements


WiFiServer wifiServer(port);
Socket * socket = new Socket(host, port, path);
StatusLed * statusManager = new StatusLed();

// function declaration

const char * getEspId();
void setEspId(byte* first, size_t len);

// socket functions
void connected(const char * payload, size_t length) {
  Serial.println("Connection made.");
}

void socket_event(const char * payload, size_t length) {
  Serial.print("got message: ");
  Serial.println(payload);

  statusManager->changeStatus(StatusLed::RECEIVING);

  if(String(payload) == String("get_name")){

    EspData espData = {
      .eid = espId,
      .version = version
    };

    StaticJsonDocument<200> jsonEspData;
    jsonEspData["espId"] = espData.eid;
    jsonEspData["version"] = espData.version;

    socket->emitJson("identifier", jsonEspData);

    statusManager->changeStatus(StatusLed::READY);

  }else if(String(payload) == String("locate")){
    statusManager->changeStatus(StatusLed::LOCATE);
  }else if(String(payload) == String("change_name")){

  }else{
    Serial.print("unknown command");
  }

}

// V4 Maybe
void socket_changeName(const char * payload, size_t length){
   
}


void setup() {
	Serial.begin(9600);

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
  socket->webSocket.on("changename", socket_changeName);

}

void loop() {

  socket->webSocket.loop();

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval){
    statusManager->watchStatus();
    socket->emitJson("sensor_data", sensorCode());
    statusManager->changeStatus(StatusLed::SENDING);
    previousMillis = millis();
  }

}




// functies

const char * getEspId(){
  byte res;
  for(int i = 0; i < espIdAdressSize; i++){
    res = EEPROM.read(i);
    Serial.print((char)res);
  }
}

void setEspId(byte* first){
  for(int i = 0; i < espIdAdressSize; i++){
	  EEPROM.write(i, first[i]);
  }
}