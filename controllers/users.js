const User = require("../models/user");

module.exports.signup = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.renderSignupForm = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
    
        const registerdUser = await User.register(newUser, password);
        console.log(registerdUser);
        
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to NextD"),
            res.redirect("/listings");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to NextD you are logged in");
    console.log("res.locals: " + res.locals.redirectUrl);

    if (res.locals.redirectUrl) {
        res.redirect(res.locals.redirectUrl);
    } else {
        res.redirect("/listings");
    }
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
}