const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const moment = require('moment');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) {
      return next(new AppError('No doccument found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      doc,
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('No Document found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find().sort({ createdAt: -1 });

    // SEND Response res
    res.status(200).json({
      status: 'success',
      results: doc.length,
      doc,
    });
  });

// get data by date
exports.getDataByDate = Model =>
  catchAsync(async (req, res, next) => {
    const { userId, fromDate, toDate } = req.params;

    console.log(userId, fromDate, toDate);
    const fromD = moment(fromDate).subtract(1, 'days').format().split('T')[0];
    const toD = moment(toDate).add(1, 'days').format().split('T')[0];
    let filteredData;

    console.log(fromD, toD);
    console.log('hh ', fromDate, toDate);

    if (userId) {
      filteredData = await Model.find({
        userId,
        createdAt: {
          $gt: `${fromD}T00:00:00.000+00:00`,
          $lt: `${toD}T00:00:00.000+00:00`,
        },
      });
    } else {
      filteredData = await Model.find({
        createdAt: {
          $gt: `${fromD}T00:00:00.000+00:00`,
          $lt: `${toD}T00:00:00.000+00:00`,
        },
      });
    }

    // console.log('data ', filteredData);
    res.status(200).json(filteredData);
  });
