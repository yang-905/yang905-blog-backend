var express = require('express');
var router = express.Router();
const sql = require('../sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
   sql.query('select * from posts',(err,result,fields)=>{
        if(err) throw err;

        console.log(result);
        // res.render('admin');
        res.send(result);
    });
});

module.exports = router;
