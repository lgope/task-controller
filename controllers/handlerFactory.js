import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import moment from 'moment';

export const deleteOne = Model =>
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

export const updateOne = Model =>
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

export const createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      doc,
    });
  });

export const getOne = Model =>
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

export const getAll = Model =>
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
export const getDataByDate = Model =>
  catchAsync(async (req, res, next) => {
    const { userId, fromDate, toDate } = req.params;

    const fromD = moment(fromDate).subtract(1, 'days').format().split('T')[0];
    const toD = moment(toDate).add(1, 'days').format().split('T')[0];
    let filteredData;

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

    res.status(200).json(filteredData);
  });
