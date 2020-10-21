const express = require('express');
const connectDB = require('./config/db');

const Users = require('./Routes/api/users');
const Streams = require('./Routes/api/stream');
const Profile = require('./Routes/api/profile');
const Post = require('./Routes/api/posts');
const Auth = require('./Routes/api/auth');

const app = express();

//Init middleware
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', Users);
app.use('/api/streams', Streams);
app.use('/api/profile', Profile);
app.use('/api/post', Post);
app.use('/api/auth', Auth);

app.get('/', (req, res) => {
    res.send('Server started');
})

//connectDB
connectDB();


const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Connected to port ${port}`));