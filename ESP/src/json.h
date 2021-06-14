#ifndef json_H    // To make sure you don't declare the function more than once by including the header multiple times.
#define json_H

#include <ArduinoJson.h>
#include <string.h>
#include <bits/stdc++.h>

typedef struct RawData {
  const char* dataType;
  float value;
};

StaticJsonDocument<200> convertToJson(RawData (&rawData)[5]);

#endif