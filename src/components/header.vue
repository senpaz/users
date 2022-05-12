<template>
  <div :class="$style.header">
    <div class="container">
      <div :class="$style['header__inner']">
        <h2 :class="$style['header__logo']"> <router-link to="/">Application of user roles</router-link> </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
}
</script>

<style module>
.header{
  background-color: #060f26;
  padding: 30px 0;
}
.header__logo{
  text-transform: uppercase;
  color: #fff;
  font-weight: 500;
}
</style>
