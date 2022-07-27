<script setup>
import Label from "../components/Label.vue";
import Input from "../components/Input.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import http from "../http";

const router = useRouter();
const form = ref({
  name: null,
  email: null,
  password: null,
});

const submit = async () => {
  try {
    const res = await http.post(
      `${import.meta.env.VITE_API_URL}register`,
      form.value,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    // set access token
    localStorage.setItem("accessToken", res.data.data.accessToken);

    // redirect to verification
    router.push("/dashboard");
  } catch (error) {
    error = error.response.data.message;
    alert(error);
  }
};
</script>

<template>
  <div class="min-h-full flex">
    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">MiniSend</h2>
          <p class="mt-2 text-sm text-gray-600">
            Simple Transaction Email Platform
          </p>
        </div>

        <div class="mt-8">
          <div>
            <div>
              <p class="text-sm font-medium text-gray-700">
                Create an Account or
                <RouterLink
                  to="/login"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  >Sign In</RouterLink
                >
              </p>
            </div>
          </div>

          <div class="mt-6">
            <form @submit.prevent="submit" class="space-y-6">
              <div>
                <Label title="name" />
                <div class="mt-1">
                  <Input type="text" v-model="form.name" />
                </div>
              </div>

              <div>
                <Label title="email" />
                <div class="mt-1">
                  <Input type="text" v-model="form.email" />
                </div>
              </div>

              <div>
                <Label title="password" />
                <div class="mt-1">
                  <Input type="password" v-model="form.password" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>
