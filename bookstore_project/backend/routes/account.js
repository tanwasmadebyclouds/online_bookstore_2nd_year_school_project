const { json } = require("express");
const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../middlewares')

const router = express.Router();
const Joi = require('joi')

// <<<<<<<<< member >>>>>>>>>>>

const profileSchema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    birthday: Joi.string().required(),
    gender: Joi.required(),
    email: Joi.string().email().required().max(100),
    phone: Joi.string().required().pattern(/0[0-9]{9}/),
    address: Joi.string().required().max(255),
    user_address_no:Joi.required()
  }) 







router.put('/edit_profile_member/:userId', isLoggedIn,  async function (req, res, next) {
    console.log(req.body)
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        await profileSchema.validateAsync(req.body,  { abortEarly: false })
      } catch (err) {
       return res.status(400).json(err)
      }  

    try {

        await pool.query(
            'UPDATE users SET fname=?, lname=?, email=?, phone=?, birthday=?, gender=? WHERE user_id=?', [req.body.fname,
                req.body.lname, req.body.email, req.body.phone, req.body.birthday, req.body.gender ,req.params.userId],
        )

        await pool.query(
            'UPDATE user_address SET address=? WHERE user_address_no=? and user_id=?', [req.body.address, req.body.user_address_no, req.params.userId]
        )        

        const [users] = await pool.query(
            'SELECT `user_id`, `fname`, `lname`, `email`, `phone`, DATE_FORMAT(birthday, \'%Y-%m-%d\') birthday, `username`, `role`, `gender`, `address`, `user_address_no`' + 
            'FROM users join user_address using(user_id) WHERE user_id = ?', [req.params.userId]
        )

  
        await conn.commit()
        res.json(users[0])
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }

});


router.get('/getCartMember/:userId', isLoggedIn,  async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [carts] = await pool.query(
            'SELECT `delivery_address`, `total_price_cart`, DATE_FORMAT(create_date, \'%Y-%m-%d\') create_date, `promotion_id`, `cart_id`, `order_status`, `tracking_number`' + 
            'FROM cart WHERE user_id = ?', [req.params.userId]
        )
        await conn.commit()
        res.json(carts)
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});

router.get('/getInfo/:userId/:cartId', isLoggedIn,  async function (req, res, next) {
    console.log(req.params.userId, req.params.cartId)
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [info] = await pool.query(
            'SELECT `delivery_address`, `total_price_cart`, `create_date`, `unit_price`, `item_quantity`, unit_price*item_quantity `total_item`, `book_id`, `book_name`, `price`, `payment_date`, `amount_paid`,`payment_type`, `discount`'+
            'FROM cart join cart_item using(cart_id) join book using(book_id) left join payment using(cart_id) left join promotion using(promotion_id) where user_id=? and cart_id=?', [req.params.userId, req.params.cartId]
        )
        await conn.commit()
        console.log(info)
        res.json(info)
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});




router.get('/getAddress/:userId', isLoggedIn,  async function (req, res, next) {
    console.log(req.body)
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [address] = await pool.query(
            'SELECT *' + 
            'FROM user_address WHERE user_id = ?', [req.params.userId]
        )
        await conn.commit()
        res.json(address)
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});

const addressSchema = Joi.object({
    address: Joi.string().required().max(255),
    user_id: Joi.required()
  }) 

router.post('/addAddress', isLoggedIn,  async function (req, res, next) {
    console.log(req.body)

    try {
        await addressSchema.validateAsync(req.body,  { abortEarly: false })
      } catch (err) {
       return res.status(400).json(err)
      }  


    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [rows1, fields1] = await conn.query(
            "INSERT INTO user_address(address, user_id) " +
            "VALUES(?, ?);",
            [req.body.address, req.body.user_id]
        )

        const [rows2, fields2] = await conn.query(
            'SELECT * FROM `user_address` WHERE `user_address_no` = ?',
            [rows1.insertId]
        )

        await conn.commit()
        return res.json(rows2[0])
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});

const updateAddressSchema = Joi.object({
    address: Joi.string().required().max(255),
    user_address_no: Joi.required()
  }) 

router.put('/address_all/:userId', isLoggedIn,  async function (req, res, next) {
    console.log(req.body)
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        await updateAddressSchema.validateAsync(req.body,  { abortEarly: false })
      } catch (err) {
       return res.status(400).json(err)
      }  

    try {
        await pool.query(
            'UPDATE user_address SET address=? WHERE user_id=? and user_address_no=?', [req.body.address, req.params.userId, req.body.user_address_no]
        )
        await conn.commit()
        return res.json({ address: req.body.address })
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});


