<template>
  <div :class="$style.footer">
    <div class="container">
      <div :class="$style['footer__inner']">
        <div :class="$style['footer__copy']"> Все права защищены 2022</div>
        <div :class="$style['footer__aftor']">Aftor: <a href="https://senpaz.github.io/"> Nikolaev Artem</a> </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer"
}
</script>

<style module>
.footer{
  background-color: #060f26;
  padding: 30px 0;
}
.footer__inner{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer__copy,
.footer__aftor,
a{
  color: #fff;
}
</style>
