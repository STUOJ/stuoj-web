import { computed, ref, watchEffect } from "vue";
import { ROLE, type UserInfo } from "@/types/User";
import { GetUserInfo, GetId } from "@/apis/user";
import { createGlobalState, useStorage } from "@vueuse/core";

export const userStore = createGlobalState(() => {
  const { execute: getIdExecute } = GetId();
  const { execute } = GetUserInfo();

  const token = useStorage("token", "");

  const updateToken = (_token: string) => {
    token.value = _token;
  };
  const clearToken = () => {
    token.value = "";
  };

  const id = ref(0);
  const isLogin = computed(() => token.value !== "");
  const info = ref<UserInfo>({
    avatar: "",
    create_time: "",
    email: "",
    id: 0,
    role: ROLE.Visitor,
    update_time: "",
    username: "未登录",
    signature: "",
  });

  const getId = async () => {
    if (!isLogin.value)
      return;
    const state = await getIdExecute(
      {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    if (state.value) {
      id.value = state.value;
    }
  };


  const getUserInfo = async (userInfo?: UserInfo) => {
    if (!isLogin.value)
      return;
    if (userInfo) {
      info.value = userInfo;
    } else {
      if (id.value === 0) {
        await getId();
      }
      if (id.value === 0) {
        return;
      }
      const state = await execute({
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        id: id.value
      });
      if (state.value) {
        info.value = state.value;
      }
    };
  };

  return {
    getId,
    getUserInfo,
    id,
    info,
    token,
    updateToken,
    isLogin,
    clearToken,
  };
});
