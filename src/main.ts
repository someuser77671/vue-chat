import '@fontsource/inter';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import AppAlert from './uikit/app-alert.vue';
import AppButton from './uikit/app-button.vue';
import AppDropdown from './uikit/app-dropdown.vue';
import AppInput from './uikit/app-input.vue';
import AppModal from './uikit/app-modal.vue';
import AppSelect from './uikit/app-select.vue';
import AppTable from './uikit/app-table.vue';

const pinia = createPinia();
const app = createApp(App);

declare module 'vue' {
  interface GlobalComponents {
    AppAlert: typeof AppAlert;
    AppButton: typeof AppButton;
    AppDropdown: typeof AppDropdown;
    AppInput: typeof AppInput;
    AppSelect: typeof AppSelect;
    AppModal: typeof AppModal;
    AppTable: typeof AppTable;
  }
}

app
  .component('AppAlert', AppAlert)
  .component('AppButton', AppButton)
  .component('AppDropdown', AppDropdown)
  .component('AppInput', AppInput)
  .component('AppSelect', AppSelect)
  .component('AppModal', AppModal)
  .component('AppTable', AppTable)
  .use(pinia)
  .use(router)
  .mount('#app');
