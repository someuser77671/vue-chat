<template>
  <Transition
    appear
    name="opacity"
    mode="out-in"
  >
    <header
      v-if="visible"
      :class="[
        'flex items-center justify-between',
        'h-28 px-8 mb-20',
        'shadow-xl/20',
        'bg-gray-100 dark:bg-gray-700',
      ]"
    >
      <h1 class="cursor-default text-3xl font-bold dark:text-blue-100">
        <router-link
          :to="{ name: 'applications' }"
          custom
          #="{ navigate }"
        >
          <button
            class="cursor-pointer"
            @click="navigate"
          >
            App
          </button>
        </router-link>
      </h1>
      <ul class="flex gap-6">
        <li
          v-for="link in routerLinks"
          :key="link.displayName"
        >
          <router-link
            :to="link.to"
            custom
            #="{ navigate }"
          >
            <app-button
              style-strategy="neutral"
              @click="navigate"
            >
              {{ link.displayName }}
            </app-button>
          </router-link>
        </li>
        <li>
          <app-button
            style-strategy="neutral"
            @click="toggleIsDark()"
          >
            Тема
          </app-button>
        </li>
        <li>
          <app-button
            style-strategy="neutral"
            @click="userStore.logout"
          >
            Выйти
          </app-button>
        </li>
      </ul>
    </header>
    <div
      v-else
      class="h-28 mb-20"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import useDarkCustom from '@/utils/useDarkCustom';
import useUserStore from '@/stores/user';

defineProps<{ visible: boolean }>();
const userStore = useUserStore();
const { toggle: toggleIsDark } = useDarkCustom();
console.log(userStore.isLoggedIn);

const routerLinks: Array<{ to: { name: string }; displayName: string }> = [];
</script>
