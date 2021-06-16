#ifndef socket_H
#define socket_H

#include <SocketIoClient.h>
#include <ArduinoJson.h>

class Socket{
  private:
    boolean useSSL = false;

    const char * serverUsername = "socketIOUsername";
    const char * serverPassword = "socketIOPassword";

    void addEventListeners();

  public:
    SocketIoClient webSocket;

    Socket(char host[], int port, char path[], const char * sslFingerprint);
    Socket(char host[], int port, char path[]);

    void connected(const char * payload, size_t length);
    void socket_event(const char * payload, size_t length);

    void emit(char protocol[], char data[]);
    void emitJson(char protocol[], StaticJsonDocument<200> jsonObject);
};

#endif