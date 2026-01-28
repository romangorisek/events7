<template>
  <q-layout view="hHh Lpr lff" container class="window-height window-width">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-toolbar-title>Eents7</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable exact v-ripple :to="{ name: menuItem.link }">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useEventsStore } from './stores/events'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const menuList = [
  {
    icon: 'touch_app',
    label: 'Events',
    link: 'events',
  },
]

const drawer = ref(false)

const authStore = useAuthStore()
const eventsStore = useEventsStore()

onMounted(async () => {
  if (!authStore.token) {
    // auto log in for the purpose of the example app; on a real app it would be connected to a login form
    await authStore.login().catch(() => {
      $q.notify({
        type: 'negative',
        message: `Login failed`, // should not happen in our example!
      })
    })
  }

  // load enums from BE that are needed for the app to run ok
  await eventsStore.fetchTypeOptions()
})
</script>
