#include "sensor.h"
#include "json.h"
#include "json.cpp"

// defines here

void sensorSetup() {
  Serial.begin(9600);
  pinMode(15, INPUT); // Setup for leads off detection LO +
  pinMode(33, INPUT); // Setup for leads off detection LO -
}

StaticJsonDocument<200> sensorCode() {
  
  if((digitalRead(4) == 1)||(digitalRead(5) == 1)){
    StaticJsonDocument<200> jsonData;
    jsonData["error"] = "Pulse not in range to read!";
    return jsonData;
  }
  float pulse = analogRead(A0);
  //Wait for a bit to keep serial data from saturating
  delay(1);

  //return jsonData;

  RawData rawData[] = {
    {.dataType = "heartbeat value", .value = pulse}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
