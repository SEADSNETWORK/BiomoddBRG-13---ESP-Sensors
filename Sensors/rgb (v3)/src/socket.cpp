#include "socket.h"

// constructor

Socket::Socket(char host[], int port, char path[], const char * sslFingerprint){
  if (useSSL) {
    webSocket.beginSSL(host, port, path, sslFingerprint);
    webSocket.setAuthorization(serverUsername, serverPassword);
  } else {
    Serial.println("SSL not Required");
  }
}

Socket::Socket(char host[], int port, char path[]){
  if (useSSL) {
    Serial.println("SSL Required");
  } else {
    webSocket.begin(host, port, path);
  }
}

// send data with socket
void Socket::emit(char protocol[], char data[]){
  char result[100];

  strcpy(result,"\"");
  strcat(result,data);
  strcat(result,"\"");

  //webSocket.emit(protocol, result);
  webSocket.emit(protocol, data);
}

void Socket::emitJson(char protocol[], StaticJsonDocument<200> jsonBuffer){
  char jsonChar[200];
  serializeJson(jsonBuffer, jsonChar);

  Serial.println(jsonChar);
  Serial.println("");

  emit(protocol, jsonChar);
}