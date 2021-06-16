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
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    StaticJsonDocument<200> jsonData;
    jsonData["error"] = "Failed to read from DHT sensor!";
    return jsonData;
  }

  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);

  //return jsonData;

  RawData rawData[] = {
    {.dataType = "humidity", .value = h},
    {.dataType = "temperature_c", .value = t}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
