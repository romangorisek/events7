import type { NewAnalyticsEvent, AnalyticsEvent } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const useEventsStore = defineStore('events', () => {
  const events = ref<AnalyticsEvent[]>([])

  async function fetchEvents() {
    try {
      const response = await fetch(`${backendUrl}/events`)
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const res = await response.json()
      events.value = res.data
    } catch (error) {
      console.error('Error fetching events:', error)
      throw new Error('Failed to fetch events')
    }
  }

  async function createEvent(event: NewAnalyticsEvent): Promise<void> {
    try {
      const response = await fetch(`${backendUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
      if (!response.ok) {
        throw new Error('Failed to create event')
      }
      const res = await response.json()
      events.value.push(res)
    } catch (error) {
      console.error('Error creating event:', error)
      throw new Error('Failed to create event')
    }
  }

  async function updateEvent(updatedEvent: AnalyticsEvent): Promise<void> {
    try {
      const response = await fetch(`${backendUrl}/events/${updatedEvent.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      })
      if (!response.ok) {
        throw new Error('Failed to update event')
      }
      const data = await response.json()
      events.value = events.value.map((e) => {
        if (e.id === data.id) return data
        return e
      })
    } catch (error) {
      console.error('Error updating event:', error)
      throw new Error('Failed to update event')
    }
  }

  async function deleteEvent(eventId: number): Promise<void> {
    try {
      const response = await fetch(`${backendUrl}/events/${eventId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete event')
      }
      events.value = events.value.filter((e) => e.id !== eventId)
    } catch (error) {
      console.error('Error deleting event:', error)
      throw new Error('Failed to delete event')
    }
  }

  const typeOptions = [
    { label: 'crosspromo', value: 'crosspromo', color: 'grey-6' },
    { label: 'liveops', value: 'liveops', color: 'green' },
    { label: 'app', value: 'app', color: 'yellow' },
    { label: 'ads', value: 'ads', color: 'red' },
  ]

  const priorityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return {
    events,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    typeOptions,
    priorityOptions,
  }
})
