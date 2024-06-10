const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()
const API = require('../server/api');
const { default: axios } = require('axios');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);
API(app, db);


describe('web app tests', () => {
    before(async function () {
        this.timeout(5000);
        
         await db.none(`delete from the_user`);

    });

    it('should have a test method', async () => {
        const response = await supertest(app)
            .get('/api/test')
            .expect(200);
        assert.deepStrictEqual({ name: 'joe' }, response.body);
    });

    it('should be able to signup a new user', async () => {
        const response = await supertest(app)
            .post('/api/signUp')
            .send({
                first_name: 'zizo',
                last_name: 'beda',
                username: 'zizobeda@gmail.com',
                password: 'password'
            })
            .expect(200);
        const users = response.body.data;
        const signup = response.body.message;
        assert.deepStrictEqual('User created!', signup);
    });

    it('should be able to throw an error when the user already exists', async () => {
        const response = await supertest(app)
            .post('/api/signUp')
            .send({
                first_name: 'zinzi',
                last_name: 'mandela',
                username: 'mandela@gmail.com',
                password: 'password',
                
            })
            .expect(200);

            const res = await supertest(app)
            .post('/api/signUp')
            .send({
                first_name: 'zinzi',
                last_name: 'mandela',
                username: 'mandela@gmail.com',
                password: 'password'
            })
            .expect(500);


        // const users = response.body.data;
        // const signup = response.body.error;
        const sign = response.body.error;
        assert.deepStrictEqual('User already exists!', sign);
    });

    it('should be able to login an existing user', async () => {
        const response = await supertest(app)
            .post('/api/logIn')
            .send({
                username: 'zizobeda@gmail.com',
                password: 'password',
            })
            .expect(200);
        const users = response.body.data;
        const login = response.body.message;
        assert.deepStrictEqual('You are loged in', login);
    });

    it('should throw an error when the user does not exist', async () => {
        const response = await supertest(app)
            .post('/api/logIn')
            .send({
                username: 'hlomae@gmail.com',
                password: 'pass'
            })
            .expect(500);
        const login = response.body.error;
        assert.deepStrictEqual("The user does not exists", login);
    });

    

    after(async () => {

        db.$pool.end();
    });
}).timeout(5000);




