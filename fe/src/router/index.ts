import { createRouter, createWebHistory } from 'vue-router'

import EventsList from '@/components/EventsList.vue'
import EventsCreate from '@/components/EventsCreate.vue'
import EventsUpdate from '@/components/EventsUpdate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*', // default path is the list of events for the sake of simplicity, we could have a 404 page instead and require /events path to show the events list
      name: 'events',
      component: EventsList,
      meta: { title: 'Events' },
    },
    {
      path: '/events/new',
      name: 'eventsCreate',
      component: EventsCreate,
      meta: { title: 'New event' },
    },
    {
      path: '/events/:id',
      name: 'eventsUpdate',
      component: EventsUpdate,
      props: (route) => ({ id: Number(route.params.id) }),
      meta: { title: 'Update event' },
    },
  ],
})

export default router
