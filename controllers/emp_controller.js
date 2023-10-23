const Admin = require('../model/admin');
const Emp = require('../model/employee');

//Render sign in page
module.exports.signinPage = function(req, res){
    if(req.isAuthenticated()){
        req.flash('error', 'Please sign out to go to sign in page');
        return res.redirect('back');
    }
    return res.render('sign_in',{
        title: 'Sign in'
    });
}

//Render registration page
module.exports.registrationPage = function(req, res){
    if(req.isAuthenticated()){
        req.flash('error', 'Please sign out to go to registration page');
        return res.redirect('back');
    }
    return res.render('registration',{
        title: 'Registration'
    });
}

//Create employee 
module.exports.createEmp = async function(req, res){
    try{
        let admin = await Admin.find({});
        //If admin is empty, make the first employee of the organisation the admin i.e. create in admin collection
        if(admin.length == 0){
            //Check if password and confirm password are same
            if(req.body.password == req.body.confirm_password){

                await Admin.create({
                    name: req.body.name,
                    DOB: req.body.dob,
                    gender: req.body.gender,
                    emp_ID: req.body.emp_ID,
                    department: req.body.department,
                    DOJ: req.body.doj,
                    emp_email: req.body.email,
                    password: req.body.password
                });
                req.flash('success', 'Successfully registered');
                return res.redirect('/emp/sign-in');

            }else{
                req.flash('error', 'Passwords do not match, please enter again');
                return res.redirect('back');
            }
            
            
        }else{
            //admin already exists, so create the employee in the employee collection
            //Check if password and confirm password are same
            if(req.body.password == req.body.confirm_password){

                await Emp.create({
                    name: req.body.name,
                    DOB: req.body.dob,
                    gender: req.body.gender,
                    emp_ID: req.body.emp_ID,
                    department: req.body.department,
                    DOJ: req.body.doj,
                    emp_email: req.body.email,
                    password: req.body.password
                });
                req.flash('success', 'Successfully registered');
                return res.redirect('/emp/sign-in');

            }else{
                req.flash('error', 'Passwords do not match, please enter again');
                return res.redirect('back');
            }
            
            
        }
    }catch(err){
        console.log(err);
        req.flash('error', '***Error***');
        return res.redirect('back');
    }
    
}

//Create session
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

//Clear session
module.exports.clearSession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log(err);
            req.flash('error', 'Could not log you out');
            return res.redirect('back');
        }
        req.flash('success', 'You have logged out succesfully');
        return res.redirect('/emp/sign-in');
    });
}

