const teacherController = require('../controllers/teacher.js');
const router = require('koa-router')();

router.post('/teacher', teacherController.postTeaInfo);
router.post('/evaluate/add', teacherController.addEvalute);
router.post('/evaluate/delete', teacherController.delEvalute);
router.post('/evaluate/list', teacherController.getEvaluteList);
router.post('/teacher/updateTel',teacherController.updateTel);
router.post('/teacher/updateInfo',teacherController.updateInfo);
router.post('/teacher/list', teacherController.getTeaList);
router.post('/teacher/add',teacherController.addTeacher);
router.post('/teacher/del',teacherController.delTeacher);

module.exports = router;
