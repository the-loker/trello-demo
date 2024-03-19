<script lang="ts" setup>
  import { useHeader } from './use-header';

  const { isAuth, onLogout } = useHeader();
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <ul class="header-nav">
        <li class="header-nav__item">
          <router-link class="header-nav__link" to="/" exact>Home</router-link>
        </li>
      </ul>
      <ul class="header-auth-nav">
        <template v-if="!isAuth">
          <li class="header-auth-nav__item">
            <router-link class="header-auth-nav__link" to="/signin"
              >Sign in</router-link
            >
          </li>
          <li class="header-auth-nav__item">
            <router-link class="header-auth-nav__link" to="/signup"
              >Sign up</router-link
            >
          </li>
        </template>

        <template v-else>
          <li class="header-auth-nav__item">
            <router-link class="header-auth-nav__link" to="/board"
              >Board</router-link
            >
          </li>
          <li class="header-auth-nav__item">
            <a
              href="#"
              class="header-auth-nav__link"
              to=""
              @click.prevent="onLogout"
              >Logout</a
            >
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<style lang="scss">
  .header-container {
    display: flex;
    flex-direction: row;
  }

  .header-nav,
  .header-auth-nav {
    display: flex;
    flex-direction: row;

    margin: 0;
    padding: 0;

    list-style: none;

    gap: 10px;

    &__link {
      position: relative;

      text-decoration: none;

      color: #ffffff;
    }

    &__link::after {
      position: absolute;
      bottom: -3px;
      left: 0;

      width: 100%;

      content: "";
      transition: opacity 0.3s;

      opacity: 0;
      border-bottom: 2px solid #ffffff;
    }

    &__link:hover::after {
      opacity: 1;
    }
  }

  .header-nav {
    flex: 1;
  }

  .header-auth-nav {
    .router-link-active::after {
      position: absolute;
      bottom: -3px;
      left: 0;

      width: 100%;

      content: "";

      opacity: 1;
      border-bottom: 2px solid #00d700 !important;
    }
  }

</style>
