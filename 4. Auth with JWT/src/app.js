const express = require('express');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(cookieParser());
// API's we need to create

/**
 * POST /register => user create/register karna
 * POST /login => Check username and password and then login the user
 * GET /user => get user data [PROTECTED ROUTE]
 * GET /logout => logout user
 */


app.use('/auth', authRoutes);


module.exports = app;