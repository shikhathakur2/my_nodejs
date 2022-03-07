const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p2",
    title: "wwsdsa State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34ddasdsadth St, New York, NY 10001",
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  console.log("isnide", req);
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ place });
};

const createPlace = async (req, res, next) => {
  console.log("req", req.body);
  const errors = await validationResult(req.body);
  console.log("isnide createPlace", errors);

  if (!errors.isEmpty()) {
    console.log("errors", errors);
    res.status(422);
    throw new HttpError("Invalid input data ");
  }
  try {
    const { title, description, address, creator } = req.body;
    console.log("req,", req.body);

    const createdPlace = new Place({
      id: uuidv4(),
      title,
      description,
      address,
      creator,
    });

    let createdData = await createdPlace.save();
    return res.status(201).json({ place: createdData });
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }
};

const getUpdatePlace = (req, res, next) => {
  const { title, description } = req.body;
  placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = { ...DUMMY_PLACES.findIndex((p) => p.id === placeId) };

  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};
const getDeletePlace = (req, res, next) => {
  placeId = req.params.pid;

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).jason({ message: "deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.getUpdatePlace = getUpdatePlace;
exports.getDeletePlace = getDeletePlace;
exports.createPlace = createPlace;
