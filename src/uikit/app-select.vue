<template>
  <div class="w-full relative">
    <app-dropdown
      v-model="model"
      :options="options"
    >
      <template #trigger="{ toggle }">
        <button
          :class="[
            'relative',
            'w-full',
            'flex items-center',
            'p-4 border',
            'cursor-pointer rounded',
            'bg-white dark:bg-gray-900',
            'border-gray-400 dark:border-gray-800',
            'focus:outline-violet-500 focus:border-violet-500 focus:outline-2',
          ]"
          @click="toggle()"
        >
          <div
            v-if="currentDisplayName"
            class="text-gray-950 dark:text-white"
          >
            {{ currentDisplayName }}
          </div>
          <div
            v-else
            class="text-gray-400"
          >
            Не выбрано
          </div>
          <div
            :class="[
              'absolute top-2/4 -translate-1/2! right-3',
              'w-4 h-4',
              'before:block before:w-1 before:h-3.5',
              'before:absolute before:top-1/4 before:-translate-1/2! before:right-1',
              'before:-rotate-45',
              'before:bg-gray-500',
              'before:rounded',
              'after:block after:w-1 after:h-3.5',
              'after:absolute after:top-3/4 after:-translate-1/2! after:right-1',
              'after:rotate-45',
              'after:bg-gray-500',
              'after:rounded',
            ]"
          />
        </button>
      </template>
      <template #option="{ option }">
        <button
          v-if="option.displayName"
          :class="[
            'w-full',
            'cursor-pointer rounded',
            'px-4 py-2 my-1 outline-0 focus:outline-2',
            'text-white text-left',
            'hover:bg-violet-700',
            'focus:outline-violet-700',
          ]"
          @click="model = option.id"
        >
          {{ option.displayName }}
        </button>
      </template>
    </app-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppDropdown from '@/uikit/app-dropdown.vue';

const { options } = defineProps<{
  options: Array<{ id: string; displayName: string }>;
}>();
const model = defineModel<string>({ default: null });

const optionsMap = computed(() =>
  options.reduce(
    (acc, option) => ({ ...acc, [option.id]: option.displayName }),
    {} as Record<string, string>,
  ),
);

const currentDisplayName = computed(() => {
  if (model.value) {
    const key = model.value as keyof typeof optionsMap.value;
    const value = optionsMap.value[key];

    if (typeof value === 'string' && value) {
      return value;
    }
  }

  return undefined;
});
</script>
