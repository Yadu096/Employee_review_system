const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/admin');
const Emp = require('../model/employee');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    async function(req, email, password, done){
        try{
            //check if the user is admin or employee
            let user;
            let admin = await Admin.findOne({emp_email: email});
            if(admin){
                user = admin;
            }else{
                user = await Emp.findOne({emp_email: email});
            }
            //check if the entered password is correct
            if(!user || user.password != password){
                req.flash('error', 'Invalid username/password');
                return done(null, false);
            }
            req.flash('success', 'Authentication complete');
            return done(null, user);

        }catch(err){
            console.log(err,"***Error***");
            return done(err);
        }
        
    }
));

//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    // console.log("serializer called");
    return done(null, user.id);
});

//Deserialize the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try{
        //check if the user is admin/employee
        let user;
        let admin = await Admin.findById(id);
        if(admin){
            user = admin;
        }else{
            user = await Emp.findById(id);
        }
        return done(null, user);

    }catch(err){
        console.log(err, "***Error***");
        return done(err);
    }
});

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //If the user is authenticated, request will have the user, so we need to pass it to the response locals
        res.locals.user = req.user;
    }

    next();
}

//Create a check authentication function on passport to check if the user is signed in or not.
passport.checkAuthentication = function(req, res, next){
    //If the user is authenticated, pass on the user to the next function
    if(req.isAuthenticated()){
       return next();
    }

    //If the user is not authenticated 
    return res.redirect('http://localhost:8000/emp/sign-in');
}

module.exports = passport;