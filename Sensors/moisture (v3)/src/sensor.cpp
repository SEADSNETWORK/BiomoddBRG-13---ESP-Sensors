#include "sensor.h"
#include "json.h"
#include "json.cpp"

// Pin declaration and other defines here

int sensorpin = 34;
int sensorVal;

void sensorSetup() {
  
  // sensor setup code here
  pinMode(sensorpin, INPUT);

}

StaticJsonDocument<200> sensorCode() {
  
  // sensor loop code here
  sensorVal = analogRead(sensorpin);

  // return jsonData;

  // put sensor result here below! MAX 2 value's due to buffer overflow.

  RawData rawData[] = {
    {.dataType = "moisture", .value = sensorVal}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
