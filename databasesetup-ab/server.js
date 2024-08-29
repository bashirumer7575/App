const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/SocialApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Import routes
const userRoutes = require('./routes/RouteUser');
const postRoutes = require('./routes/RoutePosts');
const commentRoutes = require('./routes/RouteComment');
const likeRoutes = require('./routes/RouteLike');

// Use routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
