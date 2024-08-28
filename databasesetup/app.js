const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Like = require('./models/Like');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myAppDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Verify connection
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Example: Add a user
async function addUser() {
    try {
        const user = new User({
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password123'
        });
        await user.save();
        console.log('User added:', user);
    } catch (err) {
        console.error('Error adding user:', err);
    }
}

// Example: Add a post
async function addPost() {
    try {
        const user = await User.findOne({ username: 'john_doe' });
        if (!user) {
            console.error('User not found');
            return;
        }
        const post = new Post({
            title: 'My first post',
            content: 'This is the content of the post.',
            author: user._id
        });
        await post.save();
        console.log('Post added:', post);
    } catch (err) {
        console.error('Error adding post:', err);
    }
}

addUser();
addPost();
