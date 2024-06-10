const jwt = require(`jsonwebtoken`);
// const cors = require("cors");
const PgPromise = require("pg-promise");
const express = require("express");
const fs = require("fs");
require("dotenv").config();
const {
    default: axios
} = require("axios");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const API = require("./api");
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static("client"));
// app.use(cors());


// THE CORES ARE ADDED FOR HEROKU AND THEY ARE USED ON ALL MY ROUTES
const cors = require('cors');
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://wehavejoy.github.io/computer_literacy/");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});

const config = {
    connectionString:

        process.env.DATABASE_URL || "postgresql://postgres:sino123@localhost:5432/postgres",

};

if (process.env.NODE_ENV == 'PRODUCTION') {
    config.ssl = {
        rejectUnauthorized: false
    }
}

const db = pgp(config);

API(app, db);

const PORT = process.env.PORT || 4003;

app.listen(PORT, function () {
    console.log(`App started on port http://localhost:${PORT}`);
});