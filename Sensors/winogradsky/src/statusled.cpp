#include <statusled.h>

StatusLed::StatusLed(){
  pinMode(this->ledPin, OUTPUT);
  this->status = STARTING_UP;
}

void StatusLed::watchStatus(){
    switch (this->status){
      case STARTING_UP:
        digitalWrite(this->ledPin, HIGH);
        delay(500);
        digitalWrite(this->ledPin, LOW);
        delay(250);
        break;
      case READY:
        digitalWrite(this->ledPin, LOW);
        break;
      case SENDING:
      case RECEIVING:
        digitalWrite(this->ledPin, HIGH);
        delay(50);
        digitalWrite(this->ledPin, LOW);
        delay(50);
        digitalWrite(this->ledPin, HIGH);
        delay(50);
        digitalWrite(this->ledPin, LOW);
        this->status = READY;
      case ERROR:
        digitalWrite(this->ledPin, HIGH);
        delay(10);
        digitalWrite(this->ledPin, LOW);
        delay(10);
        break;
      case LOCATE:
        for (size_t i = 0; i < 50; i++){
          digitalWrite(this->ledPin, HIGH);
          delay(100);
          digitalWrite(this->ledPin, LOW);
          delay(100);
        }
        this->status = READY;
        break;
      default:
        break;
    }
  
}

void StatusLed::changeStatus(Status newStatus){
  status = newStatus;
}