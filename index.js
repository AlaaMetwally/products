var express = require('express');
var connect = require('connect');
var logger = require('morgan');
var path = require('path');
var routes = require('./routes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Product = require('./model/product')

var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product');
mongoose.connection.once('open',()=>{
console.log('connected to mongoo')
})
mongoose.connection.on('error',(err)=>{
console.log('connected to mongoo error ',err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use("/",(r,s,n) => {
//   console.log(r.body);
//   n();
// })

app.get('/', routes.add);
app.post('/add',function(req,res){
  var name = req.body.name
  var price = req.body.price
  var quantity = req.body.quantity
  var product = new Product({
      name:name,
      price:price,
      quantity:quantity
  })  
  product.save(function (err,  doc) {
    if (err) res.send(err)
    res.send(doc)
  })
  })
  app.post('/edit/:id', function(req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;

    var newProduct = {
      name: name,
      price: price,
      quantity: quantity
    };
    Product.findById(id, function (err, product) {
      product.update(newProduct, null, function(err, numberAffected, raw) {  
        res.redirect("/");
      });
    });
  });
  app.post('/dele/:id', function(req, res, next) {
    var id = req.params.id;
    Product.findByIdAndRemove({'_id':id},function(err,doc){
      doc.remove(function(err,doc){
      })
      res.redirect("/");
    })
  })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(5000);