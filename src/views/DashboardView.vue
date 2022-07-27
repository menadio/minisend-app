<script setup>
import { ref, onMounted } from "vue";
import Layout from "../components/Layout.vue";
import { useProfileStore } from "../stores/profile";
import { useEmailStore } from "../stores/email";

const profile = useProfileStore();
const email = useEmailStore();
const recipient = ref(null);

onMounted(() => {
  profile.getUserData();
  email.getEmails();
});
</script>

<template>
  <Layout>
    <template v-slot:pageTitle> Dashboard </template>
    <!-- stats -->
    <div>
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Total Posted Emails
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">
            {{ profile.user.posted_count }}
          </dd>
        </div>

        <div
          class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Total Sent Emails
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-green-700">
            {{ profile.user.sent_count }}
          </dd>
        </div>

        <div
          class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
        >
          <dt class="text-sm font-medium text-gray-500 truncate">
            Total Failed Emails
          </dt>
          <dd class="mt-1 text-3xl font-semibold text-red-700">
            {{ profile.user.failed_count }}
          </dd>
        </div>
      </dl>
    </div>

    <!-- log table -->
    <div class="flex space-x-2">
      <RouterLink to="/settings" class="text-red-900">Settings</RouterLink>
      <router-link to="/settings" class="text-blue-500"
        >Settings Link</router-link
      >

      <div class="mt-4 w-3/4">
        <input
          @change="handleSearch"
          type="text"
          ref="recipient"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-gray-900 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search..."
        />
      </div>

      <div class="mt-4 w-1/4">
        <select
          @change="handleFiltering"
          name="order"
          id="order"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-gray-900 sm:text-sm border-gray-300 rounded-md"
        >
          <option value="">Status</option>
          <option value="asc">Sent</option>
          <option value="desc">Failed</option>
          <option value="desc">Posted</option>
        </select>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                  >
                    Timstamp
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Send
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Recipient
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                  >
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="email in email.emails" :key="email.id">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0"
                  >
                    {{ email.created_at }}
                  </td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {{ email.sender }}
                  </td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    {{ email.recipient }}
                  </td>
                  <td
                    class="whitespace-nowrap py-4 px-3 text-sm text-green-900"
                  >
                    <span class="bg-green-200 px-4 py-2 rounded-full">{{
                      email.status
                    }}</span>
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0"
                  >
                    <button
                      @click="viewDetails(email.id)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <span class="text-sm text-indigo-900">View</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
