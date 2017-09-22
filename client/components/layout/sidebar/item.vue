<template>
  <li class="classes">
    <a href="link">
      <icon name="icon" v-if="icon"></icon>
      <span class="menu-link-text">
        {{ label }}
      </span>
    </a>
    <slot></slot>
  </li>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      icon: String
    }
  }
</script>
