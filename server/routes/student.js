const studentController = require('../controllers/student.js');
const router = require('koa-router')();
const path = require('path');
const express = require('express');

const app = new express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();
app.post('/auth/work/upload', multipartMiddleware, studentController.upload);

app.listen(3000, () => {
    console.log('server started at http://localhost:3000');
});

router.post('/student', studentController.postStuInfo)
router.post('/student/delStudent', studentController.delStudent)
router.post('/student/add', studentController.addStudent)
router.post('/work/upload', studentController.upload)
router.post('/work/list', studentController.listWork)
router.post('/work/add', studentController.addWork)
router.post('/work/update', studentController.updateWork)
router.post('/graduate/add', studentController.addGraduate)
router.post('/graduate/list', studentController.listGraduate)
router.post('/student/update', studentController.updateInfo)
router.post('/student/updateTel',studentController.updateTel)
router.post('/student/list', studentController.getStuList)
router.post('/student/getStudentsByCls', studentController.getStuListByCls)

module.exports = router;
