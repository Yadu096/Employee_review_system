const Emp = require('../model/employee');
const Performance = require('../model/performance');

//Add employee for review to another employee's portal
module.exports.addForReview = async function(req, res){
    
    console.log(req.query);
    try{
        //Get the employee who is to review
        let emp = await Emp.findById(req.query.addIn);
        emp.for_review.push(req.query.addEmp);
        emp.save();

        req.flash('success', 'Successfully added for review');
        return res.redirect(`/emp-details/${req.query.addEmp}`);

    }catch(err){
        console.log(err);
        req.flash('error', 'could not assign');
        return res.redirect('back');
    }
}


//Render the performance review page
module.exports.reviewPage =async function(req, res){
    try{
        //get the employee to be reviwed and pass along 
        let emp = await Emp.findById(req.params.id);
        console.log(emp.name);
        return res.render('performance_review',{
            title: 'Performance review',
            emp: emp
        });

    }catch(err){
        console.log(err);
        req.flash('error', 'Could not get you the review page');
        return res.redirect('back');
    }
    
}

//Create review
module.exports.createReview = async function(req, res){
    try{
        //add the performance review in the Performance collection
        let perReview = await Performance.create({
            rating: req.body.rating,
            feedback: req.body.feedback,
            review_for: req.query.reviewFor,
            review_by: req.query.reviewBy
        });
        //Add id of this performance review in the reviewed employee collection
        let emp = await Emp.findById(req.query.reviewFor);
        emp.performance_review = perReview._id;
        emp.save();

        req.flash('success', 'Employee performance review submitted');
        return res.redirect('/');


    }catch(err){
        console.log(err);
        req.flash('error', 'Could not post the review, please try again');
        return res.redirect('back');
    }
}

//render update review page
module.exports.updatePage = function(req, res){
    return res.render('update_review', {
        title: 'Update review',
        id: req.params.id
    });
}

//Update the review
module.exports.updateReview = async function(req, res){
    try{
        //get the performance to be updated
        let perReview = await Performance.findById(req.params.id);
        //update it
        perReview.rating = req.body.rating;
        perReview.feedback = req.body.feedback;
        perReview.save();

        req.flash('success', 'Performance review updated');
        return res.redirect(`/emp-details/${perReview.review_for}`);

    }catch(err){
        console.log(err);
        req.flash('error', 'Could not update the performance review'); return res.redirect('back');
    }
    

}