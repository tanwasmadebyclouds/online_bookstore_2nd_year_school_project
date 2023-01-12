const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');

const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')

router = express.Router();

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})




const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT username FROM users WHERE username = ?", [value])
    if (rows.length > 0) {
        const message = 'This username is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

// const signupSchema = Joi.object({
//     email: Joi.string().required().email(),
//     mobile: Joi.string().required().pattern(/0[0-9]{9}/),
//     first_name: Joi.string().required().max(150),
//     last_name: Joi.string().required().max(150),
//     // gender: Joi.string().required().max(150),
//     // datebirth: Joi.string().required().max(150),
//     password: Joi.string().required().custom(passwordValidator),
//     confirm_password: Joi.string().required().valid(Joi.ref('password')),
//     username: Joi.string().required().min(3).max(20).external(usernameValidator),
// })

router.post('/user/signup', async (req, res, next) => {
    console.log(req.body)
    // try {
    //     await signupSchema.validateAsync(req.body, { abortEarly: false })
    // } catch (err) {
    //     return res.status(400).send(err)
    // }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5)
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const mobile = req.body.mobile
    const datebirth = req.body.datebirth
    const gender = req.body.gender
    const role = "employee"
    const address = req.body.address

    try {
        const [rows1, fields1] = await conn.query(
            'INSERT INTO users(fname, lname, email, phone, birthday, username, password, role, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, mobile, datebirth, username, password, role, gender]
        )
        await conn.query(
            'INSERT INTO user_address(address, user_id) VALUES (?, ?)',
            [address, rows1.insertId]
        )
        conn.commit()
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})


router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    const username = req.body.username
    const password = req.body.password
    console.log(username, password)
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        // Check if username is correct
        const [users] = await conn.query(
            'SELECT * FROM users WHERE username=?',
            [username]
        )
        const user = users[0]
        if (!user) {
            throw new Error('Incorrect username or password')
        }

        // Check if password is correct
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect username or password')
        }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE user_id=?',
            [user.user_id]
        )
        console.log(tokens)
        let token = tokens[0]?.token
        console.log(token)
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(user_id, token) VALUES (?, ?)',
                [user.user_id, token]
            )
        }

        conn.commit()
        res.status(200).json({ 'token': token, 'user_id':user.user_id, 'user_role':user.role})
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})


router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})

// router.delete('/user/logout', isLoggedIn, async function (req, res, next) {
//     console.log(req.user)

//     const conn = await pool.getConnection();
//     await conn.beginTransaction();

//     try {
//         // Get Path files from the upload folder
//         const [rows1, fields1] = await pool.query(
//             'DELETE FROM tokens WHERE user_id=?', [req.user.user_id]
//         )

//         // commit
//         await conn.commit()
//         console.log('log out')
//     } catch (error) {
//         next(error)
//         await conn.rollback();
//         // res.status(500).json(error)
//     } finally {
//         conn.release();
//     }
// });



exports.router = router