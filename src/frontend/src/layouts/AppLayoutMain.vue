<template>
  <div class="layout-main">
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="../assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">{{ cartSum }} ₽</a>
      </div>
      <div class="header__user">
        <router-link to="/login" class="header__login">
          <span>Войти</span>
        </router-link>
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppLayoutMain",
  props: {
    cartSum: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.header__user {
  display: flex;
  align-items: center;
}

.header__user a {
  display: block;
  padding: 14px 20px;
  transition: 0.3s;
  background-color: #41b619;
}

.header__login::after {
  content: "";
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
  background: url(../assets/img/login.svg) no-repeat center;
  background-size: auto 50%;
}
</style>
