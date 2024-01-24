const express = require('express')
const router = express.Router();
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "asdfqwer!@SDsdfg3456sd#dfg"

router.post('/login',
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Incorrect Password').isLength({ min: 5 }),

    async (req, resp) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email
        console.log("email from api req/input body: ",email)
        console.log("password from api req/input body: ",req.body.password)

        try {
            let userData = await User.findOne({ email })
            console.log("userData from db", userData)
            console.log("userData id from db", userData._id)
            console.log("password from db",userData.password)
            if (!userData) {
                return resp.status(400).json({ error: "Try login with correct credentials" })
            }
            console.log(req.body.password === userData.password)

            const comparePassword = await bcrypt.compare(req.body.password, userData.password)
            console.log("comparePassword: ", comparePassword)
            if (!comparePassword) {
                return resp.status(400).json({ error: "Try login with correct password" })
            }

            // data must be an object. It is required for signature.
            const data = {
                user: {
                    id: userData.id
                }
            }

            // generate authToken using Header, Payload, and jwtSecret
            const authToken = jwt.sign(data, jwtSecret)
            resp.json({ success: true, authToken });
        }
        catch (error) {
            console.log("error: ","Password is incorrect")
            resp.json({ success: false });
        }
    })

module.exports = router;