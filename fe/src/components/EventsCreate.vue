<template>
  <div class="q-pa-lg bg-grey-1">
    <h4 class="text-h4 text-weight-bold q-ma-none q-mb-lg">New event</h4>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm q-mt-lg">
      <q-input
        outlined
        v-model="formData.name"
        label="Name *"
        :rules="[(val) => (val && val.length > 0) || 'Value is required']"
      />

      <q-input
        outlined
        type="textarea"
        v-model="formData.description"
        label="Description *"
        :rules="[(val) => (val && val.length > 0) || 'Value is required']"
      />

      <q-select
        outlined
        v-model="formData.type"
        :options="typeOptions"
        label="Type"
        :rules="[(val) => val !== null || 'Value is required']"
      />

      <q-select
        outlined
        v-model="formData.priority"
        :options="priorityOptions"
        label="Priority"
        :rules="[(val) => val !== null || 'Value is required']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const formData = ref({
  name: '',
  description: '',
  type: null,
  priority: null,
})

const typeOptions = [
  { label: 'crosspromo', value: 'crosspromo', color: 'grey-6' },
  { label: 'liveops', value: 'liveops', color: 'green' },
  { label: 'app', value: 'app', color: 'yellow' },
  { label: 'ads', value: 'ads', color: 'red' },
]

const priorityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const onSubmit = () => {
  console.log('Form Submitted:', form.value)
  $q.notify({
    type: 'positive',
    message: 'Event created successfully',
  })
}
</script>

<style scoped>
/* To match the exact blue of your "NEW EVENT" button */
.text-primary {
  color: #1976d2 !important;
}
</style>
