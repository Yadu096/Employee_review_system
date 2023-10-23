const Admin = require('../model/admin');
const Emp = require('../model/employee');

module.exports.homePage = async function(req, res){
    try{
        let empID = req.user.emp_ID;
        //check if the logged in user is an admin/employee
        let admin = await Admin.findOne({emp_ID: empID});
        if(admin){
            //then render the admin page, pass along all the employees
            let emps = await Emp.find({});
            return res.render('admin_view',{
                title: "Home",
                admin: admin,
                emps: emps
            });
        }else{
            //otherwise render the employee page
            let emp = await Emp.findOne({emp_ID: empID}).populate('for_review');
            return res.render('emp_view',{
                title: "Home",
                emp: emp
            });
        }
    }catch(err){
        console.log(err);
        req.flash('error', '***Error***');
        return res.redirect('back');
    }
}