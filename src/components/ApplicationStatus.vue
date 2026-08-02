<template>
  <Transition
    name="opacity"
    mode="out-in"
  >
    <div
      :key="disabledTransition ? 'default' : status"
      class="inline-block relative border-2 rounded-xl p-2 px-3 text-[10px] leading-[initial] font-bold cursor-default z-0 shadow-xl/10"
      :class="twStyle"
      :="$attrs"
    >
      <div
        class="bg-white dark:bg-gray-700 inline-block absolute top-0 left-0 right-0 bottom-0 rounded-xl"
      ></div>
      <div class="relative z-1">{{ statusDisplayName }}</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { status, disabledTransition = false } = defineProps<{
  status: string;
  disabledTransition?: boolean;
}>();

const statusDisplayName = computed(() => {
  switch (status) {
    case 'active': {
      return 'Активен';
    }
    case 'completed': {
      return 'Завершен';
    }
    case 'rejected': {
      return 'Отменен';
    }
    case 'in_progress': {
      return 'Выполняется';
    }
    default: {
      return '== Unknown ==';
    }
  }
});

const twStyle = computed(() => {
  switch (status) {
    case 'active': {
      return 'border-green-700 text-green-700 dark:border-green-500 dark:text-green-500';
    }
    case 'completed': {
      return 'border-blue-700 text-blue-700 dark:border-blue-500 dark:text-blue-500';
    }
    case 'rejected': {
      return 'border-red-500 text-red-500';
    }
    case 'in_progress': {
      return 'border-yellow-500 text-yellow-500';
    }
    default: {
      return 'border-green-700 text-green-700 dark:border-green-500 dark:text-green-500';
    }
  }
});
</script>
