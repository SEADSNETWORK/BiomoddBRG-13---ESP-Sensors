#include "sensor.h"
#include "json.h"
#include "json.cpp"

// defines here

void sensorSetup() {
  // sensor setup code here
}

StaticJsonDocument<200> sensorCode() {
  
  // sensor code here

  //return jsonData;

  RawData rawData[] = {
    {.dataType = "sensor_value_1", .value = 0},
    {.dataType = "sensor_value_2", .value = 0}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
