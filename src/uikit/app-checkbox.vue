<template>
  <label :class="{ 'cursor-default': disabled, 'cursor-pointer': !disabled }">
    <input
      v-model="model"
      type="checkbox"
      class="appearance-none absolute"
      :disabled="disabled"
      :="$attrs"
    />
    <div class="flex items-center gap-4">
      <div
        :class="[
          'w-8 h-8',
          'bg-blue-300 dark:bg-blue-900',
          'border-[1px]! rounded',
          'border-blue-400! dark:border-blue-700!',
          'before:content-[\'\'] before:block',
          'before:w-4 before:h-4 before:rounded-[2px]',
          'flex items-center justify-center',
          modelValue && 'before:bg-blue-500',
          disabled
            && 'dark:border-gray-600! dark:bg-gray-800 opacity-60 cursor-not-allowed',
        ]"
      ></div>
      <div><slot /></div>
    </div>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
const { disabled } = defineProps<{ disabled?: boolean }>();
</script>
