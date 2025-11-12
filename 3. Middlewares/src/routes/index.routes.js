const express = require('express');
const { indexController } = require('../../controllers/index.controller');

const router = express.Router();

router.use((req, res, next) => {
    console.log("This middleware is between router and api");
    next();
});

router.get('/', indexController);

module.exports = router;