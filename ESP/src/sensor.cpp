#include "sensor.h"
#include "json.h"
#include "json.cpp"

// Pin declaration and other defines here



void sensorSetup() {
  
  // sensor setup code here


}

StaticJsonDocument<200> sensorCode() {
  
  // sensor loop code here


  // return jsonData;

  // put sensor result here below! MAX 2 value's due to buffer overflow.

  RawData rawData[] = {
    {.dataType = "humidity", .value = "a value"},
    {.dataType = "temperature_c", .value = "another value"}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
