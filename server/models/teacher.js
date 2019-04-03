const theDatabase = require('../config/db.js').theDb;
const teacherSchema = theDatabase.import('../schema/teacher.js');
const evaluateSchema = theDatabase.import('../schema/evaluate.js');

// 通过表（teacher）中用户tea_id查找
const getTeaById = async function (id) {
    const teacherInfo = await teacherSchema.findOne({
        where: {
            tea_id: id
        }
    });
    return teacherInfo
}

//根据id修改tel
const updateTel = async (id, tel) => {
    await teacherSchema.update(
        {
            tea_tel: tel
        },
        {
            where: {
                tea_id: id
            }
        }
    );
    return true;
}

//
const updateInfo = async (tea_id, tea_gender, tea_tel, tea_class, tea_college, tea_major) => {
    await teacherSchema.update(
        {
            tea_gender,
            tea_tel,
            tea_class,
            tea_college,
            tea_major
        },
        {
            where: {
                tea_id
            }
        }
    );
    return true;
}

//删除工号为tea_id的教职工信息
const delTeacher = async (tea_id) => {
    await teacherSchema.destroy({
        where: {
            tea_id
        }
    });
    return true;
}

const delEvalute = async (id) => {
    await evaluateSchema.destroy({
        where: {
            id
        }
    });
    return true;
}
//add a teacher
const addTeacher = async (tea_id, tea_name, tea_gender, tea_tel, tea_class, tea_college, tea_major) => {
    await teacherSchema.create({
        tea_id,
        tea_name,
        tea_gender,
        tea_tel,
        tea_class,
        tea_college,
        tea_major
    });
    return true;
}
//add 评论
const addEvalute = async (eva_tea_id,  eva_stu_id,eva_tea_content) => {
    await evaluateSchema.create({
        eva_tea_id,
        eva_tea_content,
        eva_stu_id
    });
    return true;
}
//查询表（teacher）中所有用户信息
const getTeaList = async function () {
    return await teacherSchema.findAndCount(); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
}

const getEvaluteList = async function (eva_stu_id,role) {
    var where={}
    if (role=='stu') {
        where.eva_stu_id=eva_stu_id;
        return await evaluateSchema.findAndCount(
            {
               where
            }
        ); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
    }else if (role=='tea') {
        where.eva_tea_id=eva_stu_id;
        return await evaluateSchema.findAndCount(
            {
                where
            }
        ); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
    }
   
}

const getTea = async function (tea_id) {
    return await teacherSchema.findAndCount({
        where: {
            tea_id
        }
    }); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
}

module.exports = {
    getTeaById,
    getTeaList,
    updateTel,
    updateInfo,
    delTeacher,
    addTeacher,
    getTea,
    addEvalute,
    getEvaluteList,
    delEvalute
}
