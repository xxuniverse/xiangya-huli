<template>
  <div class="containerLogin">
    <div class="header">
      <div class="wXlogin">修改密码</div>
    </div>
    <div class="section">
      <div class="section_center">
        <div>
          <input type="password" placeholder="请确认新密码" />
        </div>
         <div>
          <input type="password" placeholder="请确认新密码" />
        </div>
      </div>
       <div class="return">确定</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.containerLogin {
  position: relative;
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 5%;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  /* border-bottom: 1px solid #ccc; */
  background: #f8f8f8;
}

.wXlogin {
  margin-left: -23.5px;
  vertical-align: top;
  text-align: center;
  flex: 1;
  justify-items: center;
}
.section {
  width: 100%;
  position: absolute;
  top: calc(16px + 50px);
  left: 0;
}
.section_center {
  width: 100%;
  margin-top: 50px;
  box-sizing: border-box;
}
.section_center > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 .42rem;
  height: 1rem;
  line-height: 0.7rem;
  border-bottom: 1px solid #ccc;
}

.section_center > div input {
  height: 1rem;
  vertical-align: middle;
  flex: 3;
  color: #8090b5;
}

.return {
  text-align: center;
  margin: 0.63rem .55rem 0;
  height: 0.9rem;
  border-radius: 0.45rem;
  line-height: .9rem;
  background:linear-gradient(90deg,rgba(60,161,255,1),rgba(86,181,254,1));
  color: white
}
.return {
  border:1px solid #ccc;
}
</style>