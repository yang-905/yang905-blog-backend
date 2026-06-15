var express = require('express');
var router = express.Router();
const sql = require('../sql.js');

/* GET home page. */
router.get('/posts', function(req, res, next) {
    // 获取分页参数，提供默认值：第1页，每页10条
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const offset = (page - 1) * limit;

    // 查询分页数据
    const sqlQuery = 'SELECT a.*,b.username FROM blogdata.posts as a left join blogdata.userdata as b on a.author_id = b.id LIMIT ? OFFSET ?';
    sql.query(sqlQuery, [limit, offset], (err, result, fields) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: '数据库查询失败' });
        }
        // 直接返回分页结果数组
        console.log(result);
        res.send(result);
    });
});

router.get('/userdata',function(req,  res, next){
    sql.query('select username,user_signature,user_title_image_path,user_head_image_path from blogdata.userdata where username=\'admin\';',(err,result,fields)=>{
        if(err) throw err;

        console.log(result);
        res.send(result);
    });
});

module.exports = router;
