<template>
  <label class="w-full flex flex-col gap-4 has-disabled:cursor-not-allowed">
    <div
      :class="[
        'w-full',
        'cursor-text rounded',
        'border',
        'bg-white dark:bg-gray-900',
        'border-gray-400 dark:border-gray-900',
        'focus-within:outline-2',
        'focus-within:outline-violet-500 focus-within:border-violet-500',
        'has-disabled:cursor-not-allowed',
        'has-disabled:bg-gray-200 dark:has-disabled:bg-gray-800',
        error
          && 'not-has-disabled:outline-2 outline-red-500 dark:outline-red-600',
      ]"
    >
      <textarea
        ref="textarea-ref"
        v-model="model"
        :class="[
          'resize-none overflow-hidden',
          'w-full p-4 outline-0',
          'placeholder:text-gray-400',
          'disabled:cursor-not-allowed',
          'disabled:placeholder:text-gray-400 dark:disabled:placeholder:text-gray-600',
          'caret-black dark:caret-white',
          'text-black dark:text-gray-100!',
          error && 'placeholder:text-red-500',
        ]"
        :disabled="disabled"
        :placeholder="placeholder"
        :="$attrs"
        @input="resize"
      />
    </div>
    <div
      v-if="withError || error"
      class="text-red-600 dark:text-red-500 cursor-default text-xs min-h-7"
    >
      {{ error || '&nbsp;' }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from 'vue';

const model = defineModel<string>();
const {
  error = '',
  withError = false,
  disabled = false,
  placeholder = '',
} = defineProps<{
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  withError?: boolean;
}>();

const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea-ref');

const resize = () => {
  if (!textareaRef.value) {
    return;
  }
  textareaRef.value.style.height = 'auto';
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
};

watch(
  () => model.value,
  () => nextTick(resize),
);
</script>
