<template>
  <div>
   <draggable @start="drag=true" @end="drag=false">
     <h1>hh</h1>
   </draggable>
  </div>
</template>
<script>
 import draggable from 'vuedraggable'

export default {
  components: {
    
    draggable,
  }
}
</script>
