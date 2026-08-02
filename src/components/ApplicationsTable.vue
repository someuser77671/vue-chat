<template>
  <app-table
    :table="table"
    empty-text="Заявок нет"
  >
    <template #phone="{ cell }">
      <div :class="cell.twStyle">{{ '+' + cell.value }}</div>
    </template>
    <template #amount="{ cell }">
      <div :class="cell.twStyle">{{ displayAmount(+cell.value) }}</div>
    </template>
    <template #status="{ cell }">
      <div :class="cell.twStyle">
        <ApplicationStatus
          disabled-transition
          class="w-40"
          :status="cell.value"
        />
      </div>
    </template>
    <template #action="{ cell }">
      <div :class="cell.twStyle">
        <app-button
          class="p-2! px-4!"
          @click="$emit('open-application', cell.value)"
        >
          Открыть
        </app-button>
      </div>
    </template>
  </app-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import displayAmount from '@/utils/displayAmount';

import ApplicationStatus from './ApplicationStatus.vue';

import type { IApplication } from '@/types';

defineEmits<{ (e: 'open-application', id: string): void }>();
const { applications } = defineProps<{ applications: IApplication[] }>();

const table = computed(() => ({
  headers: [
    { id: 'id', displayName: 'ID', twStyle: 'w-48 cursor-default' },
    { id: 'name', displayName: 'Имя', twStyle: 'w-48' },
    { id: 'phone', displayName: 'Телефон', twStyle: 'w-64' },
    { id: 'amount', displayName: 'Сумма', twStyle: '' },
    {
      id: 'status',
      displayName: 'Статус',
      twStyle: 'w-36 text-center ml-auto mr-6',
    },
    { id: 'action', displayName: 'Действие', twStyle: 'ml-8' },
  ],
  rows: applications.map((application) => ({
    cells: [
      { value: application.id, twStyle: 'w-48 cursor-default text-sm' },
      { value: application.name, twStyle: 'w-48 text-sm' },
      { value: application.phone, twStyle: 'w-64 text-sm' },
      { value: String(application.amount), twStyle: 'text-sm' },
      {
        value: application.status,
        twStyle: 'w-36 text-center ml-auto text-sm',
      },
      { value: application.id, twStyle: 'ml-8' },
    ],
  })),
}));
</script>
