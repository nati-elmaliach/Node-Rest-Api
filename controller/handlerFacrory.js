const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const custumerId = req.params.id;
    const doc = await Model.findOne({ firstName: custumerId });
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
