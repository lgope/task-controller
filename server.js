const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config({ path: './config.env' });
const app = require('./app');

// DB Config
// const DB = process.env.DATABASE_URI.replace(
//   '<password>',
//   process.env.DATABASE_PASSWORD
// );

// Connect to Mongo
mongoose
    // .connect(DB, {
  .connect('mongodb://localhost/task-manager-local', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(chalk.redBright(err)));

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`App running on port ${chalk.greenBright(port)}...`)
);
