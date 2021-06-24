#include <json.h>

template<std::size_t SIZE>
StaticJsonDocument<200> convertToJson(std::array<RawData, SIZE> &rawData){
  StaticJsonDocument<200> jsonData;
  for(const RawData dataItem: rawData){

    // normalisatie hier

    if(dataItem.normalize == true){
      if(dataItem.value > dataItem.maxValue || dataItem.value < dataItem.minValue){
        jsonData[dataItem.dataType] = 'Value exceeding boundries';
      }else{

        // normalisatie hier

        float ratio = dataItem.value / dataItem.maxValue;


        jsonData[dataItem.dataType] = ratio;
      }
    }else{
      jsonData[dataItem.dataType] = dataItem.value;
    }

    
    
  }
  return jsonData;
}