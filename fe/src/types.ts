export interface AnalyticsEvent {
  id: number
  name: string
  description: string
  type: AnalyticsEventType
  priority: AnalyticsEventPriority
}

export type NewAnalyticsEvent = Omit<AnalyticsEvent, 'id'>

export type AnalyticsEventForm = {
  name: string
  description: string
  type: AnalyticsEventType | null
  priority: AnalyticsEventPriority | null
}

export type AnalyticsEventPriority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type AnalyticsEventType = 'crosspromo' | 'liveops' | 'app' | 'ads'

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface PageOptionsDto {
  sortBy?: string
  page?: number
  take?: number
  order?: Order
  filter?: string
}

export interface PageMetaDto {
  readonly page: number
  readonly take: number
  readonly itemCount: number
  readonly pageCount: number
  readonly hasPreviousPage: boolean
  readonly hasNextPage: boolean
}

export interface PageDto<T> {
  readonly data: T[]
  readonly meta: PageMetaDto
}
