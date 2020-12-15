const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection.js')

// import sequelize connection
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}!, app is.`);
// });

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Listening, I am.'));
});
