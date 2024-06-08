const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        // console.log(req.session.redirectUrl);
        req.flash("error", "you must be logged in...");
        res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    // console.log("req.session redirecturl: " + req.session.redirectUrl);
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = wrapAsync(async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "The listing you requested does not exist");
        return res.redirect("/listings");
    }
    
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        const route = "/listings/"+ id;
        return res.redirect(`/listings/${id}`);
    }
    next();
});

// Validating Listing
module.exports.validateListing = async (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    console.log(error);
    if (error) {
        //   let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

// Validating Review
module.exports.validateReview = async (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    
    console.log(error);
    if (error) {
      // let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, error);
    } else {
      next();
    }
}

// Review Author Validation
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "The listing you requested does not exist");
        return res.redirect("/listings");
    }

    if(!res.locals.currUser) {
        return req.flash("error","you must be logged in to delete review");
    }
    
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
