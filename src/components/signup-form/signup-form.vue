<script lang="ts" setup>
  import { onBeforeUnmount } from 'vue';
  import { useSignupForm } from './use-signup-form';

  const { formData, isLoading, errors, hasErrors, clearErrors, onSignup } =
    useSignupForm();

  onBeforeUnmount(() => clearErrors());
</script>

<template>
  <div v-if="hasErrors" class="auth-errors">
    <div v-for="(error, idx) in errors" :key="idx" class="auth-errors__message">
      <span>{{ error }}</span>
    </div>
  </div>

  <form class="signup-form" @submit.prevent="onSignup">
    <div class="signup-form__item">
      <input
        class="input"
        v-model="formData.username"
        placeholder="Name"
        :disabled="isLoading"
      />
    </div>
    <div class="signup-form__item">
      <input
        class="input"
        v-model="formData.email"
        placeholder="Email"
        :disabled="isLoading"
      />
    </div>
    <div class="signup-form__item">
      <input
        type="password"
        class="input"
        v-model="formData.password"
        placeholder="Password"
        :disabled="isLoading"
      />
    </div>
    <button class="button button--primary" type="submit" :disabled="isLoading">
      Sign up
    </button>
  </form>
</template>
