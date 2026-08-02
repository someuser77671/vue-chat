import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';

import { REGISTERED_USERS_DATA, REGISTERED_USERS_DATA_MAP } from '@/consts';
import type { TUserData } from '@/types';

const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const currentUser = useStorage<TUserData>('user-storage', {
    email: '',
    password: '',
  });

  const isLoggedIn = computed(() =>
    Boolean(currentUser.value.email && currentUser.value.password),
  );
  const error = ref('');

  const apiValidation = (user: TUserData) => {
    const foundUser: TUserData | undefined =
      REGISTERED_USERS_DATA_MAP[user.email];

    const isInvalidEmail = Boolean(!foundUser);
    const isInvalidPassword = foundUser?.password !== user.password;

    let errorValue: string;

    if (isInvalidEmail) {
      errorValue = 'Нет пользователя с таким email';
    } else if (isInvalidPassword) {
      errorValue = 'Неверный пароль';
    } else {
      errorValue = '';
    }

    error.value = errorValue;

    return !errorValue;
  };

  const login = (user: TUserData) => {
    currentUser.value.email = user.email;
    currentUser.value.password = user.password;
  };

  const tryLoginProcess = (user: TUserData) => {
    const isValidApi = apiValidation(user);

    if (!isValidApi) {
      return;
    }

    login(user);
    router.push({ name: 'applications' });
  };

  const logout = () => {
    currentUser.value.email = '';
    currentUser.value.password = '';

    router.push({ name: 'auth' });
  };

  return {
    usersData: REGISTERED_USERS_DATA,
    usersMap: REGISTERED_USERS_DATA_MAP,
    currentUser,
    isLoggedIn,
    error,
    tryLoginProcess,
    login,
    logout,
  };
});

export default useUserStore;
