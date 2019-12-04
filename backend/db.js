const mongoose = require('mongoose');

const db = process.env.DB.replace(
  '<PASSWORD>', 
  process.env.DB_PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('Connected to DB...')
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;