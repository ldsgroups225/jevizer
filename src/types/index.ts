export interface Deck {
  id: string
  title: string
  lastReview: string
  new: number // new card learned alltime in this deck
  learning: number
  reviewing: number
  progress: number
  duoToday?: number
  studiedToday?: number
  newCards?: number // new card learned today
}

export interface DeckResult {
  id: string
  title: string
  downloads: number
  rating: number // Assuming rating is a number like stars count or similar
  cards: number
  time: number // Assuming time is in some unit like minutes or seconds
  iconUrl?: string
}

export interface Interest {
  id: string
  name: string
  icon?: React.ReactNode // Can be emoji string or component
}

export interface SavedDeck {
  id: string
  title: string
  downloads: number
  rating: number
  cards: number
  time: number
  iconUrl?: string
}

export interface StudyGoal {
  current: number
  total: number
  percentage: number
}

export interface ChartDataPoint {
  day: number
  learned: number
}

export interface SummaryStats {
  total: number
  today: number
  dailyAverage: number
  dailyStreak: number
  timeSpent: string
  cardsLearned: number
}
