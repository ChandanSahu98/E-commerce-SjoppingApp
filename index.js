if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 3000;

//Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require('./routes/reviewRoutes');
const cartRoutes = require('./routes/cartRoutes');

const dburl = process.env.DB_URL || "mongodb://127.0.0.1:27017/shopping-app-DB"

const connectDB = ()=>{
    mongoose
    .connect(dburl)
    .then(() => console.log("Connected with MongoDB"))
    .catch((err) => console.log(err));
}


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


const store = MongoStore.create({
  mongoUrl : dburl,
  touchAfter : 60 * 60 * 24 * 1
})

const secret = process.env.SECRET || 'weeneedasecret'
const sessionConfig = {
  store,
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie : {
    httpOnly : true,
    expires : Date.now() + 1000*60*60*24*7*1,
    maxAge : 1000*60*60*24*7*1
  }
}

app.use(session(sessionConfig));
app.use(passport.authenticate('session'));
app.use(flash());


/* passport uses passpor-local-mogoose methods authencate/serialise/deserialise methods to automatically add and remove user form sesson*/
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('home');
})

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);


connectDB.then(()=>{
  app.listen(PORT, ()=>{
    console.log("listening for requests");
  })
});

// app.listen(PORT,()=>{
//   console.log(`server started at port ${PORT}`);
// });