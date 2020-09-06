# Beer-Truck-Monitoring
Monitors and reports the temperature of individual cargo in the truck or trailer

This project uses a web front-end to configure temperature ranges for each type of cargo. It allows the user to view the current temperatures of the cargo.
The server periodically gets the temperature. It determines if the temperature is outside the configured range and then alerts the user.

The code kept simple. This improves troubleshooting and performance. The system is expected on run on hardware installed in a vehicle. Hardware installed in vehicles
need low power consumption and be resilient. This usually results in the hardware having low resources. The software should work within these restrictions.

Future changes
I would write the server and webserver in lua which may require lower resources and allow a more stable system than nodejs.
Drastically improve the UI to so it user friendly and meets his requirements once the requirements are understood.

To Run
npm install
npm test
npm start
Open http://localhost:8000/
The UI updates every one minute. 
Clicking on a block displays the historical temperature of the beer or cargo

Without knowing the full requirements like user requirements and hosting/hardware requirements I kept the system and logic basic so expansion can be easy 