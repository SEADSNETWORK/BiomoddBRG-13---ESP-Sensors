#ifndef statusled_H
#define statusled_H

#include <Arduino.h>

class StatusLed{

  public:
   enum Status {STARTING_UP, READY, SENDING, RECEIVING, ERROR, LOCATE};

  private:
    int ledPin = 21; // pin where the status led is connected
    Status status;
  public:
    StatusLed();
    void watchStatus();
    void changeStatus(Status newStatus);
};

#endif