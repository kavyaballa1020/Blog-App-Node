const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://220101120156:Nanna1432@blogapp.84tuqrq.mongodb.net/Blog?retryWrites=true&w=majority&appName=BlogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('Connection error', err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Set up EJS
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');
app.use('/', indexRoutes);
app.use('/posts', postRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
