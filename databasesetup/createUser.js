const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as necessary

mongoose.connect('mongodb://localhost/SocialApp', { useNewUrlParser: true, useUnifiedTopology: true });

const createUser = async () => {
  try {
    const user = new User({
      username: 'john_doe',
      email: 'unique_email_' + Date.now() + '@example.com', // Ensure this email is unique
      password: 'password123'
    });
    const savedUser = await user.save();
    console.log('User ID:', savedUser._id); // This is the user ID you will use
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    mongoose.connection.close(); // Close the connection after the operation
  }
};

createUser();