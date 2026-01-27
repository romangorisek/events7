<template>
  <div class="q-pa-lg bg-grey-1 row">
    <div class="col-xs-12 col-md-8 col-lg-6">
      <h4 class="text-h4 text-weight-bold q-mt-none q-mb-lg">Update event</h4>

      <EventsForm v-model="formData" @submit="onSubmit" @cancel="onCancel" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { useEventsStore } from '@/stores/events'
import EventsForm from './EventsForm.vue'
import { AnalyticsEvent } from '@/types'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const eventsStore = useEventsStore()

const eventId = String(route.params.id)

const formData = ref({
  name: '',
  description: '',
  type: null as { label: string; value: string } | null,
  priority: null as number | null,
})

onMounted(() => {
  const eventToUpdate = eventsStore.events.find((event) => event.id === eventId)
  if (eventToUpdate) {
    formData.value.id = eventToUpdate.id
    formData.value.name = eventToUpdate.name
    formData.value.description = eventToUpdate.description
    formData.value.type = { label: eventToUpdate.type, value: eventToUpdate.type }
    formData.value.priority = eventToUpdate.priority
  } else {
    $q.notify({
      type: 'negative',
      message: `Event with ID "${eventId}" not found.`,
    })
    router.back()
  }
})

const onSubmit = async () => {
  if (formData.value.id && formData.value.type && formData.value.priority !== null) {
    const updatedEvent: AnalyticsEvent = {
      id: formData.value.id,
      name: formData.value.name,
      description: formData.value.description,
      type: formData.value.type.value,
      priority: formData.value.priority,
    }
    try {
      await eventsStore.updateEvent(updatedEvent)
      $q.notify({
        type: 'positive',
        message: 'Event updated successfully',
      })
      router.back()
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Event could not be updated',
      })
    }
  }
}

const onCancel = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    router.back()
  })
}
</script>
