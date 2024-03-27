# OpenRadioDB
 Test MySQL database for broadcast transmitter data.

## Introduction
This runs as a multi container Docker application, with MySQL database and PHPMyAdmin database administration tool.

## Pre-requisites
Node.js
Docker (if you want to run the database via a containerised MariaDB setup)

## Instructions

**Docker:**

- Build and start the containers by running `docker-compose up -d` from the root directory of the project
- In browser, navigate to http://localhost:8080 to load the PHPMyAdmin interface
- Log-in using `root` user with the `MYSQL_ROOT_PASSWORD` password value as set in the .env file.
  
**Without Docker:**
  
- Install and setup MariaDB
- Create a database called `ordb`
- Import the included `ordb.sql` file to create the correct tables.

**REST middleware:**
- If not using Docker, modify the `ORDB-REST\config.js` file to take into account your database credentials.
- In the **ORDB-REST** directory, run -
  ```
  npm install
  node .
  ```
- The REST service should now be running on port 3000.
- There is one functional endpoint - `http://0.0.0.0:3000/tx-records`
- A `GET` request to this endpoint will get all of the records in the database as JSON data.
- A `POST` request can be used to push records into the database. The records need to be JSON encoded in the body of the request. A formatting example can be found in the `testimport.json` file.

## To-do
This is only a very basic initial version of this system to show how a database for the project might be structured, and how data might be imported. Some future improvements include -

- Enable direct CSV file import.
- Allow filtering when getting records.
- Update existing records where a duplicate is found.

 
