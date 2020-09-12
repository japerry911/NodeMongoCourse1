const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const API_VERSION = 'v1';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get(`/api/${API_VERSION}/tours`, (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours: tours } });
});

app.get(`/api/${API_VERSION}/tours/:id`, (req, res) => {
  const paramId = Number(req.params.id);
  const tour = tours.find((tourObject) => tourObject.id === paramId);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: tour } });
});

app.post(`/api/${API_VERSION}/tours`, (req, res) => {
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
});

app.patch(`/api/${API_VERSION}/tours/:id`, (req, res) => {
  const paramId = Number(req.params.id);
  const tour = tours.find((tourObject) => tourObject.id === paramId);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated Tour Here>' } });
});

app.delete(`/api/${API_VERSION}/tours/:id`, (req, res) => {
  const paramId = Number(req.params.id);
  const tour = tours.find((tourObject) => tourObject.id === paramId);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: null });
});

const port = 3000;

app.listen(port, () => console.log(`Listening on Port ${port}`));
