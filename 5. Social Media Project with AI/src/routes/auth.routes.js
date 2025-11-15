const express = require('express');

const router = express.Router();

router.get('/testing', (_, res) => {
    res.json({ test: "This is just a testing route" });
});

module.exports = router;