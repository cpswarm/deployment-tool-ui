<template>
  <div id="home">
    <div></div>
    <div id="signin">
      <div style="grid-column:1/3; margin-top:150px;margin-bottom:50px">
        <h1>Welcome to CPSwarm!</h1>
      </div>
      <div class="form-group row">
        <label for="usrname" class="col-sm-3 col-form-label">User Name:</label>
        <div class="col-sm-9">
          <input type="password" class="form-control" id="usrname" placeholder="User Name">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">Password:</label>
        <div class="col-sm-9">
          <input type="password" class="form-control" id="inputPassword" placeholder="Password">
        </div>
      </div>
      <div></div>
      <div style="text-align:right">
        <button type="button" class="btn btn-primary" @click="handleSubmit">Submit</button>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
export default {
  methods: {
    handleSubmit() {
      this.$router.push({ path: "/home" });
    }
  }
};
</script>
<style>
#home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>



