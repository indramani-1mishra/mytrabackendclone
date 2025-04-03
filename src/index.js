const express = require('express');
const { PORT } = require('./config/serverconfig');
const connectdatabase = require('./config/databaseconfig');
const apirouter = require('./routes/apirouter');
const cookieParser = require('cookie-parser');
const { isLoggedIn } = require('./validetor/islogin');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

app.use('/api', apirouter);

app.get('/',isLoggedIn ,(req, res) => {
 // console.log(req.cookies);  // ✅ Now, it will log cookies properly
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  connectdatabase();
});
