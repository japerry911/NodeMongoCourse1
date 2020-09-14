// const fs = require('fs');
const Tour = require("../models/tourModel");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.checkID = (req, res, next, val) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  // }

  next();
};

// exports.checkBody = (req, res, next) => {
//   // if (!req.body.name || !req.body.price) {
//   //   return res
//   //     .status(400)
//   //     .json({ status: 'fail', message: 'Invalid Post Data' });
//   // }

//   next();
// };

exports.createTour = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save();

  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: "success", data: { tour: newTour } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "Invalid Data Sent" });
  }

  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({ status: 'success', data: { tour: newTour } });
  //   }
  // );
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1 - Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "fields", "sort"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");

    // 2 - Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort.split(",").join(" "));
    } else {
      query = query.sort("-createdAt");
    }

    // 3 - Field Limiting
    if (req.query.fields) {
      query = query.select(req.query.fields.split(",").join(" "));
    } else {
      query = query.select("-__v");
    }

    // 4 - Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error("This page does not exist");
      }
    }

    // EXECUTE QUERY
    const tours = await query;

    // RESPONSES
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: { tours: tours },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: "fail", message: "Failled - Server Error" });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: "Failled - Server Error" });
  }

  // const paramId = Number(req.params.id);
  // const tour = tours.find((tourObject) => tourObject.id === paramId);
  // res.status(200).json({ status: 'success', data: { tour: tour } });
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(404).json({ status: "fail", message: "Failled - Server Error" });
  }

  // const paramId = Number(req.params.id);
  // const tour = tours.find((tourObject) => tourObject.id === paramId);
  // res.status(204).json({ status: 'success', data: null });
};

exports.patchTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: "Failled - Server Error" });
  }

  // const paramId = Number(req.params.id);
  // const tour = tours.find((tourObject) => tourObject.id === paramId);
  // res.status(200).json({ status: 'success', data: { tour: tour } });
};
