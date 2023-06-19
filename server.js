const express = require('express');

const router = express.Router();

const app = express(); // it will create the express server
const connectDB = require('./config/db.config');

connectDB();
app.use(express.json());
app.use("/auth", require("./router/auth"));
app.use("/users", require("./router/user"));


app.get('/', (req, res) => {
    res.status(200).json({ msg: 'train registeration started' });
});

app.listen(9000, () => {
    console.log('train registration started Started');
});