export interface AnalyticsEvent {
  id: number
  name: string
  description: string
  type: AnalyticsEventType
  priority: AnalyticsEventPriority
}

export type NewAnalyticsEvent = Omit<AnalyticsEvent, 'id'>

export type AnalyticsEventPriority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type AnalyticsEventType = 'crosspromo' | 'liveops' | 'app' | 'ads'
