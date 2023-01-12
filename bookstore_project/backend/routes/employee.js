const { json } = require("express");
const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const Joi = require('joi')

const router = express.Router();

// SET STORAGE
// Require multer for file upload

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// <<<<<<<<< employee >>>>>>>>>>>
router.get('/getAllCart',  isLoggedIn, async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [carts] = await pool.query(
            'SELECT `delivery_address`, `total_price_cart`, DATE_FORMAT(create_date, \'%Y-%m-%d\') create_date, `promotion_id`, `cart_id`, `user_id`, `order_status`, `tracking_number` , `fname`, `lname`, `email`, `phone`, `gender`'+
            'FROM cart join  users using(user_id)'
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

const trackingValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
      "SELECT tracking_number FROM cart WHERE tracking_number = ?", 
      [value]
    )
    if (rows.length > 0) {
          let message = 'This tracking_number is already taken'
          throw new Joi.ValidationError(message, { message })
      }
    return value
  }



const trackingSchema = Joi.object({
    cart_id: Joi.required(),
    tracking_number: Joi.string().required().external(trackingValidator),
    order_status: Joi.string().required(),
  }) 


router.put('/tracking_number',  isLoggedIn, async function (req, res, next) {
    console.log(req.body)

    try {
        await trackingSchema.validateAsync(req.body,  { abortEarly: false })
      } catch (err) {
       return res.status(400).json(err)
      }  


    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        await pool.query(
            'UPDATE cart SET tracking_number=?, order_status=? WHERE cart_id=?', [req.body.tracking_number, req.body.order_status, req.body.cart_id]
        )
        await conn.commit()
        return res.json({ tracking_number: req.body.tracking_number, order_status:req.body.order_status})
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});

router.get('/getCodePromotion',  isLoggedIn, async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [codes] = await pool.query(
            'SELECT `promotion_id`, `discount`, `promotion_code`, DATE_FORMAT(start_date, \'%Y-%m-%d\') start_date, DATE_FORMAT(expire_date, \'%Y-%m-%d\') expire_date'+
            ' FROM promotion'
        )
        await conn.commit()
        res.json(codes)
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});

const codeValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
      "SELECT promotion_code FROM promotion WHERE promotion_code = ?", 
      [value]
    )
    if (rows.length > 0) {
          let message = 'This code is already taken'
          throw new Joi.ValidationError(message, { message })
      }
    return value
  }

const updateCodeSchema = Joi.object({
     promotion_id: Joi.required(),
     discount: Joi.number().required(),
     start_date: Joi.string().required(),
     expire_date: Joi.string().required(),
     promotion_code: Joi.string().required(),
   }) 


router.put('/updateCode',  isLoggedIn, async function (req, res, next) {
    console.log(req.body)

    try {
         await updateCodeSchema.validateAsync(req.body,  { abortEarly: false })
       } catch (err) {
        return res.status(400).json(err)
       }  


    const conn = await pool.getConnection()
    await conn.beginTransaction();
    

    try {
        await pool.query(
            'UPDATE promotion SET discount=?, start_date=?, expire_date=?, promotion_code=? WHERE promotion_id=?',
            [req.body.discount, req.body.start_date, req.body.expire_date, req.body.promotion_code, req.body.promotion_id]
        )
        
        await conn.commit()
        return res.json(req.body)
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});


const adddCodeSchema = Joi.object({
    discount: Joi.number().required(),
    start_date: Joi.string().required(),
    expire_date: Joi.string().required(),
    promotion_code: Joi.string().required().external(codeValidator),
  }) 



router.post('/addCodePromotion',  isLoggedIn, async function (req, res, next) {
    console.log(req.body)

    try {
        await adddCodeSchema.validateAsync(req.body,  { abortEarly: false })
      } catch (err) {
       return res.status(400).json(err)
      } 

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [rows1, fields1] = await conn.query(
            "INSERT INTO promotion(discount, start_date, expire_date, promotion_code)" +
            "VALUES(?, ?, ?, ?);",
            [req.body.discount, req.body.start_date, req.body.expire_date, req.body.promotion_code]
        )

        const [rows2, fields2] = await conn.query(
            'SELECT `promotion_id`, `discount`, `promotion_code`, DATE_FORMAT(start_date, \'%Y-%m-%d\') start_date, DATE_FORMAT(expire_date, \'%Y-%m-%d\') expire_date FROM `promotion` WHERE `promotion_id` = ?',
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


router.get('/getBooks', async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [books] = await pool.query(
            'SELECT `book_id`, `book_name`, `price`, `order_type`, `quantity`, `image_url`, `detail_book`, sum(ifnull(item_quantity,0)) `book_sales`'+
          'FROM book left join cart_item using(book_id) left join cart using(cart_id) left join payment using(cart_id) group by book_id'
        )
        await conn.commit()
        res.json(books)
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});

router.get('/getBooks/:id', async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
      const [book] = await pool.query(
          'SELECT * FROM book WHERE book_id= ? ',[req.params.id,]
      );
      await conn.commit()
      res.json(book[0])
  } catch (error) {
      await conn.rollback();
      res.status(500).json(error)
  } finally {
      console.log('finally')
      conn.release();
  }
});

const bookValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
      "SELECT book_name FROM book WHERE book_name = ?", 
      [value]
    )
    if (rows.length > 0) {
          let message = 'This book is already taken'
          throw new Joi.ValidationError(message, { message })
      }
    return value
  }

