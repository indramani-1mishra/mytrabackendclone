const express = require('express');
const { PORT } = require('./config/serverconfig');
const connectdatabase = require('./config/databaseconfig');
const apirouter = require('./routes/apirouter');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', apirouter);

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  connectdatabase();
});
