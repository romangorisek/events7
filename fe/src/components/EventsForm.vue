<template>
  <q-form @submit.prevent="emit('submit')" class="q-gutter-sm q-mt-lg">
    <div class="q-mb-md">
      <q-item-label class="q-pb-xs">Name *</q-item-label>
      <q-input
        outlined
        dense
        lazy-rules="ondemand"
        v-model="model.name"
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
        v-model="model.priority"
        :options="priorityOptions"
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


const typeOptions = [
  { label: 'crosspromo', value: 'crosspromo', color: 'grey-6' },
  { label: 'liveops', value: 'liveops', color: 'green' },
  { label: 'app', value: 'app', color: 'yellow' },
  { label: 'ads', value: 'ads', color: 'red' },
];

const priorityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const model = defineModel({ required: true });

const emit = defineEmits(['submit', 'cancel']);
</script>
