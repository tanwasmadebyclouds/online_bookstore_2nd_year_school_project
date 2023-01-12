const express = require("express")

const app = express();
const cors = require('cors')
const { logger } = require('./middlewares')
app.use(cors())
app.use(logger)


// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const accountRouter = require('./routes/account')
const employeeRouter = require('./routes/employee')

app.use(indexRouter.router)

app.use(userRouter.router)
app.use(accountRouter.router)
app.use(employeeRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})