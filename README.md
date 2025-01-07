<h1>RobotCarRemote</h1>
<p><strong>An IoT Remote Control Car System developed using ESP8266, Arduino, Java, and React Native.</strong></p>

<hr>
<h2>Overview</h2>
<p>
        RobotCarRemote is an innovative IoT project that transforms an ordinary car into a remotely controlled smart car. 
        This system integrates hardware and software components to enable seamless control via a React Native mobile application.
</p>
<p>
        The project leverages the ESP8266 microcontroller for wireless communication, Arduino for hardware control, Java for backend integration, 
        and React Native for an intuitive and user-friendly mobile interface.
</p>
<hr>
<h2>Features</h2>
<ul>
    <li><strong>Real-time Remote Control</strong>: Control the car's movement in real time using a mobile application.</li>
    <li><strong>Wi-Fi Communication</strong>: Uses ESP8266 for wireless communication between the car and the mobile app.</li>
    <li><strong>Customizable Controls</strong>: User-friendly interface built with React Native, allowing personalized control settings.</li>
    <li><strong>Sensor Integration</strong>: Optional integration with sensors (e.g., ultrasonic, IR) for obstacle detection and autonomous features.</li>
    <li><strong>Modular Design</strong>: Easy to extend or modify for additional features.</li>
</ul>

<hr>
    <h2>Technologies Used</h2>
    <h3>Hardware:</h3>
<ul>
    <li>ESP8266 (Wi-Fi Module)</li>
    <li>Arduino (Microcontroller)</li>
    <li>Motors, Sensors, and Power Modules</li>
</ul>
<h3>Software:</h3>
<ul>
    <li>React Native (Mobile App)</li>
    <li>Java (Backend API)</li>
    <li>Arduino IDE (Firmware Development)</li>
</ul>
<hr>
<h2>Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
    <li><strong>Hardware</strong>: ESP8266, Arduino, motor driver module, power supply, and basic electronic components.</li>
    <li><strong>Software</strong>: Arduino IDE, Node.js and npm, Java Development Kit (JDK).</li>
</ul>
<h3>Installation</h3>
<ol>
    <li>
        <strong>Clone the Repository:</strong>
        <pre><code>git clone https://github.com/yourusername/RobotCarRemote.git
cd RobotCarRemote</code></pre>
        </li>
        <li><strong>Setup Backend (Java):</strong>
            <p>Navigate to the <code>backend/</code> folder and build/run the backend server using your preferred Java tools.</p>
        </li>
        <li><strong>Setup Mobile App (React Native):</strong>
            <p>Navigate to the <code>mobile-app/</code> folder and install dependencies:</p>
            <pre><code>npm install</code></pre>
            <p>Start the development server:</p>
            <pre><code>npm start</code></pre>
        </li>
        <li><strong>Flash Firmware to ESP8266:</strong>
            <p>Open the <code>firmware/</code> code in Arduino IDE and flash it to your ESP8266 module.</p>
        </li>
        <li><strong>Assemble Hardware:</strong>
            <p>Connect the motors, sensors, and ESP8266 as per the provided circuit diagram in the <code>docs/</code> folder.</p>
        </li>
</ol>
<hr>
<h2>Usage</h2>
<ol>
    <li>Launch the backend server.</li>
    <li>Open the mobile app and connect to the car via Wi-Fi.</li>
    <li>Use the app's joystick or control buttons to operate the car.</li>
</ol>
<hr>
<h2>Circuit Diagram</h2>
<img src="https://github.com/hasunB/RobotCarRemote/blob/main/circuit_diagram.png" alt="Circuit Diagram">
<hr>
<h2>Screenshots</h2>
    <h3>Mobile App</h3>
    <img src="https://github.com/hasunB/RobotCarRemote/blob/main/Front-end(Mobile)/mobileapp.png" alt="Mobile App Screenshot">
    <h3>Hardware Setup</h3>
    <img src="docs/screenshots/hardware-setup.png" alt="Hardware Setup">
<hr>
<h2>Contribution</h2>
<p>We welcome contributions to improve RobotCarRemote! Follow these steps to contribute:</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create a new branch.</li>
    <li>Commit your changes.</li>
    <li>Submit a pull request.</li>
</ol>
<hr>
<h2>License</h2>
<p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for details.</p>
<hr>
<h2>Contact</h2>
<p>For any inquiries or suggestions, feel free to reach out:</p>
<ul>
    <li><strong>Email:</strong> <a href="mailto:hasunbandara17@gmail.com">Email</a></li>
</ul>
