<style lang="less" scoped>
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Card>
        <h4 slot="title">
          <Icon type="android-archive"></Icon>
          教职工评价中心
        </h4>
        <Row span="1">
            
          <Button v-if="role=='stu'" type="primary" @click="addBtn">
            <Icon type="plus"></Icon>
            新增教师评价
          </Button>
          <Modal v-model="addModal" width="600px" :closable="closeable" :mask-closable="maskCloseable">
            <p slot="header" style="text-align:center">
              <Icon type="plus"></Icon>
              <span>评价</span>
            </p>
            <div>
              <Form ref="formValidate" :model="addForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="工号" prop="eva_tea_id">
                  <Input v-model="addForm.eva_tea_id" placeholder="教职工号"></Input>
                </FormItem>
              
                <FormItem label="评语" prop="eva_tea_content">
                  <Input type="textarea" v-model="addForm.eva_tea_content" placeholder="评语" ></Input>
                </FormItem>
               </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="addTeacher('formValidate')">添加</Button>
              <Button @click="cancelInput">取消</Button>
            </div>
          </Modal>
          <Modal v-model="updateModal" width="600px" :closable="closeable1" :mask-closable="maskCloseable1">
            <p slot="header" style="text-align:center">
              <Icon type="edit"></Icon>
              <span>修改评语</span>
            </p>
            <div>
              <Form ref="formValidate1" :model="updateForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="工号" prop="eva_tea_id">
                  <Input disabled v-model="updateForm.eva_tea_id" placeholder="教职工号"></Input>
                </FormItem>
                 <FormItem label="评语" prop="eva_tea_content">
                  <TextArea v-model="updateForm.eva_tea_content" placeholder="评语" style="width:514px"></TextArea>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="updateTeacher('formValidate1')">更新</Button>
              <Button @click="cancelInput">取消</Button>
            </div>
          </Modal>
        </Row>
        <Row class="margin-top-10">
          <Col span="23" class="margin-top-10">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
            <Page class="margin-top-20" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
          </Col>
          
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
import table2excel from "@/libs/table2excel.js";
import Cookies from "js-cookie";
const userId = Cookies.get("user");
export default {
  name: "teacher_evaluate",
  data() {
    const validePhone = (rule, value, callback) => {
      var re = /^1[0-9]{10}$/;
      if (!re.test(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    return {
      excelColumns: [
        {
          title: "序号",
          key: "id",
          width: 120
        },
        {
          title: "教职工号",
          key: "eva_tea_id",
          width: 120
        },
        {
          title: "学员工号",
          key: "eva_stu_id",
          width: 120
        },
        {
          title: "评语",
          key: "eva_tea_content",
        //   width: 100
        }
      ],
      action: {
        title: "操作",
        key: "action",
        align: "center",
        render: (h, params) => {
          return h("div", [
            h("Button", [
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "是否删除？",
                    placement: "right",
                    okText: "删除",
                    cancelText: "取消"
                  },
                  on: {
                    "on-ok": () => {
                      this.deleteTeacher(params.index);
                    },
                    "on-cancel": () => {}
                  }
                },
                "删除"
              )
            ])
          ]);
        },
        width:100
      },
      table2excelData: [],
      border: true,
      size: "large",
      excelFileName: "",
      tableExcel: {},
      fontSize: 16,
      total: 0,
      pageSize: 20,
      currentPage: 1,
      addModal: false,
      updateModal: false,
      closeable: false,
      closeable1: false,
      maskCloseable: false,
      maskCloseable1: false,
      form: {
        //request
        pageSize: 20,
        currentPage: 1,
        eva_stu_id: Cookies.get("user")
      },
      addForm: {
        tea_id: "",
        tea_name: "",
        eva_tea_content: "",
        eva_stu_id: Cookies.get("user")
      },
      role: "",
      updateForm: {}
    };
  },
  mounted() {
    this.request();
  },
  methods: {
    request() {
      this.$http
        .post("http://localhost:9090/auth/users/" + userId, {
          params: { user_id: userId }
        })
        .then(res => {
          if (res.data.success) {
            var user = res.data.list[0];
            if (user.user_role != 1) {
              this.role = "stu";
              this.excelColumns.push(this.action);
            } else {
              this.role = "tea";
            }
            this.form.role = this.role;
            this.$http
              .post("http://localhost:9090/auth/evaluate/list", this.form)
              .then(
                res => {
                  if (res.data.success) {
                    this.table2excelData = res.data.list;
                    this.total = res.data.total;
                  } else {
                    this.$Message.error(res.data.info);
                  }
                },
                err => {
                  this.$message.error("请求错误！");
                }
              );
          }
        });
    },

    searchBtn() {
      this.request();
    },

    show(index) {
      this.$Modal.info({
        title: "详细信息",
        content: `登录密码：  ${this.table2excelData[index].user_password}`
      });
    },
    onchangePage(val) {
      this.currentPage = val;
      this.form.currentPage = val;
      this.request();
    },
    //add a teacher information
    addBtn() {
      this.addModal = true;
    },
    addTeacher(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.updateForm.tea_gender=parseInt(this.updateForm.tea_gender);
          this.addForm.eva_stu_id = Cookies.get("user");
          this.$http
            .post("http://localhost:9090/auth/evaluate/add", this.addForm)
            .then(
              res => {
                if (res.data.success) {
                  this.$Message.success(res.data.info);
                  this.cancelInput();
                } else {
                  this.$Message.error(res.data.info);
                }
              },
              err => {
                this.$message.error("请求错误！");
              }
            );
        }
      });
    },
    cancelInput() {
      this.addModal = false;
      this.updateModal = false;
      this.updateForm = {};
      this.addForm = {
        eva_tea_id: "",
        eva_tea_content: ""
      };
    },

    //update teacher's information
    updateTeacher(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.updateForm.tea_gender=parseInt(this.addForm.tea_gender);
          this.$http
            .post(
              "http://localhost:9090/auth/evaluate/updateInfo",
              this.updateForm
            )
            .then(
              res => {
                if (res.data.success) {
                  this.$Message.success(res.data.info);
                  this.cancelInput();
                } else {
                  this.$Message.error(res.data.info);
                }
              },
              err => {
                this.$message.error("请求错误！");
              }
            );
        } else {
        }
      });
    },
    //delete a teacher
    deleteTeacher(index) {
      let form = {
        id: this.table2excelData[index].id
      };
      this.$http.post("http://localhost:9090/auth/evaluate/delete", form).then(
        res => {
          if (res.data.success) {
            this.$Message.success(res.data.info);
            this.table2excelData.splice(index, 1);
          } else {
            this.$Message.error(res.data.info);
          }
        },
        err => {
          this.$message.error("请求错误！");
        }
      );
    }
  }
};
</script>
<style scoped>
</style>
