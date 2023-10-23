const express = require('express');
const app = express();
const port = 8000;
//call mongoose configuration
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customFlashMware = require('./config/flash_middleware');



//Configure Node-SASS-Middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//Parse the form data
app.use(express.urlencoded({extended:false}));

//Setup the static folder
app.use(express.static('./assets'));

//Setup layouts
app.use(expressLayouts);
//Extract styles and scripts from sub pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setup the template/view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Set up the passport session
app.use(session({
    name: "Employee_review_system",
    secret: "local",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || "Mongo store set up successfully");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
//Set the details of the authenticated user in the locals for views to access it
app.use(passport.setAuthenticatedUser);
//Set up connect flash
app.use(flash());
app.use(customFlashMware.flashMiddleware);


//Route to the routers
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(err, "Could not run the server");
        return;
    }
    console.log("Server is running on the port: ", port);
})