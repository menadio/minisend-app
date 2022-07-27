<script setup>
import { onMounted } from "@vue/runtime-core";
import Layout from "../components/Layout.vue";
import { useSettingStore } from "../stores/setting";
import Label from "../components/Label.vue";
import Input from "../components/Input.vue";

const setting = useSettingStore();
let fieldType = "password";

onMounted(() => {
  setting.getSetting();
});

function toggleField() {
  console.log("toggle api key visibility");
  fieldType === "password" ? (fieldType = "text") : (fieldType = "password");
}
</script>

<template>
  <Layout>
    <template v-slot:pageTitle>Settings</template>

    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div
          class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <Label title="public key" />
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <Input :type="fieldType" v-model="setting.settings.api_key" />
          </div>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <button v-if="fieldType === 'password'" @click="toggleField">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-500 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button v-if="fieldType === 'text'" @click="toggleField">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-300 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </div>
        </div>

        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Public Key</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input type="password" v-model="setting.settings.api_key" />
              <!-- {{ setting.settings.api_key }} -->
            </dd>
          </div>
          <div></div>
        </dl>
      </div>
    </div>
  </Layout>
</template>
