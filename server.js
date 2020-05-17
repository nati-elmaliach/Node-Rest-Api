const moongose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Safty-net uncaughtException -> consol.log(x) when x is not defined
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION , Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // we need to force the sever to exit or restart , to clean the state
});

const app = require('./app');

const DB_URL = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

moongose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull')); //

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// Safety-net unhandledRejection -> handle unhandledRejection(promises that we did not catch) globally
process.on('unhandledRejection', (err) => {
  // This error will throw outside of our express application
  console.log('UNHANDLED REJection , Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    // Gracefully shutdown the server , and finish the process
    process.exit(1);
  });
});
