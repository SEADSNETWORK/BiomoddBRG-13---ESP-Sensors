#include <Arduino.h>

int Sensor = 13;   //Input Pin
int LED = 32;     // Led pin for Indication

void setup() {
  
  Serial.begin(9600);
  delay(3000);

  // Turn on the blacklight and print a message.
  pinMode (Sensor, INPUT);  //Define Pin as input
  pinMode (LED, OUTPUT);    //Led as OUTPUT
  Serial.println("Waiting for motion");
  digitalWrite(LED, 0);
}
 
void loop() {
  int sensorValue = digitalRead(Sensor);
  
  if(sensorValue == 1){
    digitalWrite(LED, 1);
    Serial.println(sensorValue);
    Serial.println("Motion Detected");
  }

  if(sensorValue == 0){
    digitalWrite(LED, 0);
    Serial.println(sensorValue);
    Serial.println("NO Motion");
  }  
  delay(1000);
}
