<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
  mounted() {
    for (const node of this.$el.children) {
      const name = node.nodeName.toLowerCase()
      if (name !== 'button') {
        console.warn(`g-button-group的元素应该全是button，但你写的是 ${name}`)
      }
    }
  }
}
</script>

<style>
    .g-button-group {
        display: inline-flex;
        vertical-align: middle;
        justify-content: center;
    }

    .g-button-group .g-button {
        border-radius: 0;
        margin-left: -1px;
    }

    .g-button-group .g-button:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        margin-left: 0;
    }

    .g-button-group .g-button:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .g-button-group .g-button:hover {
        position: relative;
        z-index: 1;
    }


</style>

