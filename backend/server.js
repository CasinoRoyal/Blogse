const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./db');
const blogRoute = require('./routes/blog.route');

//app
const app = express();

//db
connectDB();

//middlewares
app.use(morgan('dev'));
app.use(express.json({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes
app.use('/api/v1', blogRoute);

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server running on ${port} port`));