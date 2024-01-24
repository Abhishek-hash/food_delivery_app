const express = require('express')
const router = express.Router();
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')

router.post('/createuser',
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    // name must be at least 3 chars long
    body('name').isLength({ min: 3 }),

    async (req, resp) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10)
        let securedPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create(
                {
                    name: req.body.name,
                    password: securedPassword,
                    email: req.body.email,
                    location: req.body.location
                }
            )
            resp.json({ success: true });
        }
        catch (error) {
            console.log(error)
            resp.json({ sucess: false });
        }
    })

module.exports = router;