const addBookSchema = Joi.object({
    book_name: Joi.string().required().external(bookValidator),
    price: Joi.number().required(),
    order_type: Joi.string().required(),
    quantity: Joi.number().required(),
    detail_book: Joi.string().required()
   }) 



router.post("/addBook", upload.single('image_url'), isLoggedIn, async function (req, res, next) {
    console.log(req.body)
    try {
        await addBookSchema.validateAsync(req.body,  { abortEarly: false })
      } catch (err) {
       return res.status(400).json(err)
      } 
      
    const file = req.file;
    console.log(req.file)


    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
  

    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {

        const [rows1, fields1] = await conn.query(
        "INSERT INTO book(price, book_name, order_type, quantity, image_url, detail_book)" +
        "VALUES(?, ?, ?, ?, ?, ?);",
        [req.body.price, req.body.book_name, req.body.order_type, req.body.quantity, req.file.path.substring(6), req.body.detail_book]
      );
      
      const [rows2, fields2] = await conn.query(
        'SELECT * FROM `book` WHERE `book_id` = ?',
        [rows1.insertId]
        );  
      

      await conn.commit();
      return res.json(rows2[0])
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
  });



  const updateBookSchema = Joi.object({
    book_name: Joi.string().required(),
    price: Joi.number().required(),
    order_type: Joi.string().required(),
    quantity: Joi.number().required(),
    image_url: Joi.required(),
    detail_book: Joi.string().required(),
    image_old: Joi.required(),
    book_id: Joi.required()
   }) 



  router.put('/updateBook', upload.single('image_url'), isLoggedIn, async function (req, res, next) {
    console.log(req.body)

    try {
        await updateBookSchema.validateAsync(req.body,  { abortEarly: false })
      } catch (err) {
       return res.status(400).json(err)
      } 

    const file = req.file;
    console.log(req.file)
    

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        if (!file) {
            await pool.query(
                'UPDATE book SET price=?, book_name=?, order_type=?, quantity=?, image_url=?, detail_book=? WHERE book_id=?',
                [req.body.price, req.body.book_name, req.body.order_type, req.body.quantity, req.body.image_old, req.body.detail_book, req.body.book_id]
            )
          }
        else{
            await pool.query(
                'UPDATE book SET price=?, book_name=?, order_type=?, quantity=?, image_url=?, detail_book=? WHERE book_id=?',
                [req.body.price, req.body.book_name, req.body.order_type, req.body.quantity, req.file.path.substring(6), req.body.detail_book, req.body.book_id]
            )
        }
        
        await conn.commit()
        if (!file){
            return res.json({
                price: req.body.price,
                book_name: req.body.book_name,
                order_type: req.body.order_type,
                quantity: req.body.quantity,
                image_url: req.body.image_old,
                detail_book: req.body.detail_book
            })
        }
        else{
            return res.json({
                price: req.body.price,
                book_name: req.body.book_name,
                order_type: req.body.order_type,
                quantity: req.body.quantity,
                image_url: req.file.path.substring(6),
                detail_book: req.body.detail_book
            })
        }
        
    } catch (error) {
        await conn.rollback();
        res.status(500).json(error)
    } finally {
        console.log('finally')
        conn.release();
    }
});

exports.router = router;