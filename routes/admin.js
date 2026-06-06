const express = require('express');
const router = express.Router();
const sql = require('../sql.js');


router.get('/',(req,res,next)=>{
    res.render('adminLogin');
});

router.post('/',(req,res,next)=>{
    // console.log(req.body);
    const val = req.body;
    const userName = val.userName;
    const userPwd = val.userPwd;
    
    sql.query('select * from userdata where username=? and userpwd=?',[userName,userPwd],(err,result,fields)=>{
        if(err) throw err;

        console.log(result);
        // res.render('admin');

        if(result.length>0){
            res.render('admin');
        }
    });
    // sql.end();
});

router.get('/login',(req,res,next)=>{
    res.render('adminLogin');
});

module.exports=router;