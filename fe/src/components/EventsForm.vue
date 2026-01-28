<template>
  <q-form @submit.prevent="emit('submit')" class="q-gutter-sm q-mt-lg">
    <div class="q-mb-md">
      <q-item-label class="q-pb-xs">Name *</q-item-label>
      <q-input
        outlined
        dense
        lazy-rules="ondemand"
        v-model="model.name"
        data-testid="input-name"
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
        v-model="model.description"
        data-testid="input-description"
        :rules="[(val) => (val && val.length > 0) || 'Value is required']"
      />
    </div>

    <div class="q-mb-md">
      <q-item-label class="q-pb-xs">Type *</q-item-label>
      <q-select
        outlined
        dense
        lazy-rules="ondemand"
        v-model="model.type"
        data-testid="input-type"
        :options="eventsStore.typeOptions"
        :rules="[(val) => val !== null || 'Value is required']"
      />
    </div>

    <div class="q-mb-md">
      <q-item-label class="q-pb-xs">Priority *</q-item-label>
      <q-select
        outlined
        dense
        lazy-rules="ondemand"
        v-model="model.priority"
        data-testid="input-priority"
        :options="eventsStore.priorityOptions"
        :rules="[(val) => val !== null || 'Value is required']"
      />
    </div>

    <div class="row justify-end q-gutter-sm">
      <q-btn label="Cancel" color="primary" flat @click="emit('cancel')" />
      <q-btn outline label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { useEventsStore } from '@/stores/events'
import type { AnalyticsEventForm } from '@/types'

const eventsStore = useEventsStore()

const model = defineModel<AnalyticsEventForm>({ required: true })

const emit = defineEmits(['submit', 'cancel'])
</script>
