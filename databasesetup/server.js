// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/SocialApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/RouteUser');
const postRoutes = require('./routes/RoutePosts');
const commentRoutes = require('./routes/RouteComment');
const likeRoutes = require('./routes/RouteLike');
const followRoutes = require('./routes/RouteFollow'); // Add this line

// Use routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);
app.use('/follows', followRoutes); // Add this line

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
