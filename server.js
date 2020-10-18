import mongoose from 'mongoose';
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config({ path: './config.env' });
import app from './app.js';


// Connect to Mongo // &ssl=true
mongoose
  .connect(process.env.DATABASE_URI, {
    // .connect('mongodb://localhost/task-manager-local', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`DB connection ${chalk.greenBright('successful!')}`))
  .catch(err => console.log(chalk.redBright(err)));

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`App running on port ${chalk.greenBright(port)}...`)
);
