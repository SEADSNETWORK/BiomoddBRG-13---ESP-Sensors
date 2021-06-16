#include "sensor.h"
#include "json.h"
#include "json.cpp"

#define DHTPIN 5
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void sensorSetup() {
  dht.begin();
}

StaticJsonDocument<200> sensorCode() {
  
  // sensor code here

  //return jsonData;

  RawData rawData[] = {
    {.dataType = "sensor_value_1", .value = "value"},
    {.dataType = "sensor_value_2", .value = "value"}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
