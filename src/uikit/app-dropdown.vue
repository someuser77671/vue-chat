<template>
  <div
    ref="trigger-ref"
    class="cursor-pointer"
  >
    <slot
      name="trigger"
      :toggle="toggle"
    />
  </div>
  <div
    v-if="isOpen"
    ref="dropdown-ref"
    :class="[
      'w-full',
      'px-2 py-1 dark:border',
      'fixed',
      'cursor-default rounded',
      'bg-gray-900 dark:bg-gray-800 dark:border-gray-700',
    ]"
    :style="dropdownStyle"
  >
    <slot
      v-for="option in options"
      :key="option.id"
      name="option"
      :option="option"
      :select="select"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import {
  onClickOutside,
  useElementBounding,
  useEventListener,
} from '@vueuse/core';
import type { IDropdownOption } from '@/types';

const props = defineProps<{
  modelValue: string | null;
  options: IDropdownOption[];
  zIndex?: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);

const triggerRef = useTemplateRef<HTMLElement>('trigger-ref');
const dropdownRef = useTemplateRef<HTMLElement>('dropdown-ref');

const { top, left, width, height } = useElementBounding(triggerRef);

onClickOutside(triggerRef, () => {
  isOpen.value = false;
});
onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
useEventListener(window, 'scroll', () => {
  isOpen.value = false;
});
useEventListener(window, 'resize', () => {
  isOpen.value = false;
});

const DEFAULT_Z_INDEX = 1000;

const dropdownStyle = computed(() => ({
  top: `${top.value + height.value}px`,
  left: `${left}px`,
  width: `${width.value}px`,
  zIndex: props.zIndex ?? DEFAULT_Z_INDEX,
}));

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const select = (option: IDropdownOption) => {
  emit('update:modelValue', option.id);
  isOpen.value = false;
};
</script>
