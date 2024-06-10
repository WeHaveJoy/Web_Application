# Create vite app

```
 npm create vite@latest
 ````

# Build an API using PosgreSQL and pg-promise

## Get going

The run an `npm install`.

# Server side:

## Database setup


Connect to the database using the postgresql user.

On Ubuntu use this command:

```
sudo -u postgres psql;
```

created a database & user:

```sql
create database database_name;
create role user login password 'your_password';
grant all privileges on database database_name to user;
```

Added the following entry to the `.env` file in the root of your project.

```
DATABASE_URL=postgres://user:your_password@localhost:5432/database_name
```

## Create the tables
created sql folder and table.sql file to keep the data for my tables.

Connected to the database using this command:

```
psql -U user -d database_name
```

created api.js file for my api end points.
created index.js file for connecting to the database and setting the port number and declaring dependencies.
created a test file for testing my api functions
created a travis file for runing my tests

# Client side

created main.js file 
created app.js file for calling the APIs in the front-end
created index.html for the structure of the web app, for the sigup and login form.


# How it works

Sign-up or login as a user
Once you're logged in, you can view the device data by clicking the link for viewing data.