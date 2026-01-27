<template>
  <div class="q-pa-lg bg-grey-1 row">
    <div class="col-xs-12 col-md-8 col-lg-6">
      <h4 class="text-h4 text-weight-bold q-mt-none q-mb-lg">New event</h4>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm q-mt-lg">
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

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
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
  console.log('Form Submitted:', formData.value)
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
