var Product = require('../model/product')

exports.add=function(req,res){ 
    id=0; 
  Product.find(function(err,data){
    if(err) res.send(err);
    res.render('index', {products:data,id:id});
})
}
