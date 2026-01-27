<template>
  <div class="q-pa-lg bg-grey-1 row">
    <div class="col-xs-12 col-md-8 col-lg-6">
      <h4 class="text-h4 text-weight-bold q-mt-none q-mb-lg">New event</h4>

      <q-form @submit="onSubmit" class="q-gutter-sm q-mt-lg">
        <div class="q-mb-md">
          <q-item-label class="q-pb-xs">Name *</q-item-label>
          <q-input
            outlined
            dense
            lazy-rules="ondemand"
            v-model="formData.name"
            :rules="[(val) => (val && val.length > 0) || 'Value is required']"
          />
        </div>

        <div class="q-mb-md">
          <q-item-label class="q-pb-xs">Description *</q-item-label>
          <q-input
            outlined
            dense
            lazy-rules="ondemand"
            type="textarea"
            v-model="formData.description"
            :rules="[(val) => (val && val.length > 0) || 'Value is required']"
          />
        </div>

        <div class="q-mb-md">
          <q-item-label class="q-pb-xs">Type *</q-item-label>
          <q-select
            outlined
            dense
            lazy-rules="ondemand"
            v-model="formData.type"
            :options="typeOptions"
            :rules="[(val) => val !== null || 'Value is required']"
          />
        </div>

        <div class="q-mb-md">
          <q-item-label class="q-pb-xs">Priority *</q-item-label>
          <q-select
            outlined
            dense
            lazy-rules="ondemand"
            v-model="formData.priority"
            :options="priorityOptions"
            :rules="[(val) => val !== null || 'Value is required']"
          />
        </div>

        <div class="row justify-end q-gutter-sm">
          <q-btn label="Cancel" color="primary" flat @click="onCancel" />
          <q-btn outline label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useEventsStore } from '@/stores/events'

const $q = useQuasar()
const router = useRouter()
const eventsStore = useEventsStore()

const getInitialFormData = () => ({
  name: '',
  description: '',
  type: null,
  priority: null,
})

const formData = ref(getInitialFormData())

const typeOptions = [
  { label: 'crosspromo', value: 'crosspromo', color: 'grey-6' },
  { label: 'liveops', value: 'liveops', color: 'green' },
  { label: 'app', value: 'app', color: 'yellow' },
  { label: 'ads', value: 'ads', color: 'red' },
]

const priorityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const onSubmit = () => {
  if (formData.value.type && formData.value.priority !== null) {
    eventsStore.createEvent({
      name: formData.value.name,
      description: formData.value.description,
      type: formData.value.type.value,
      priority: formData.value.priority,
    })
    $q.notify({
      type: 'positive',
      message: 'Event created successfully',
    })
    formData.value = getInitialFormData()
    router.back()
  }
}

const onCancel = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to cancel? All unsaved data will be lost.',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    formData.value = getInitialFormData()
    router.back()
  })
}
</script>
