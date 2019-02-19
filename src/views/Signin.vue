<template>
  <div class="home">
    <h1>Welcome to CPSwarm!</h1>
    <div style="padding-left: 40%">
      <div style="text-align: right; float: left; padding: 2%">
        <label for="login">Name:</label>
        <br>
        <br>
        <label>Role:</label>
        <br>
        <br>
        <label>Password:</label>
        <br>
        <br>
      </div>
      <div style="text-align: left; float: left; padding: 2%">
        <input id="login" type="text">
        <br>
        <br>
        <input type="radio" name="developer">developer
        <input type="radio" name="manager">manager
        <br>
        <br>
        <input type="text">
        <br>
        <br>
        <input type="submit" @click="handleSubmit">
        <draggable @start="drag=true" @end="drag=false">
          <h1>hhhh</h1>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  methods: {
    handleSubmit() {
      this.$router.push({ path: "/home" });
    }
  },
  components: {
    draggable
  }
};
</script>


