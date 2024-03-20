<script lang="ts" setup>
  import { onBeforeUnmount } from 'vue';
  import { useSigninForm } from './use-signin-form';

  const { formData, isLoading, errors, onSignIn, hasErrors, clearErrors } =
    useSigninForm();

  onBeforeUnmount(() => clearErrors());
</script>

<template>
  <div v-if="hasErrors" class="errors">
    <div v-for="(error, idx) in errors" :key="idx" class="errors__message">
      <span>{{ error }}</span>
    </div>
  </div>

  <form class="signin-form" @submit.prevent="onSignIn">
    <div class="signin-form__item">
      <input
        class="input"
        v-model="formData.username"
        placeholder="Name"
        :disabled="isLoading"
      />
    </div>
    <div class="signin-form__item">
      <input
        type="password"
        class="input"
        v-model="formData.password"
        placeholder="Password"
        :disabled="isLoading"
      />
    </div>
    <button class="button button--primary" type="submit" :disabled="isLoading">
      Sign in
    </button>
  </form>
</template>
