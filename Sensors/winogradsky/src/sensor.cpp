#include "sensor.h"
#include "json.h"
#include "json.cpp"

// defines here
#include <Adafruit_ADS1X15.h>
Adafruit_ADS1115 ads;  /* Use this for the 16-bit version */


unsigned long lastTime = 0;
unsigned long timerDelay = 60000; // 60 seconds-> 60 datapoints/hr -> 1440 datapoint/24hrs.

void sensorSetup() {
  // sensor setup code here
  // ADS1115 Setup
  Serial.println("Single-ended readings from AIN0 with >3.0V comparator");
  Serial.println("ADC Range: +/- 6.144V (1 bit = 3mV/ADS1015, 0.1875mV/ADS1115)");
  Serial.println("Comparator Threshold: 1000 (3.000V)");

  // The ADC input range (or gain) can be changed via the following
  // functions, but be careful never to exceed VDD +0.3V max, or to
  // exceed the upper and lower limits if you adjust the input range!
  // Setting these values incorrectly may destroy your ADC!
  //                                                          ADS1115
  //                                                          -------
  // ads.setGain(GAIN_TWOTHIRDS);  // 2/3x gain +/- 6.144V    0.1875mV (default)
  ads.setGain(GAIN_ONE);          //  1x gain   +/- 4.096V    0.125mV

  //ads.setGain(GAIN_TWO);        //  2x gain   +/- 2.048V    0.0625mV
  //ads.setGain(GAIN_FOUR);       //  4x gain   +/- 1.024V    0.03125mV
  // ads.setGain(GAIN_EIGHT);     //  8x gain   +/- 0.512V    0.015625mV
  // ads.setGain(GAIN_SIXTEEN);   //  16x gain  +/- 0.256V    0.0078125mV

  ads.begin();

  // Setup 3V comparator on channel 0
  ads.startComparator_SingleEnded(0, 1000);
}

StaticJsonDocument<200> sensorCode() {
  
  // Modified for testing from https://github.com/SEADSNETWORK/BiomoddBRG13-ESP32-ADS115-IoT/blob/main/ESP32_Biomodd_TSPEAK_05.ino

  //Get value from ADS1115
    int16_t adc0;

    adc0 = ads.getLastConversionResults();

    //Serial Print
    Serial.print("AIN0: "); Serial.println(adc0 * 0.125); // 1x gain example
    Serial.println("----------------");
    Serial.println("Hello, this is my pulse:");
    Serial.println(adc0 * 0.125); // single value (ico. Processing)
    Serial.println("- - - - - - - - ");
    delay(3000);
    //lastTime = millis();


  //return jsonData;

  RawData rawData[] = {
    {.dataType = "ADC Pulse", .value = adc0 * 0.125}
  };

  const size_t n = sizeof(rawData) / sizeof(rawData[0]);

  std::array<RawData, n> convertedRawData;
  std::copy(std::begin(rawData), std::end(rawData), convertedRawData.begin());

  StaticJsonDocument<200> jsonData = convertToJson(convertedRawData);

  return jsonData;

}
