<template>
  <div class="q-pa-lg bg-grey-1 row">
    <div class="col-xs-12 col-md-8 col-lg-6">
      <h4 class="text-h4 text-weight-bold q-mt-none q-mb-lg">New event</h4>

      <EventsForm
        v-model="formData"
        @submit="onSubmit"
        @cancel="onCancel"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/events';
import EventsForm from './EventsForm.vue';

const $q = useQuasar();
const router = useRouter();
const eventsStore = useEventsStore();

const getInitialFormData = () => ({
  name: '',
  description: '',
  type: null,
  priority: null,
});

const formData = ref(getInitialFormData());

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
