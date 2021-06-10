


const int wet = 163; // value for wet sensor

const int dry = 583; // value for dry sensor

// the wet-dry values of the sensors were different. So I took the highest dry-value and the lowest wet-value
// It's still not accurate because of it but way better than working with the values of just one sensor (which I did before).


void setup()
{ 
  Serial.begin(9600);
}

void loop()
{
 
  int sensor2Val = analogRead(A1);
  int sensor3Val = analogRead(A2);
  int sensor1Val = analogRead(A3);
  

  int percentageHumidity1 = map(sensor1Val, wet, dry, 100, 0); 
  int percentageHumidity2 = map(sensor2Val, wet, dry, 100, 0); 
  int percentageHumidity3 = map(sensor3Val, wet, dry, 100, 0); 

byte anArray [] = {percentageHumidity1, percentageHumidity2, percentageHumidity3};

  float averageHumidity = {
    (anArray[0] + anArray[1] + anArray[2] )/3.0};
  
  

  Serial.print(averageHumidity);
  Serial.println("%");
  
  delay(100);
}
