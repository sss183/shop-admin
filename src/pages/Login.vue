<template>
  <div class="login-bg">
    <div class="login-container">
      <!-- el-form:表单容器
             model:表单数据,data需要设置对应的数据对象
             ref:表单组件引用
             rules:验证规则
      -->
      <el-form :model="ruleForm" ref="loginForm" :rules="rules">
        <h2>登录</h2>
        <!-- 
                prop:获取rules中同名验证规则进行验证
                label:表单关联文字
        -->
        <el-form-item prop="username" label>
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label>
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form>
          <el-button type="primary" @click="submit('loginForm')">登录</el-button>
        </el-form>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
export default {
  methods: {
    ...mapMutations(["setInfo"]),
    ...mapActions(["userLogin"]),
    submit(form) {
      // 利用传入的ref值，调用表单组件的验证方法
      // @value:boolean 是否通过验证的boolean
      console.log(this.$store);
      this.$refs[form].validate(value => {
        if (!value) {
          return false;
        }
        // this.userLogin(this.ruleForm);
        this.$http.post(this.$api.USERLOGIN, this.ruleForm).then(res => {
          console.log(res);
          // 登录成功
          if (res.code == 200) {
            this.setInfo({ token: res.list.token, info: res.list });
            this.$router.replace("/index");
          } else {
            // 登录失败
            // this.$message({
            //                 type:"error",
            //                 msg:res.msg
            //             })
            this.$message.error(res.msg);
          }
        });
      });
    }
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        // 验证规则名称，每一个对象都是一条验证规则
        username: [
          {
            required: true, //必填项
            message: "请输入管理员名称", //提示信息
            trigger: "blur" //失去焦点时触发验证
          },
          {
            pattern: /^\S{4,8}$/g,
            message: "请输入4-8非空字符",
            trigger: "blur" //失去焦点时触发验证
          }
        ],
        password: [
          {
            required: true, //必填项
            message: "请输入管理员密码", //提示信息
            trigger: "blur" //失去焦点时触发验证
          },
          {
            max: 8,
            min: 5,
            message: "请输入5-8字符",
            trigger: "blur" //失去焦点时触发验证
          }
        ]
      }
    };
  }
};
</script>
<style lang="less">
.login-bg {
  height: 100%;
  background: -webkit-linear-gradient(left, #563443, #413a53, #2f3d60);
  .login-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    width: 300px;
    height: 250px;
    h2 {
      color: #fff;
      margin-bottom: 20px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
