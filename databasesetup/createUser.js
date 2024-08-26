const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as necessary

mongoose.connect('mongodb://localhost/SocialApp', { useNewUrlParser: true, useUnifiedTopology: true });

const createUser = async () => {
  try {
    const email = 'unique_email_' + Date.now() + '@example.com'; // Generate a unique email

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User with this email already exists:', existingUser._id);
      return;
    }

    // Create a new user if no existing user is found
    const user = new User({
      username: 'john_doe',
      email: email, // Use the generated unique email
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