router.delete('/address_all/:userId/:user_address_no', isLoggedIn,  async function (req, res, next) {
    console.log(req.params.userId, req.params.user_address_no)
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        await pool.query(
            'DELETE FROM user_address WHERE user_id=? and user_address_no=?', [req.params.userId, req.params.user_address_no]
        )
        
        await conn.commit()
        console.log('delete success')
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});
router.put('/getPromotion1', isLoggedIn,  async function (req, res, next) {
    console.log(req.body)
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [books] = await pool.query(
            'SELECT * FROM promotion WHERE promotion_code = ?',[req.body.promotion_code]
        )
        await conn.commit()
        res.json(books[0])
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});
router.post('/addcart', isLoggedIn, async (req, res, next) => {
    console.log(req.body)
    // try {
    //     await signupSchema.validateAsync(req.body, { abortEarly: false })
    // } catch (err) {
    //     return res.status(400).send(err)
    // }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const delivery_address = req.body.delivery_address
    const total_price_cart = req.body.total_price_cart
    const user_id = req.body.user_id
    const order_status = "pending"
    const payment_type = req.body.payment_type
    const my_cart = req.body.my_cart
    const promotion =req.body.promotion
    const bookArray = []
    const bookArray2 = []
    const bookArrayquantity = []
    console.log(req.body)

    try {
        const [rows1, fields1] = await conn.query(
            'INSERT INTO cart(delivery_address, total_price_cart, promotion_id, user_id, order_status) VALUES (?, ?, ?, ?, ?)',
            [delivery_address, total_price_cart, promotion, user_id, order_status]
        )
        const [rows2, fields2] = await conn.query(
            'INSERT INTO payment(amount_paid, payment_type, cart_id) VALUES (?, ?, ?)',
            [total_price_cart, payment_type, rows1.insertId]
        )


        my_cart.forEach(book => {
            let books = [book.price, book.book_id, rows1.insertId, book.quantity];
            bookArray.push(books);
        });
        const [rows3, fields3] = await conn.query(
            'INSERT INTO cart_item(unit_price, book_id, cart_id, item_quantity) VALUES ?;',
            [bookArray]
        )


        my_cart.forEach(book1 => {
            let qbook = [book1.old_quantity - book1.quantity];
            bookArrayquantity.push(qbook);
        });


        my_cart.forEach(book2 => {
            let qbook = book2.old_quantity - book2.quantity
            let books2 = [book2.price,book2.book_name,'stock',book2.book_id,qbook,book2.image_url,book2.detail_book];
            bookArray2.push(books2);
        });

        console.log(bookArray2)

        const [rows5, fields5] = await conn.query(
            'INSERT INTO book(price,book_name,order_type,book_id,quantity,image_url,detail_book) VALUES ? ON DUPLICATE KEY UPDATE quantity=VALUES(quantity);',[bookArray2]
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

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
    }
    
    
    
    
    const changePasswordSchema = Joi.object({
        user_id: Joi.required(),
        username: Joi.required(),
        password: Joi.string().required(),
        new_password: Joi.string().required().custom(passwordValidator),
        confirm_password: Joi.string().required().valid(Joi.ref('new_password'))
     }) 
    
    
    router.put('/changePassword',  async function (req, res, next) {
        console.log(req.body)
        const conn = await pool.getConnection()
        await conn.beginTransaction();
    
        try {
            await changePasswordSchema.validateAsync(req.body,  { abortEarly: false })
          } catch (err) {
           return res.status(400).json(err)
          }  
    
          const new_password = await bcrypt.hash(req.body.new_password, 5)
    
        try {
            const [users] = await conn.query(
                'SELECT * FROM users WHERE username=?',
                [req.body.username]
            )
            const user = users[0]
            if (!(await bcrypt.compare(req.body.password, user.password))) {
                throw new Error('Incorrect username or password')
            }
    
            await pool.query(
                'UPDATE users SET password=? WHERE user_id=?', [new_password, req.body.user_id]
            )
    
            await conn.commit()
            res.status(201).send()
        } catch (error) {
            await conn.rollback();
            res.status(500).json(error)
        } finally {
            console.log('finally')
            conn.release();
        }
    });


// .delete(`http://localhost:3000/address_all/${this.user.user_id}`

exports.router = router;