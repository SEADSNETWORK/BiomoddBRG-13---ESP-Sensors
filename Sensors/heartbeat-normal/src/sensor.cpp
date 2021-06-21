#include "sensor.h"
#include "json.h"
#include "json.cpp"

// defines here

void sensorSetup() {
  Serial.begin(9600);
  pinMode(10, INPUT); // Setup for leads off detection LO +
  pinMode(11, INPUT); // Setup for leads off detection LO -
}

StaticJsonDocument<200> sensorCode() {
  
  if((digitalRead(10) == 1)||(digitalRead(11) == 1)){
    Serial.println('!');
  }
  else{
    // send the value of analog input 0:
      Serial.println(analogRead(A0));
  }
  //Wait for a bit to keep serial data from saturating
  delay(1);

  //return jsonData;

  RawData rawData[] = {
    {.dataType = "hearbeat value", .value = 0}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
