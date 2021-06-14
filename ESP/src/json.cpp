#include <json.h>

StaticJsonDocument<200> convertToJson(RawData (&rawData)[5]){
  StaticJsonDocument<200> jsonData;

  for(const RawData dataItem: rawData){
    jsonData[dataItem.dataType] = dataItem.value;
  }

  return jsonData;
}