<template>
  <form
    class="flex flex-col gap-2 mt-8"
    @submit.prevent
  >
    <div class="dark:text-gray-100">Имя:</div>
    <app-input
      ref="name-input"
      v-model="formData.name"
      placeholder="Введите имя"
      with-error
      :error="formErrors.name"
      @focus="formErrors.name = ''"
    />
    <div class="dark:text-gray-100">Телефон:</div>
    <app-input
      v-model.num.positive="formData.phone"
      placeholder="79876543210"
      with-error
      :error="formErrors.phone"
      @focus="formErrors.phone = ''"
    />
    <div class="dark:text-gray-100">Сумма:</div>
    <app-input
      v-model.num.positive="formData.amount"
      placeholder="Сумма"
      with-error
      :error="formErrors.amount"
      @focus="formErrors.amount = ''"
    />
    <div class="dark:text-gray-100">Статус:</div>
    <app-select
      v-model="formData.status"
      :options="APPLICATION_STATUS_OPTIONS"
    />
    <div class="mt-16">
      <app-button
        type="button"
        @click="submit"
      >
        Создать
      </app-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue';
import { useFocus } from '@vueuse/core';

import { APPLICATION_STATUS_OPTIONS } from '@/consts';
import { applicationSchema } from '@/types/validation';

import type { IApplication } from '@/types';
import type { ToString } from '@/utility-types';

useFocus(useTemplateRef<HTMLInputElement>('name-input'), {
  initialValue: true,
});

const emit = defineEmits<{
  (e: 'submit', formData: Omit<IApplication, 'id'>): void;
}>();
const { initialForm } = defineProps<{
  initialForm: Omit<IApplication, 'id'>;
}>();

const formData = reactive<ToString<typeof initialForm>>({
  ...initialForm,
  amount: (initialForm.amount || '').toString(),
});
const formErrors = ref({ name: '', phone: '', amount: '' });

const isFormErrorKey = (key: unknown): key is keyof typeof formErrors.value => {
  if (typeof key !== 'string') {
    return false;
  }

  return key in formErrors.value;
};

const submit = () => {
  const preparedToSubmitFormData = {
    ...formData,
    amount: Number(formData.amount),
  };

  const { success, error, data } = applicationSchema.safeParse(
    preparedToSubmitFormData,
  );

  if (success) {
    emit('submit', data);
  } else {
    const foundErrors = { name: '', phone: '', amount: '' };

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
