<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]: true}" @click="isLoading">
        <span v-bind:class="`${icon}`" :loading="loading" v-if=!loading></span>
        <span class="fas fa-spinner" v-if=loading></span>
        <p>
            <slot></slot>
        </p>
    </button>
</template>

<script>
export default {
  data() {
    return { loading: false }
  },
  props: {
    icon: {},
    iconPosition: {
      type: String,
      default: 'left',
      validator(value) {
        return value === 'left' || value === 'right'
      }
    }
  },
  methods: {
    isLoading() {
      this.$emit('click', this.loading = !this.loading)
    }
  }
}
</script>


<style>
@import url(https://use.fontawesome.com/releases/v5.2.0/css/all.css);

.g-button {
    font-size: 14px;
    height: 32px;
    padding: 0 1em;
    border-radius: 4px;
    border: 1px solid #777;
    background: #fff;
    transition: all 0.2s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
}

.g-button:before,span {
    order: 1;
    margin-right: 0.1em;
}

.g-button p,span {
    order: 2;
}

.icon-right:before,.icon-right span {
    order: 2;
    margin-right: 0;
    margin-left: 0.1em;
}

.icon-right p {
    order: 1;
}

.g-button:hover {
    border-color: #666;
    border: 1px solid #999;
}

.g-button:active {
    background-color: #eee;
}

.g-button:focus {
    outline: none;
}

.g-button:before {
    font-size: 1em;
    margin: 0.25em;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.fa-spinner {
    animation: spin 1s infinite linear;
}
</style>