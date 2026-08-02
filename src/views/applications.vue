<template>
  <div
    class="w-350 rounded-xl p-6 pt-16 bg-white dark:bg-gray-700 shadow-xl/20"
  >
    <Teleport to="#modals">
      <app-modal
        :visible="isOpenedModal"
        @close="isOpenedModal = false"
      >
        <div class="w-250 p-6 rounded-xl bg-white dark:bg-gray-700">
          <h3 class="text-2xl pt-8 dark:text-gray-100">Создать заявку</h3>
          <ApplicationForm
            :key="String(isOpenedModal)"
            :initial-form="{
              name: '',
              phone: '',
              amount: 0,
              status: 'active',
            }"
            @submit="submit"
          />
        </div>
      </app-modal>
    </Teleport>
    <Teleport to="#alerts">
      <app-alert
        :visible="isSuccessfullyCreated"
        type="primary"
        title="Успешно!"
        text="Заявка создана"
        class="fixed z-2 w-175 top-6 right-6"
        @close="isSuccessfullyCreated = false"
      />
    </Teleport>
    <div class="relative">
      <h2 class="text-3xl dark:text-gray-100 cursor-default">Заявки</h2>
      <app-button
        class="absolute top-0 right-0"
        @click="isOpenedModal = true"
      >
        Создать
      </app-button>
      <div class="flex gap-8 w-225 my-6">
        <app-input
          v-model="name"
          placeholder="Введите имя"
        />
        <app-select
          v-model="status"
          :options="statusOptions"
        />
        <Transition
          name="opacity"
          mode="out-in"
        >
          <div
            v-if="name || status !== 'empty'"
            class="flex items-center"
          >
            <app-button @click="clear">Очистить</app-button>
          </div>
          <div
            v-else
            class="min-w-[96.5px] h-[37px]"
          ></div>
        </Transition>
      </div>
      <ApplicationsTable
        :applications="filteredApplications"
        @open-application="openApplication($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { refDebounced } from '@vueuse/core';
import { useRouter } from 'vue-router';

import ApplicationForm from '@/forms/ApplicationForm.vue';
import useApplicationsStore from '@/stores/applications';

import { APPLICATION_STATUS_OPTIONS, DEBOUNCE_DELAY } from '@/consts';
import ApplicationsTable from '@/components/ApplicationsTable.vue';
import type { IApplication } from '@/types';

const defaultOptionId = 'empty';

const router = useRouter();
const applicationsStore = useApplicationsStore();
const isOpenedModal = ref(false);
const isSuccessfullyCreated = ref(false);
const status = ref(defaultOptionId);

const name = ref('');
const nameDebounced = refDebounced<string>(name, DEBOUNCE_DELAY);

const filteredApplications = computed(() =>
  applicationsStore.applications
    .filter((application) => application.name.includes(nameDebounced.value))
    .filter(
      (application) =>
        status.value === defaultOptionId || application.status === status.value,
    ),
);

const statusOptions = [
  { id: defaultOptionId, displayName: '' },
  ...APPLICATION_STATUS_OPTIONS,
];

const clear = () => {
  name.value = '';
  status.value = defaultOptionId;
};

const submit = (evt: Omit<IApplication, 'id'>) => {
  applicationsStore.create(evt);
  isOpenedModal.value = false;
  isSuccessfullyCreated.value = true;
};

const openApplication = (id: string) => {
  router.push({ name: 'application', params: { applicationId: id } });
};
</script>
