const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');
var jsonQuery = require('json-query');


const app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//json object
var jsonforapi=([
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
]);



var port = process.env.PORT || 8484;     

var router = express.Router(); 


router.get('/',function(req,res){
    res.json([
        {
            status: res.statusCode,
        }
    ]);
});

router.get('/api/TodoItems', function(req, res) {
    res.json(jsonforapi);   
});


router.get('/api/TodoItems/:id',function(req,res){
    var id= req.params.id;
    console.log(id);
    

    for (i=0;i<jsonforapi.length;i++){
        if (id==jsonforapi[i].todoItemId){
            res.json(jsonforapi[i]);
        } 
    }
});
// everything below here is working
router.post('/api/TodoItems',function(req,res){

    var newitem={
        todoItemId: 0,
        name: 'Laundry',
        priority: 5,
        completed: false
      };
    res.status(201).json(newitem);
console.log(newitem);
});
//everything above here is working
router.delete('/api/TodoItems/:id',function(req,res){
    var id= req.params.id;
    for (i=0;i<jsonforapi.length;i++){
        if (id==jsonforapi[i].todoItemId){
            res.json(jsonforapi[i]);
        } 
    }
})

app.use('/',router);
app.use('/api/TodoItems', router);


// app.post('/api/TodoItems', function(req, res) {
//     var todoItemId = req.body.id;
//     var name = req.body.token;
//     var priority = req.body.geo;
//     var completed= 

//     res.send(user_id + ' ' + token + ' ' + geo);
// });



module.exports = app;
