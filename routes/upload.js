var express = require('express');
var router = express.Router();
const sql = require('../sql.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads'); // 创建文件夹
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 指定文件存储的目标目录
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    //获取后缀
    const ext = path.extname(file.originalname);
    // 自定义文件名
    cb(null, Date.now() + '-blog' + ext);
  },
});

// 创建 multer 实例，传入 storage
const upload = multer({ storage: storage });

router.get('/', function(req, res, next){
    res.send('ready')
    // res.sendFile(path.join(uploadDir,'1779809671640-blog.jpg'))
})

router.post('/', upload.single('file'), function(req, res){
    console.log(req.file)
    res.send(req.file)
})


// router.post('/',multer({
//     dest:'upload'
// }).single('file'), function(req, res){
//     console.log(req.file)
//     res.send(req.file)
// })

module.exports=router;