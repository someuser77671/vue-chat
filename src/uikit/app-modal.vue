<template>
  <TransitionGroup name="opacity">
    <div
      v-show="visible"
      key="modal-overlay"
      class="fixed z-1 top-0 left-0 right-0 bottom-0 opacity-40 bg-black"
    />
    <div
      v-show="visible"
      key="modal-content"
      class="fixed z-1 top-0 left-0 right-0 bottom-0 flex items-center justify-center"
    >
      <div ref="template-ref">
        <slot name="default" />
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useTemplateRef } from 'vue';

const emit = defineEmits<{ (e: 'close'): void }>();
const { visible } = defineProps<{ visible: boolean }>();

const templateRef = useTemplateRef<HTMLElement>('template-ref');

onClickOutside(templateRef, () => {
  emit('close');
});
</script>
