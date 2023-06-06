const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const User = require('./Models/user'); 
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbApiKey = process.env.REACT_APP_DB_API_KEY;

mongoose.connect(dbApiKey, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

app.post('/login', async (req, res) => {
   const { username, password } = req.body;
 
   const user = await User.findOne({ username });
   
   if (!user) {
     return res.status(400).json({ message: 'Sorry, we couldn\'t locate that user.' });
   }
 
   const validPassword = bcrypt.compareSync(password, user.password);
 
   if (!validPassword) {
     return res.status(401).json({ message: 'Please re-enter your password.' });
   }
 
   // Login successful
   return res.json({ message: 'Logged in successfully' });
});

app.post('/register', async (req, res) => {
   const { username, password } = req.body;
 
   const existingUser = await User.findOne({ username });
 
   if (existingUser) {
     return res.status(409).json({ message: 'Sorry, that username is in use.' });
   }
 
   const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the saltRounds
   const newUser = new User({ username, password: hashedPassword });
 
   await newUser.save();
 
   return res.json({ message: 'User registered successfully' });
});

// User.collection.drop()
//   .then(() => console.log('Collection dropped'))
//   .catch(err => console.log('Error', err));