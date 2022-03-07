const express = require('express');
const {check} = require('express-validator');


const placesControllers = require('../controllers/places-controllers');
// console.log("inside placesControllers ",placesControllers)
const router = express.Router();

// router.get('/:pid', placesControllers.getPlaceById);

// router.get('/user/:uid', placesControllers.getPlaceByUserId);
// router.post('/',[check('title').not().isEmpty(),
// check('description').isLength({min:5}),
// check('address').not().isEmpty()], placesControllers.createPlace);

router.post(
    '/save',
    // [
    //   check('title')
    //     .not()
    //     .isEmpty(),
    //   check('description').isLength({ min: 5 }), 
    //   check('address')
    //     .not()
    //     .isEmpty()
    // ],
    placesControllers.createPlace
  );
// router.patch('/:pid', placesControllers.getUpdatePlace);
// router.delete('/:pid', placesControllers.getDeletePlace);

module.exports = router;
 