const express = require('express');
const env = require('dotenv');
// const consumerInit = require('./worker/consumer');
var morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
env.config();

const app = express();
const PORT = process.env.PORT || 8080;

const morganMiddleware = morgan(function (tokens, req, res) {
  return [
    chalk.hex('#ff4757').bold('🍄  Morgan --> '),
    chalk.hex('#34ace0').bold(tokens.method(req, res)),
    chalk.hex('#ffb142').bold(tokens.status(req, res)),
    chalk.hex('#ff5252').bold(tokens.url(req, res)),
    chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
    chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
  ].join(' ');
});

const corsOptions = {
  origin: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(morganMiddleware);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Connected',
  });
});

require('./routers/admin/auth.routes')(app);
require('./routers/admin/user.routes')(app);
require('./routers/admin/test.routes')(app);
require('./routers/admin/officer_test.routes')(app);
require('./routers/admin/officer_new_test.routes')(app);
require('./routers/admin/comment.routes')(app);
require('./routers/admin/predict.routes')(app);

require('./routers/guest/auth.routes')(app);
require('./routers/guest/officer_test.routes')(app);
require('./routers/guest/test.routes')(app);

app.listen(PORT, (res) => {
  console.log(`App listening on port ${PORT}`);
});

// const initWorkerService = async () => await consumerInit();

// initWorkerService();
