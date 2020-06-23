import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {

  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,    
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  }

})

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()
const listEndpoints = require("express-list-endpoints");


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// // Start defining your routes here
app.get("/", async (req, res) => {
  res.send(listEndpoints(app));
});

const authenticateUser = async (req, res, next) => {

  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization')
    });

    if (user) {
      req.user = user;
      next();
    } else {
      res
        .status(401)
        .json({ loggedOut: true, message:'Please try logging in again' });
     } 
    
   }  catch (err) {
     res
        .status(403)
        .json({ message: 'Access token is missing or wrong', errors: err })
    }
}


app.post('/users', async (req, res) => {

  try {
    const {name, email, password } = req.body;
    const user = new User({name, email, password: bcrypt.hashSync(password)});
    const saved = await user.save();
    res.status(201).json({id: saved._id, accessToken: saved.accessToken});
  } catch (err) {
    res.status(400).json({message:'Could not create user', errors: err })
  }
})

app.get('/secretmessage', authenticateUser);
app.get('/secretmessage', (req, res) => {
  res.status(201).json({ message: 'Hello' });
})


app.post('/sessions', async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ id: user._id, accessToken: user.accessToken });
    } else {
      res.status(404).json({ notFound: true })
    }

  } catch (err) {
    res.status(404).json({ notFound: true });
  }

});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
