const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");

module.exports = (app, db) => {


     //The sign up page
     app.post("/api/signUp", async (req, res) => {
        const { first_name, last_name, username, password} = req.body;
        let errorMsg = ""
        try {

            const findUser = await db.oneOrNone(
                `SELECT * FROM the_user WHERE username= $1`,
                [username]
            );

            if (findUser != null) {


                throw Error(`User already exists!`);
            } else {

                const pass = await bcrypt.hash(password, 10);

                await db.none(
                    `INSERT INTO the_user (first_name, last_name, username, password) VALUES ($1,$2,$3,$4)`,
                    [first_name, last_name, username, pass]
                );
            }
            res.status(200).json({
                message: "User created!",
                errorMsg: "Invalid login details"
            });

        } catch (error) {
            // console.log(error.message);
            res.status(500).json({
                error: error.message,

            });
        }
    }); 


    //The login page
    app.post("/api/logIn", async (req, res) => {
        try {
            const { username, password } = req.body;

            const findUser = await db.oneOrNone(
                `SELECT * FROM the_user WHERE username = $1`,
                [username]
            );

            // console.log(findUser + "this is a logged user")

            if (!findUser) {

                throw Error(`The user does not exist`);

            }

            const isValid = await bcrypt.compare(password, findUser.password);
            if (!isValid) {

                throw Error(`Please enter the correct password`);
            }

            let token = jwt.sign(findUser, `secretKey`, { expiresIn: `24h` });

            res.status(200).json({
                message: "You are loged in",
                token,
                user: findUser,
            });

        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    });


    app.get("/api/device_data", async (req, res) => {

        try {
            

            const display_data = await db.manyOrNone(`SELECT * FROM device_data`);

            res.status(200).json({

                theData: display_data
            });

        } catch (error) {
            // console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    })


}