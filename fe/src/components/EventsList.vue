<template>
  <div class="q-pa-lg bg-grey-1">
    <h4 class="text-h4 text-weight-bold q-mt-none q-mb-lg">{{ pageTitle }}</h4>

    <div class="row justify-between items-center q-mb-md">
      <q-btn outline color="primary" label="New event" icon="add" :to="{ name: 'eventsCreate' }" />

      <q-input
        v-model="filter"
        outlined
        dense
        debounce="300"
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
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      flat
      bordered
    >
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          <div class="ellipsis">
            {{ props.value }}
            <q-tooltip>{{ props.value }}</q-tooltip>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props" class="text-right">
          <q-btn
            :to="{ name: 'eventsUpdate', params: { id: Number(props.value) } }"
            flat
            dense
            round
            icon="edit"
            color="grey-7"
            class="q-mx-xs border-btn"
          />
          <q-btn
            @click="deleteEventConfirm(Number(props.value))"
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
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import type { QTableProps } from 'quasar'
import { useEventsStore } from '@/stores/events'
import { Order } from '@/types'

const route = useRoute()
const eventsStore = useEventsStore()
const $q = useQuasar()

const pageTitle = computed(() => route.meta.title)

const loading = ref(false)
const filter = ref('')
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
})

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'name', field: 'name', align: 'left', sortable: true },
  {
    name: 'description',
    label: 'description',
    field: 'description',
    align: 'center',
    sortable: true,
    style: 'max-width: 200px',
  },
  { name: 'type', label: 'type', field: 'type', align: 'center', sortable: true },
  { name: 'priority', label: 'priority', field: 'priority', align: 'center', sortable: true },
  { name: 'id', label: '', field: 'id', align: 'right' },
]

interface OnRequestProps {
  pagination: {
    sortBy: string
    descending: boolean
    page: number
    rowsPerPage: number
  }
  filter?: string
}

async function onRequest(props: OnRequestProps) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter

  loading.value = true

  await eventsStore.fetchEvents({
    page,
    take: rowsPerPage,
    sortBy,
    order: descending ? Order.DESC : Order.ASC,
    filter: filter,
  })

  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending
  if (eventsStore.meta) {
    pagination.value.rowsNumber = eventsStore.meta.itemCount
  }

  loading.value = false
}

onMounted(() => {
  Promise.all([
    onRequest({
      pagination: pagination.value,
      filter: filter.value,
    }),
  ]).catch(() => {
    $q.notify({
      type: 'negative',
      message: `Event data could not be loaded.`,
    })
  })
})

const deleteEventConfirm = async (eventId: number): Promise<void> => {
  const eventToDelete = eventsStore.events.find((event) => event.id === eventId)

  if (eventToDelete) {
    $q.dialog({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete the event "${eventToDelete.name}"?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      try {
        await eventsStore.deleteEvent(eventId)
        $q.notify({
          type: 'positive',
          message: `Event deleted.`,
        })
      } catch {
        $q.notify({
          type: 'negative',
          message: `Event could not be deleted.`,
        })
      }
    })
  }
}

</script>
