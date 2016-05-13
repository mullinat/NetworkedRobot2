// Adafruit Motor shield library
// copyright Adafruit Industries LLC, 2009
// this code is public domain, enjoy!
//THIS EXAMPLE SKETCH HAS BEEN SLIGHTLY MODIFIED
#include <AFMotor.h>

AF_DCMotor leftMotor(1);
AF_DCMotor rightMotor(3);

void setup() {
  Serial.begin(9600);           // set up Serial library at 9600 bps
  Serial.println("Motor test!");

  // turn on motor
  leftMotor.setSpeed(255);
  rightMotor.setSpeed(255);
 
  leftMotor.run(RELEASE);
  rightMotor.run(RELEASE);
}

void loop() {
  if(Serial.available()){
    int i = Serial.read();
    if (i == 'W'){
      leftMotor.run(FORWARD);
      rightMotor.run(FORWARD);
    }
    if (i == 'A'){
      leftMotor.run(BACKWARD);
      rightMotor.run(FORWARD);
    }    if (i == 'S'){
      leftMotor.run(BACKWARD);
      rightMotor.run(BACKWARD);
    }    if (i == 'D'){
      leftMotor.run(FORWARD);
      rightMotor.run(BACKWARD);
    }    if (i == 'Q'){
      leftMotor.run(RELEASE);
      rightMotor.run(RELEASE);
    }                
  }
}
