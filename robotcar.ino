#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Motor A
const int motor1Pin1 = 15;
const int motor1Pin2 = 13;
const int enable1Pin = 14;

// Motor B
const int motor2Pin1 = 2;
const int motor2Pin2 = 0;
const int enable2Pin = 12;

// Duty Cycle
const int dutyCycle = 255;

// WiFi Credentials
const char* ssid = "";
const char* password = "";

// Server URL
const char* serverUrl = "http://192.168.8.141:8080/RobotCarRemote/sendStatus?id=12&Status=1";

WiFiClient client;

void setup() {
  // Initialize Serial
  Serial.begin(115200);
  
  // Initialize Motor Pins
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);

  pinMode(motor2Pin1, OUTPUT);
  pinMode(motor2Pin2, OUTPUT);
  pinMode(enable2Pin, OUTPUT);

  // Connect to WiFi
  connectToWiFi();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(client, "http://192.168.8.141:8080/RobotCarRemote/sendStatus?id=12&Status=1");

    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Server Response: " + response);

      // Parse JSON
      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, response);

      if (!error) {
        String command = doc["message"];
        controlMotors(command);
      } else {
        Serial.print("JSON Parsing Failed: ");
        Serial.println(error.c_str());
      }
    } else {
      Serial.print("HTTP Request Failed, Code: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi disconnected. Reconnecting...");
    connectToWiFi();
  }

  delay(1000); 
}

void connectToWiFi() {
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  unsigned long startAttemptTime = millis();

  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
    delay(1000);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected! IP Address: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nWiFi Connection Failed.");
  }
}

void controlMotors(String command) {
  if (command == "Forward") {
    runForward();
  } else if (command == "Backward") {
    runBackward();
  } else if (command == "Right") {
    turnRight();
  } else if (command == "Left") {
    turnLeft();
  } else {
    stopMotors();
  }
}

void runForward() {
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  analogWrite(enable1Pin, dutyCycle);

  digitalWrite(motor2Pin1, HIGH);
  digitalWrite(motor2Pin2, LOW);
  analogWrite(enable2Pin, dutyCycle);

  Serial.println("Motors running forward");
}

void runBackward() {
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, HIGH);
  analogWrite(enable1Pin, dutyCycle);

  digitalWrite(motor2Pin1, LOW);
  digitalWrite(motor2Pin2, HIGH);
  analogWrite(enable2Pin, dutyCycle);

  Serial.println("Motors running backward");
}

void turnRight() {
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  analogWrite(enable1Pin, dutyCycle);

  digitalWrite(motor2Pin1, LOW);
  digitalWrite(motor2Pin2, HIGH);
  analogWrite(enable2Pin, dutyCycle);

  Serial.println("Motors turning right");
}

void turnLeft() {
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, HIGH);
  analogWrite(enable1Pin, dutyCycle);

  digitalWrite(motor2Pin1, HIGH);
  digitalWrite(motor2Pin2, LOW);
  analogWrite(enable2Pin, dutyCycle);

  Serial.println("Motors turning left");
}

void stopMotors() {
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, LOW);
  analogWrite(enable1Pin, 0);

  digitalWrite(motor2Pin1, LOW);
  digitalWrite(motor2Pin2, LOW);
  analogWrite(enable2Pin, 0);

  Serial.println("Motors stopped");
}
