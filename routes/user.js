const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.signup) // signup get route
  .post(wrapAsync(userController.renderSignupForm)); // signup post route

router
  .route("/login")
  .get(userController.renderLoginForm) // Login get req
  .post(  // Login post req
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// Logout get route
router.get("/logout", userController.logout);

module.exports = router;
