const express = require('express');
const dealsController = require('../controller/dealController');
const router = express.Router();

router
  .route('/')
  .get(dealsController.getAllDeals)
  .post(dealsController.createNewDeal);

router.route('/:id').get(dealsController.getCustomer);

module.exports = router;
