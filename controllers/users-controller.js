
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
  {
    id: 'u1',
    name:"shaaz",
    email:"shaaz@gmail.com",
    password:"shaz1"
  
  },
  {
    id: 'u2',
    name:"raaj",
    email:"raaj@gmail.com",
    password:"raaj1"
  }
];

const getUser = (req, res, next) => {
 

  res.json({ users:DUMMY_PLACES }); // => { place } => { place: place }
};

const getSingup = (req, res, next) => {

    const {name,email,password}=req.body;
    const hasuser = DUMMY_PLACES.find(u => u.email===email);
    if(hasuser)
    {
        throw new HttpError('CREDENTIALS SEEMS TO BE WRONG',401)
    }
    const createdUser = {
        id:uuidv4(),
        name,
        email,
        password
    };
    DUMMY_PLACES.push(createdUser)
    res.status(201).json({user:createdUser}); // => { place } => { place: place }
  };
  
  const login = (req, res, next) => {

    const {email,password}=req.body;
    const identifiedUser = DUMMY_PLACES.find(u=>u.email === email)
    const hasuser = DUMMY_PLACES.find(u => u.email===email);
    if(!identifiedUser || identifiedUser.password !==password)
    {
        throw new HttpError('could not identofied user. wrong password',401)
    }
   
    res.json({message:"Login !"}); // => { place } => { place: place }
  };
  



exports.getUser = getUser;
exports.getSingup = getSingup;
exports.login = login;
