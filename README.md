# OpenRadioDB
 Test MySQL database for broadcast transmitter data.

## Introduction
This runs as a multi container Docker application, with MySQL database and PHPMyAdmin database administration tool.

##Pre-requisites
Docker

##Instructions
- Build and start the containers by running `docker-compose up -d` from the root directory of the project
- In browser, navigate to http://localhost:8080 to load the PHPMyAdmin interface
- Log-in using `root` user with the `MYSQL_ROOT_PASSWORD` password value as set in the .env file.

##To-do
This is only a very basic initial version of this system to show how a database for the project might be structured. For the moment it only contains transmitter data for FM transmissions in the UK and Gibraltar, sourced from the data provided by Ofcom (the UK's media regulator). There are lots of things to add to make it fully functional, including -

- Split out tables further, to have RDS data and program info in separate tables.
- Add some kind of user data and authentication for updates.
- Add 'staging' tables where updates can be stored before being approved.
- Create interface code for database operations, this could be a REST API using node.js.

 