const express = require('express');
const cors = require('cors');  // 🛑 CORS middleware import karo
const { PORT } = require('./config/serverconfig');
const connectdatabase = require('./config/databaseconfig');
const apirouter = require('./routes/apirouter');
const cookieParser = require('cookie-parser');
const { isLoggedIn } = require('./validetor/islogin');

const app = express();

// ✅ CORS Middleware (Frontend se requests allow karne ke liye)
app.use(cors({
  origin: "http://localhost:5173",  // ✅ Apne frontend ka URL yahan likho
  credentials: true,  // ✅ Cookies allow karne ke liye
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api', apirouter);

app.get('/', isLoggedIn, (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  connectdatabase();
});
