const Reviews = require('../models/reviews');

exports.addReview =((req,res,next)=> {
    const companyName = req.body.companyName;
    const pros = req.body.pros;
    const cons = req.body.cons;
    const rating = req.body.rating;

    Reviews.create({
        companyName:companyName,
        pros:pros,
        cons: cons,
        rating:rating
    }).then( result => {
        //console.log(result);
        console.group("created sucessfully");
        res.redirect('/');
      }).catch(err => {
        console.log(err);
      });
});

exports.getReviews = ((req,res,next)=> {
    Reviews.findAll()
    .then (reviews =>{
        res.json(reviews);
    })
    .catch(err => console.log(err));
  });
  