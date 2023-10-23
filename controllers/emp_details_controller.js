const Admin = require('../model/admin');
const Emp = require('../model/employee');

//Render employee details page
module.exports.empDetailsPage = async function(req, res){
    let emp = await Emp.findById(req.params.id).populate('performance_review');
    return res.render('emp_details',{
        title: "Employee details",
        emp: emp
    });
}

//Remove employee
module.exports.removeEmployee = async function(req, res){
    try{
        //Find and delete the employee from the employee collection
        await Emp.findByIdAndDelete(req.params.id);
        req.flash('success', 'Employee removed');
        return res.redirect('/');

    }catch(err){
        console.log(err);
        req.flash('error', 'Could not remove employee, please try again');
        return res.redirect('back');
    }
}

//Make employee the admin
module.exports.makeAdmin = async function(req, res){
    try{
        //Find the emp in employee collection, remove it from EMP and add to the admin
        let emp = await Emp.findById(req.params.id);
        //add to the admin
        await Admin.create({
            name: emp.name,
            DOB: emp.DOB,
            gender: emp.gender,
            emp_ID: emp.emp_ID,
            department: emp.department,
            DOJ: emp.DOJ,
            emp_email: emp.emp_email,
            password: emp.password
        });
        //remove from the Emp
        await Emp.findByIdAndDelete(req.params.id);

        req.flash('success', 'Added as admin');
        return res.redirect('/');

    }catch(err){
        console.log(err);
        req.flash('error', "Could not add as admin, please try again");
        return res.redirect('back');
    }
}


//Render employee update page
module.exports.updatePage = function(req, res){
    return res.render('update_emp_details',{
        title: "Update Employee",
        id: req.params.id
    });
}

//Update employee details
module.exports.updateEmployee = async function(req,res){
    try{
        await Emp.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            DOB: req.body.dob,
            gender: req.body.gender,
            department: req.body.department,
            emp_email: req.body.email
        });

        req.flash('success', 'Employee details updated successfully');
        return res.redirect(`/emp-details/${req.params.id}`);

    }catch(err){
        console.log(err);
        req.flash('error', 'Could not update the employee');
        return res.redirect('back');
    }
}

//render performance review assigning page
module.exports.reviewAssignPage = async function(req, res){
    let emp1= await Emp.findById(req.params.id);
    let emps= await Emp.find({});

    return res.render('review_assign_page',{
        title: 'Performance review assigning',
        emp1:emp1,
        emps: emps
    });
}

