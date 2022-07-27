<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import http from "../http";
import { useProfileStore } from "../stores/profile";

const router = useRouter();
const profile = useProfileStore();

onMounted(() => {
  profile.getUserData();
});

function logout() {
  try {
    const res = http.post("logout");

    localStorage.clear();
    router.push("/login");
  } catch (error) {
    alert(error.response.data.message);
  }
}
</script>

<template>
  <div>
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div
        class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white"
      >
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <h1 class="text-3xl font-extrabold text-gray-900">MiniSend</h1>
          </div>
          <nav class="mt-5 flex-1 px-4 bg-white space-y-2">
            <ul>
              <li class="mb-4">
                <RouterLink to="/dashboard" class="text-gray-700">
                  Dashboard</RouterLink
                >
              </li>

              <li class="mb-4">
                <RouterLink to="/settings" class="text-gray-700">
                  Settings</RouterLink
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div class="flex items-center">
            <div>
              <img
                class="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <p
                class="text-sm font-medium capitalize text-gray-700 group-hover:text-gray-900"
              >
                {{ profile.user.name }}
              </p>
              <button
                @click="logout"
                class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="md:pl-64 flex flex-col flex-1">
      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">
              <slot name="pageTitle"></slot>
            </h1>
          </div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div class="py-4">
              <slot></slot>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
