#include "sensor.h"
#include "json.h"
#include "json.cpp"

// defines here
const int calatheaPin = A1;
int motorPin[] = {5, 6, 10, 11};
int potValue = 0;
int motorValue = 0;

const int loPlusPin = 3;
const int loMinPin = 2;

void sensorSetup() {
  pinMode(loPlusPin, INPUT); // setup for lead off detection LO +
  pinMode(loMinPin, INPUT); // setup for lead off detection LO -

  for(int i = 0; i < 4; i++){
    pinMode(motorPin[i], OUTPUT);
  }
  
  Serial.begin(9600);
}

StaticJsonDocument<200> sensorCode() {
  
  if((digitalRead(loPlusPin) == 1) || (digitalRead(loMinPin) == 1)){
    
    potValue = 0;
  }else{
    //send value of analog input 0:
    potValue = analogRead(calatheaPin);   
  }
  
  Serial.write(potValue);
  delay(1);
  
  motorValue = map(potValue, 0, 1023, 0, 255);

  for(int i = 0; i < 4; i++){
    digitalWrite(motorPin[i], motorValue);
  }

  //return jsonData;

  RawData rawData[] = {
    {.dataType = "heartbeat value", .value = 0}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
