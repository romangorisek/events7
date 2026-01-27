<template>
  <div class="q-pa-lg bg-grey-1">
    <h4 class="text-h4 text-weight-bold q-mt-none q-mb-lg">{{ pageTitle }}</h4>

    <div class="row justify-between items-center q-mb-md">
      <q-btn outline color="primary" label="New event" icon="add" :to="{ name: 'eventsCreate' }" />

      <q-input
        v-model="filter"
        outlined
        dense
        placeholder="Search..."
        bg-color="white"
        style="width: 300px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <q-table
      :rows="eventsStore.events"
      :columns="columns"
      row-key="id"
      :filter="filter"
      flat
      bordered
      :pagination="{ rowsPerPage: 10 }"
    >
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          <div class="ellipsis">
            {{ props.value }}
            <q-tooltip>{{ props.value }}</q-tooltip>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <div class="row items-center no-wrap">
            <q-badge
              rounded
              :color="getTypeColor(props.value)"
              class="q-mr-sm"
              style="width: 12px; height: 8px; padding: 0"
            />
            {{ props.value }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props" class="text-right">
          <q-btn
            :to="{ name: 'eventsUpdate', params: { id: props.value } }"
            flat
            dense
            round
            icon="edit"
            color="grey-7"
            class="q-mx-xs border-btn"
          />
          <q-btn
            @click="deleteEventConfirm(props.value)"
            flat
            dense
            round
            icon="delete_outline"
            color="grey-7"
            class="q-mx-xs border-btn"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useEventsStore } from '@/stores/events'

const route = useRoute()
const eventsStore = useEventsStore()
const $q = useQuasar()

const pageTitle = computed(() => route.meta.title)

const filter = ref('')

if (!eventsStore.events.length) {
  eventsStore.fetchEvents()
}

const deleteEventConfirm = (eventId: string): void => {
  const eventToDelete = eventsStore.events.find((event) => event.id === eventId)

  if (eventToDelete) {
    $q.dialog({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete the event "${eventToDelete.name}"?`,
      cancel: true,
      persistent: true,
    }).onOk(() => {
      eventsStore.deleteEvent(eventId)
    })
  }
}

const columns = [
  { name: 'name', label: 'name', field: 'name', align: 'left' },
  {
    name: 'description',
    label: 'description',
    field: 'description',
    align: 'center',
    style: 'max-width: 200px',
  },
  { name: 'type', label: 'type', field: 'type', align: 'center' },
  { name: 'priority', label: 'priority', field: 'priority', align: 'center' },
  { name: 'id', label: '', field: 'id', align: 'right' },
]

const getTypeColor = (type) => {
  if (type === 'liveops') return 'green'
  if (type === 'cosspromo') return 'grey-9'
  if (type === 'ads') return 'red'
  if (type === 'app') return 'yellow'
  return 'grey'
}
</script>
