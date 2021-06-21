#ifndef SENSOR_H    // To make sure you don't declare the function more than once by including the header multiple times.
#define SENSOR_H

#include <ArduinoJson.h>
#include <json.h>
#include <Adafruit_VL53L0X.h>

void sensorSetup();
StaticJsonDocument<200> sensorCode();

#endif