<template>
  <div class="flex flex-col gap-2 shadow-xl/20">
    <Teleport to="#alerts">
      <app-alert
        type="primary"
        title="Успешно!"
        text="Заявка обновлена"
        class="fixed w-175 top-6 right-6"
        :visible="isOpenedAlertUpdated"
        @close="isOpenedAlertUpdated = false"
      />
    </Teleport>
    <div>
      <button
        class="hover:underline cursor-pointer text-left font-bold dark:text-white"
        @click="returnToMain"
      >
        Вернуться на список заявок
      </button>
    </div>
    <ApplicationCard
      v-if="currentApplication"
      :application="currentApplication"
      @change-application="changeApplication"
      @remove-application="removeApplication"
    />
  </div>
</template>

<script setup lang="ts">
import { type ComputedRef, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import ApplicationCard from '@/components/ApplicationCard.vue';
import useApplicationsStore from '@/stores/applications';

import type { IApplication } from '@/types';

const { applicationId } = defineProps<{ applicationId: string }>();

const router = useRouter();
const applicationsStore = useApplicationsStore();
const isOpenedAlertUpdated = ref(false);

const { change, remove } = applicationsStore;

const currentApplication: ComputedRef<IApplication | undefined> = computed(
  (previous) => {
    const foundApplicaton = applicationsStore.applications.find(
      (application) => application.id === applicationId,
    );

    return foundApplicaton ?? previous;
  },
);

const changeApplication = (updated: IApplication) => {
  change(updated);
  isOpenedAlertUpdated.value = true;
};

const removeApplication = (id: string) => {
  remove(id);
  router.push({ name: 'applications' });
};

const returnToMain = () => {
  router.push({ name: 'applications' });
};
</script>
