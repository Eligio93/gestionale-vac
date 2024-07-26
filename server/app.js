const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


///-----CONNECTION TO DB-----///

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || process.env.DB_STRING_DEV;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log('Connected to Database')
}
///---------------------------///

const indexRouter = require('./routes/index');
const patientsRouter = require('./routes/patients');
const machineRouter = require('./routes/machine');
const hospitalRouter = require('./routes/hospitals')
const therapyRouter = require('./routes/therapies')



const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/patients', patientsRouter);
app.use('/machines', machineRouter);
app.use('/hospitals', hospitalRouter);
app.use('/therapies', therapyRouter);

module.exports = app;
