

 /*
  Rotary Encoder Demo
  rot-encode-demo.ino
  Demonstrates operation of Rotary Encoder
  Displays results on Serial Monitor
  DroneBot Workshop 2019
  https://dronebotworkshop.com
*/
 
 // Rotary Encoder Inputs
 #define inputCLK 15
 #define inputDT 27
 #define inputCLK1 32
 #define inputDT1 14

  

 int JoyStick_X = 4; //x
 int JoyStick_Y = 36; //y
 //int JoyStick_Z = 13; //key
 
 int counter = 0; 
 int currentStateCLK;
 int previousStateCLK; 
 int steps = 0;
 String encdir = "NONE";

 

 int currentStateCLK1;
 int previousStateCLK1;
 int steps1 = 0;
 String encdir1 = "NONE";
 

 

 const int buttonPin = 21; 
 int buttonState = LOW;
 int prevButtonState = LOW;

 int timer = 0;
 int timerMax = 50000;
 
 void setup() { 
   
   // Set encoder pins as inputs  
   pinMode (inputCLK,INPUT);
   pinMode (inputDT,INPUT);
   pinMode (inputCLK1,INPUT);
   pinMode (inputDT1,INPUT);
   pinMode(buttonPin, INPUT);

 

   //pinMode(JoyStick_Z, INPUT);
   
   // Setup Serial Monitor
   Serial.begin (9600);
   
   // Read the initial state of inputCLK
   // Assign to previousStateCLK variable
   previousStateCLK = digitalRead(inputCLK);
   previousStateCLK1 = digitalRead(inputCLK1); 

 

   
 } 
 
 void loop() { 

  // Rotary encoders

// Read the current state of inputCLK
   currentStateCLK = digitalRead(inputCLK);
   currentStateCLK1 = digitalRead(inputCLK1);
    
   // If the previous and the current state of the inputCLK are different then a pulse has occured
   if (currentStateCLK != previousStateCLK){ 
     // If the inputDT state is different than the inputCLK state then 
     // the encoder is rotating counterclockwise
     if (digitalRead(inputDT) != currentStateCLK) { 
       steps --;
       if(steps < 0){
        steps = 359;
       }
       encdir ="CCW";
       
     } else {
       // Encoder is rotating clockwise
       steps ++;
       if(steps > 359){
        steps = 0;
       }
       encdir ="CW"; 
       
     }
   }

 

  previousStateCLK = currentStateCLK; 

   if (currentStateCLK1 != previousStateCLK1){ 
     // If the inputDT state is different than the inputCLK state then 
     // the encoder is rotating counterclockwise
     if (digitalRead(inputDT1) != currentStateCLK1) { 
       steps1 --;
       if(steps1 < 0){
        steps1 = 359;
       }
       encdir1 ="CCW";
       
     } else {
       // Encoder is rotating clockwise
       steps1 ++;
       if(steps1 > 359) {
        steps1 = 0;
       }
       encdir1 ="CW";
       
     }
   }
   
   // Update previousStateCLK with the current state
    previousStateCLK1 = currentStateCLK1;  

  // Joystick
  
    int x,y,z;
    x = analogRead(JoyStick_X);
    y = analogRead(JoyStick_Y);
    //z = digitalRead(JoyStick_Z);

  // Button
  buttonState = digitalRead(buttonPin);

  if(buttonState == HIGH && prevButtonState == LOW){
    Serial.println("START");
  }

  prevButtonState = buttonState;
  // Timer + prints

  if(timer == timerMax){
    timer = 0;
    Serial.println("Joystick");
    Serial.print("X: ");
    Serial.println(x);
    Serial.print("Y: ");
    Serial.println(y);
    Serial.println("");
    Serial.println("Rotary Encoder 1");
    Serial.print("Steps: ");
    Serial.println(steps);
    Serial.print("Direction: ");
    Serial.println(encdir);
    Serial.println("");
    Serial.println("Rotary Encoder 2");
    Serial.print("Steps: ");
    Serial.println(steps1);
    Serial.print("Direction: ");
    Serial.println(encdir1);
    Serial.println("");
  }
  else {
    timer++;
  }
 }

 


 
