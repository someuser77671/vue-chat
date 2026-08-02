<template>
  <form @submit.prevent="submit">
    <div class="flex flex-col gap-4 mb-4">
      <div class="dark:text-gray-100 cursor-default">Email:</div>
      <app-input
        ref="email-input"
        v-model="userForm.email"
        type="email"
        placeholder="Введите email"
        with-error
        :error="formErrors.email"
        @focus="formErrors.email = ''"
      />
    </div>
    <div class="flex flex-col gap-4 mb-4">
      <div class="dark:text-gray-100 cursor-default">Пароль:</div>
      <app-input
        v-model="userForm.password"
        type="password"
        placeholder="Введите пароль"
        autocomplete="on"
        with-error
        :error="formErrors.password"
        @focus="formErrors.password = ''"
      />
    </div>
    <app-button type="submit">Войти</app-button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue';
import { useFocus } from '@vueuse/core';

import type { TUserData } from '@/types';
import { userSchema } from '@/types/validation';

useFocus(useTemplateRef<HTMLInputElement>('email-input'), {
  initialValue: true,
});

const emit = defineEmits<{ (e: 'submit', form: TUserData): void }>();
const { initialForm } = defineProps<{ initialForm: TUserData }>();

const userForm = reactive<TUserData>(initialForm);
const formErrors = ref({ email: '', password: '' });

const isFormErrorKey = (key: unknown): key is keyof typeof formErrors.value => {
  if (typeof key !== 'string') {
    return false;
  }

  return key in formErrors.value;
};

const submit = () => {
  const { success, error } = userSchema.safeParse(userForm);

  if (success) {
    emit('submit', userForm);
  } else {
    const foundErrors = { email: '', password: '' };

    error.errors.forEach((zodErrorRecord) => {
      const key = zodErrorRecord.path[0];

      if (isFormErrorKey(key)) {
        foundErrors[key] = zodErrorRecord.message;
      }
    });
    formErrors.value = foundErrors;
  }
};
</script>
