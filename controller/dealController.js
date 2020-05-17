const Deal = require('../models/dealModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controller/handlerFacrory');

exports.getAllDeals = catchAsync(async (req, res, next) => {
  const deals = await Deal.find();
  res.status(200).json({
    status: 'success',
    results: deals.length,
    data: {
      deals,
    },
  });
});

exports.createNewDeal = factory.createOne(Deal);

exports.getCustomer = factory.getOne(Deal);
