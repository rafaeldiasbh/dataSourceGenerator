const express = require('express');
const controller = require('../src/controller');

const router = express.Router({mergeParams: true});
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const dataSources = await controller.findAll();
  res.json(dataSources);
});

router.post('/', async function(req, res, next) {
  //const result = consoller.saveNewDataSource();

  const name = req.body.dataSourceName;
  try{
    const dataSoutce = await controller.generateNewDataSource(name);
  }catch(error){
    console.log(error);
    res.status(error.code).json(error);
  }

  res.json(dataSoutce);
});

router.delete('/', async function(req, res, next) {
  let dataSources = await DataSource.remove({});

  res.send('deleted');
});



module.exports = router;
