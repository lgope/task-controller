const chalk = require('chalk');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongo atlas cloud database connetion
// mongoose
//   .connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log('DB connection successful!'))
//   .catch((err) => {
//     console.log(Error, err.message);
//   });

// Connect to MongoDB with localhost
mongoose
  .connect('mongodb://localhost/task-manager-local', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log(Error, err.message);
  });

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server is running at ${chalk.greenBright(port)}`)
);
