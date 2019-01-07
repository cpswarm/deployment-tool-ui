<template>
  <div class="home">
    <h1>Welcome to CPSwarm!</h1>
    <div style="padding-left: 40%">

       <div style="text-align: right; float: left; padding: 2%" >
      <label for="login">Name:</label><br> <br>
       <label>Role:</label>    <br> <br>
    <label>Password:</label> <br> <br>
 </div>
    <div style="text-align: left; float: left; padding: 2%" >
    <input id="login" type="text">   <br> <br>
      <input type="radio" name="developer">developer
      <input type="radio" name="manager">manager <br><br>
      <input type="text"> <br><br>
      <input type="submit" @click="handleSubmit"> 

    </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    handleSubmit(){
      this.$router.push({ path: '/about' })
    }

  }
}
</script>


