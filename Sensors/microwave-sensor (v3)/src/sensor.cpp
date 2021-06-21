#include "sensor.h"
#include "json.h"
#include "json.cpp"

//tutorial code from seeedstudio
int MW_out = 36;  
uint8_t check_code;

void sensorSetup() {
  Serial.begin(9600);
  Serial1.begin(115200);
  pinMode(MW_out, INPUT);
}
 

StaticJsonDocument<200> sensorCode() {
  
  Serial.println(analogRead(MW_out));
  delay(2000);
  if (Serial1.available()){
    //Serial.println("data be ready to present");
    uint8_t begin_code = Serial1.read();
    delay(10);
    uint8_t state_code = Serial1.read();
    delay(10);
    uint8_t gear_code = Serial1.read();
    delay(10);
    uint8_t delay_code = Serial1.read();
    delay(10);
    check_code = Serial1.read();
  }
  //return jsonData;

  //check_code = 175: object stops
  //check_code = 173: object comes closer
  //check_code = 174: object is leaving
  RawData rawData[] = {
    {.dataType = "checkcode", .value = check_code}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
