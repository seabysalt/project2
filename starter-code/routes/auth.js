const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

const passport = require("passport");
const passportSetings = require("../config/passport-setup")

router.get("/facebook", passport.authenticate("facebook"));

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/session/home",
        failureRedirect: "/login"
    })
);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
})

module.exports = router;