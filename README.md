# AIG-Meal-Tracker
This project allows a user to track his calories consumtion whilst tracking the meals. A user can keep adding his meals multiple times a day with calories consumed. Its a **PWA** app which can be locally installed on the user machine without downloading it as an standalone application.

## Environment

- Backend: (Run using `npm start`)
	- node: 14.17.1
	- express: 4.17.1
	- DB: File IO
    - To run `cd ./server/` > `npm i` > `npm start`
- Frontend:  (Run using `npm start`)
	- ReactJS: 16.13.1
	- CRA: 4.0.1
	- Material UI: 4.11.0
    - To run `cd ./client/` > `npm i` > `npm start`

## Project Stucture
The project structure is divided into two parts viz. **client** and **server**. Client holds the frontend project build on ReactJS and the server exposes the APIs using Express to communicate with the frontend.

##### CLIENT
The frontend is build upon ReactJS, a JS library. ReactJS, in contrast to Angular (a JS framework) is a lighweight library to quickly build fast performing single-page-applications.
The frontend is essentially divided into 2 parts, **components** and **containers**.
- **components**: This contains all the independent components which can be injected into any page while providing required properties (props).
- **containers**: Each folder represnts a page comprising of multiple components. The containers interact with the backend through REST APIs to visualize the data.
- **Context**: React's context APIs have been used to manage the user session objects and related metadata. Context behaves as a central store, the data in which can be accessed by any of the components.
- **public**: This folder contains the public assests and manifest files to make the app **PWA** compatible.
- **.env**: Holds the environment variables like API base path and are injected in when the app is booted. 

Other external resources used by the frontend app includes MaterialUI, Material-icons, 2 external fonts served by CDN in index.html

##### SERVER
The backend uses NodeJS and Express to serve the APIs and handling the storage of the data.
The server is divided into 2 parts, **models**, **controllers**.
- **index.js**:  The root controller of the application and other related configuration are based inside in this file. All the environment variables are initialized into process as the app is booted up.
- **controllers**: This direcory holds the controller files for each module (user.js. meal.js)
- **models**: This directory holds the Bean models for each module as a class. Each class contains related member functions and variables. Each module inside also contains a json file where the data is stored using File IO.
- **auth.js**: The authentication **middleware** function lies into this file which performs auth for all the required incoming requests with exception of a few. For authentication, custom **JWT** has been implemented, excluding the refresh_token logic.
- **util.js and constant.js**:  The utility methods goes into the util file. Other constants like API endpoints are stored in constant.js.
- **.env**: Holds the environment variables like JWT secret and are injected in when the app is booted.

## Design Decisions
Given the complexity of the project, relatively lightweight languages have been choosen. 

- **Modularity: **The code is **modularized** in a way to handle further enhancements. All the independent components must go in components dir. Similarly for each module addition, a seperate model and controller should be created.
- **Security**:
	- As specified above, JWT is been implemented for securing the required APIs. 
	- The `.env` files contains the required key value pairs. (**NOTE: To make this project run without any setup, the env file will be checked in the github, which is NOT recommended**)
	- **brcypt** module has been used to hash the password and save into the store.
- **Database: ** Again, keeping the complexity and setup of the project in mind, no actual database has been used, but normal File IO. MySQL can be used along with Sequelize, if needed to go with a RDBMS.
