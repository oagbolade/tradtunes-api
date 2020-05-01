var models = require('../models');
const firstleveladmin = models.firstleveladmin
const bcrypt = require('bcryptjs')
const jwtAdmin = require('jsonwebtoken');
const keys = require('../config/keys');
const validateLoginInput = require('../util/validation/adminLogin')



exports.AdminLogin = (req, res) => {

    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    firstleveladmin.findOne({
        where: {
            email
        }
    })
        .then(admin => {
            // Check for user
            if (!admin) {
                return res.status(404).json({
                    email: 'User not found'
                });
            }
            // Check Password
            bcrypt.compare(password, admin.password).then(isMatch => {
                if (isMatch) {
                    // admin Matched
                    const payload = {
                        id: admin.id,
                        name: admin.name,
                        email: admin.email
                    }; // Create jwtAdmin Payload

                    // Sign Token
                    jwtAdmin.sign(
                        payload,
                        keys.secretOrKey, {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }
                    );
                } else {

                    return res.status(400).json({
                        password: 'Password incorrect'
                    });
                }
            });
        }).catch(err => res.status(404).json({
            noadminfound: 'No admin found'
        }));
}

exports.ReturnAdmin = (req, res) => {

    res.json({
        id: req.admin.id,
        name: req.admin.name,
        email: req.admin.email

    });
}


