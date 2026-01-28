import type {
  NewAnalyticsEvent,
  AnalyticsEvent,
  PageDto,
  PageMetaDto,
  PageOptionsDto,
  AnalyticsEventType,
} from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/lib/api'

export const useEventsStore = defineStore('events', () => {
  const events = ref<AnalyticsEvent[]>([])
  const meta = ref<PageMetaDto>()
  const typeOptions = ref<AnalyticsEventType[]>([])

  async function fetchEvents(options: PageOptionsDto) {
    const params = new URLSearchParams()
    if (options.page) params.append('page', String(options.page))
    if (options.take) params.append('take', String(options.take))
    if (options.sortBy) params.append('sortBy', options.sortBy)
    if (options.order) params.append('order', options.order)
    if (options.filter) params.append('filter', options.filter)

    try {
      const response = await api(`/events?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const page: PageDto<AnalyticsEvent> = await response.json()
      events.value = page.data
      meta.value = page.meta
    } catch (error) {
      console.error('Error fetching events:', error)
      throw new Error('Failed to fetch events')
    }
  }

  async function createEvent(event: NewAnalyticsEvent): Promise<void> {
    try {
      const response = await api('/events', {
        method: 'POST',
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
      const response = await api(`/events/${updatedEvent.id}`, {
        method: 'PATCH',
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
      const response = await api(`/events/${eventId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete event')
      }
      // After deleting, we should refetch the events for the current page
      if (meta.value) {
        await fetchEvents({
          page: meta.value.page,
          take: meta.value.take,
        })
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      throw new Error('Failed to delete event')
    }
  }

  async function fetchTypeOptions() {
    try {
      const response = await api('/event-types')
      if (!response.ok) {
        throw new Error('Failed to fetch event types')
      }
      typeOptions.value = await response.json()
    } catch (error) {
      console.error('Error fetching event types:', error)
      throw new Error('Failed to fetch event types')
    }
  }

  const priorityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return {
    events,
    meta,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    typeOptions,
    priorityOptions,
    fetchTypeOptions,
  }
})
