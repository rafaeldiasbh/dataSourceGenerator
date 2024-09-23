var express = require('express');
const controller = require('../src/controller');

var router = express.Router();


router.post('/', function(req, res, next) {
    const name = req.name;
    controller.generateNewDataSource(name);
    res.post(dataSoutce);
});

module.exports = router;
