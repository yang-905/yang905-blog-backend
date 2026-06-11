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
});

router.get('/take', function(req, res, next){
    let filename = req.query.filename;
    if (!filename) {
        // 如果没有提供文件名，可以返回默认图片，或返回错误提示
        filename = '';
    }
    // 安全处理：只取文件名本身，去除路径部分，防止目录遍历攻击
    filename = path.basename(filename);

    // 构建完整的文件路径
    const filePath = path.join(uploadDir, filename);

    // 发送文件（浏览器会直接显示图片）
    res.sendFile(filePath, (err) => {
        if (err) {
            // 文件不存在或其他错误
            if (err.code === 'ENOENT') {
                res.status(404).send('图片不存在');
            } else {
                next(err); // 交给全局错误处理中间件
            }
        }
    });
});

router.post('/give', upload.single('file'), function(req, res){
    console.log(req.file)
    res.send(req.file)
});


// router.post('/',multer({
//     dest:'upload'
// }).single('file'), function(req, res){
//     console.log(req.file)
//     res.send(req.file)
// })

module.exports=router;