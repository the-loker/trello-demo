<script lang="ts" setup>
  import { useSignupForm } from './use-signup-form';

  const { formData } = useSignupForm();
</script>

<template>
  <form class="signup-form" @submit.prevent="">
    <div class="signup-form__item">
      <input class="input" v-model="formData.username" placeholder="Name" />
    </div>
    <div class="signup-form__item">
      <input class="input" v-model="formData.email" placeholder="Email" />
    </div>
    <div class="signup-form__item">
      <input class="input" v-model="formData.password" placeholder="Password" />
    </div>
    <button class="button button--primary">Sign up</button>
  </form>
</template>
