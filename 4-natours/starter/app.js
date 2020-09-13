const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const API_VERSION = 'v1';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours: tours } });
};

const getTour = (req, res) => {
  const paramId = Number(req.params.id);
  const tour = tours.find((tourObject) => tourObject.id === paramId);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: tour } });
};

const deleteTour = (req, res) => {
  const paramId = Number(req.params.id);
  const tour = tours.find((tourObject) => tourObject.id === paramId);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: null });
};

const patchTour = (req, res) => {
  const paramId = Number(req.params.id);
  const tour = tours.find((tourObject) => tourObject.id === paramId);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: tour } });
};

//app.get(`/api/${API_VERSION}/tours`, getAllTours);
//app.get(`/api/${API_VERSION}/tours/:id`, getTour);
//app.post(`/api/${API_VERSION}/tours`, createTour);
//app.patch(`/api/${API_VERSION}/tours/:id`, patchTour);
//app.delete(`/api/${API_VERSION}/tours/:id`, deleteTour);

app.route(`/api/${API_VERSION}/tours`).get(getAllTours).post(createTour);
app
  .route(`/api/${API_VERSION}/tours/:id`)
  .get(getTour)
  .patch(patchTour)
  .delete(deleteTour);

const port = 3000;

app.listen(port, () => console.log(`Listening on Port ${port}`));
