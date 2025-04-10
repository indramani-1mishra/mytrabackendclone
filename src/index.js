const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/serverconfig');
const connectdatabase = require('./config/databaseconfig');
const apirouter = require('./routes/apirouter');
const cookieParser = require('cookie-parser');
const { isLoggedIn } = require('./validetor/islogin');

const app = express();

// 🟢 CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-app.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("🚫 Blocked CORS origin:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🛣 Routes
app.use('/api', apirouter);

app.get('/', isLoggedIn, (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
  connectdatabase();
});
