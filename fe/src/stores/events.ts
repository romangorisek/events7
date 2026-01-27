import type { NewAnalyticsEvent, AnalyticsEvent } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventsStore = defineStore('events', () => {
  const events = ref<AnalyticsEvent[]>([])

  function fetchEvents() {
    events.value = [
      {
        id: 'uuid1',
        name: 'click-event',
        type: 'crosspromo',
        description: 'this is just some dummy description',
        priority: 1,
      },
      {
        id: 'uuid2',
        name: 'open-event',
        type: 'liveops',
        description:
          'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
        priority: 4,
      },
      {
        id: 'uuid3',
        name: 'ack-event',
        type: 'app',
        description: 'bla bla bla bla bla bla bla',
        priority: 7,
      },
      {
        id: 'uuid4',
        name: 'click-event',
        type: 'ads',
        description: 'bla bla bla bla bla bla bla',
        priority: 8,
      },
      {
        id: 'uuid5',
        name: 'click-event',
        type: 'app',
        description: 'bla bla bla bla bla bla bla',
        priority: 10,
      },
    ]
  }

  function createEvent(event: NewAnalyticsEvent): void {
    const data = {
      id: crypto.randomUUID(),
      ...event,
    }

    events.value.push(data)
  }

  function updateEvent(newEvent: AnalyticsEvent): void {
    events.value = events.value.map((e) => {
      if (e.id === newEvent.id) return newEvent
      return e
    })
  }

  function deleteEvent(eventId: string): void {
    events.value = events.value.filter((e) => e.id !== eventId)
  }

  return { events, fetchEvents, createEvent, updateEvent, deleteEvent }
})
