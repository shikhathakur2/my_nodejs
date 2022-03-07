// import express from 'express';
// import { json } from 'body-parser';

// import placesRoutes from './routes/places-routes';


// const placeRoutes = require('./routes/places-routes');
// const userRoutes = require('./routes/user-routes');


// mongodb connetc 
// const mongoPractice = require('./mongo');

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.json());

// // app.post('/products', mongoPractice.createProduct);

// // app.get('/products');

// app.listen(3000);


// practice  

// const HttpError = require('./models/http-error');
// const app = express();

// app.use(bodyParser.json());

// app.use('/api/places', placeRoutes); // => /api/places...
// app.use('/api/users', userRoutes); // => /api/places...


// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route.', 404);
//   throw error;
// });

// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500)
//   res.json({message: error.message || 'An unknown error occurred!'});
// });

// app.listen(5000);



const express = require('express');
const bodyParser = require('body-parser');
const placeRoutes = require('./routes/places-routes');
// const mongoPractice = require('./mongo');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// app.get('/', (req, res, next) => {
// return res.send("Hellp");

// });


// app.post('/products', mongoPractice.createProduct);

// app.get('/products');
app.listen(5000);
app.use('/api/places', placeRoutes);   // => /api/places...


mongoose
  .connect('mongodb+srv://shikhat:shikhatt@freecluster.fixcy.mongodb.net/my_db?retryWrites=true&w=majority')
  .then(() => {
     
      console.log("server connected");
      return;
    
  })
  .catch(err => {
    console.log(err);
    return err ;
  });


