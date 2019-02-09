<template>
    
    <form class="mb-3 pa-2">
      <fieldset style="position: relative;">
        <legend>Personalizar listagem:</legend>
        <div class="collapse-icon" :class="{ 'not-expanded': !this.expanded }" @click="toggleCardState">
          <v-icon width="24" height="24">expand_more</v-icon>
        </div>
        <div class="option-content" :class="{ 'not-expanded': !this.expanded }">
            <slot />
        </div>
      </fieldset>
    </form>

</template>

<script>
export default {
  data() {
    return {
      expanded: true
    }
  },
  methods: {
    toggleCardState() {
      this.expanded = !this.expanded;
    }
  }    
}
</script>

<style lang="scss" scoped>

.fieldset {
    position: relative;
}

.collapse-icon {
    position: absolute; 
    right: 1rem; 
    top: 0;        
    width: 24; 
    height: 24; 
    background-color: #fff;
    box-shadow: 0 10px 20px -2px rgba(0,0,0,.2);

    &:hover {
        cursor: pointer;
    }

    i {
        transform: rotate(180deg);
        transition: transform .2s ease-out;            
    }

    &.not-expanded i {
        transform: rotate(0deg);
    }
}

.option-content {
    transition: all .2s ease;
    
    &.not-expanded {
        transform: scaleY(0);
        transform-origin: top;
        opacity: 0;
        height: 0;
        padding: 0;
    }

    i {
        transform: rotate(0deg);
    }
}

</style>


