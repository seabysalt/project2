require('dotenv').config();
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/User')
mongoose.connect("mongodb://localhost/backend-training", { useNewUrlParser: true })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use(session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

app.locals.title = "Backend training app"

app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth'))
app.use('/session', require('./routes/session'))
app.listen(process.env.PORT)

module.exports = app;