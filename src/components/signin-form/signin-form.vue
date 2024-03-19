<script lang="ts" setup>
  import { useSigninForm } from './use-signin-form';

  const { formData } = useSigninForm();
</script>

<template>
  <form class="signin-form" @submit.prevent="">
    <div class="signin-form__item">
      <input class="input" v-model="formData.username" placeholder="Name" />
    </div>
    <div class="signin-form__item">
      <input class="input" v-model="formData.password" placeholder="Password" />
    </div>
    <button class="button button--primary">Sign in</button>
  </form>
</template>
