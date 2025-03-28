// src/types/index.ts

import type React from 'react'

// Represents a single flashcard deck in the user's collection or imported list
export interface IDeck {
  id: string
  title: string
  lastReview: string // Consider using Date type if you parse it
  new: number // Number of new cards learned all-time in this deck
  learning: number // Number of cards currently in the learning phase
  reviewing: number // Number of cards due for review
  progress: number // Overall progress percentage (0-100)
  iconUrl?: string // Optional: URL for the deck's icon/image
  // Optional stats sometimes shown when expanded
  duoToday?: number
  studiedToday?: number
  newCards?: number // new card learned today
}

// Represents a deck as found in search results (potentially different fields)
export interface IDeckResult {
  id: string
  title: string
  downloads: number
  rating: number // Could be star count, score, etc.
  cards: number // Total number of cards in the deck
  time: number // Estimated study time (e.g., in seconds or minutes)
  iconUrl?: string // Optional: URL for the deck's icon/image
}

// Represents detailed information about a specific deck
export interface IDeckDetails {
  id: string
  name: string
  author: string
  authorAvatar?: string
  cardCount: number
  language: string // Or potentially an enum/specific type
  description: string
  reviews: IReview[] // Assuming a Review type might exist later
  frontExample: string
  backExample: string
  audioUrl?: string
}

// Represents a user's interest (can be a language or a category)
export interface IInterest {
  id: string
  name: string
  icon?: string | React.ReactNode // Emoji or component
}

// Represents a deck saved by the user (similar to DeckResult but context is different)
export interface ISavedDeck {
  id: string
  title: string
  downloads: number
  rating: number
  cards: number
  time: number // Consider clarifying unit (e.g., minutes, seconds)
  iconUrl?: string
}

// Represents the user's overall study goal progress
export interface IStudyGoal {
  current: number // Cards learned or points earned
  total: number // Target cards or points
  percentage: number // Calculated progress (0-100)
}

// Represents a single data point for charts (e.g., cards learned per day)
export interface IChartDataPoint {
  day: number // Or string label like 'Mon', 'Tue' etc.
  learned: number // Value for the specific metric
  // Add other potential metrics if needed (e.g., reviewed: number)
}

// Represents summary statistics shown alongside charts
export interface ISummaryStats {
  total: number // Total cards/reviews in the period
  today: number // Cards/reviews today
  dailyAverage: number // Average per day
  dailyStreak: number // Current consecutive study days
  timeSpent: string // Formatted time string (e.g., "1:54h")
  cardsLearned: number // Total cards learned in the period
}

// Represents a category of interests presented to the user
export interface IInterestCategory {
  id: string
  name: string
  icon: string // Usually emoji
  description: string
}

// Represents a language option for selection
export interface ILanguage {
  id: string // e.g., 'en', 'fr'
  name: string // e.g., 'Anglais', 'Français'
  flag: string // Emoji flag
}

// Represents an item in the FAQ list
export interface IFAQItem {
  id: string
  question: string
  answer: string
}

// Represents a notification item
export interface INotificationItem {
  id: string
  type: 'achievement' | 'reminder' | 'info' | 'download' | string // Add other types as needed
  title: string
  message: string
  time: string // Consider using Date
  icon: React.ReactNode
}

// Represents a category/subject shown in search (before search term entered)
// Can reuse Interest or create a specific type if structure differs
export interface ISearchCategory {
  id: string
  name: string
  icon: string // Emoji
}

// Represents a review (placeholder for DeckDetails)
export interface IReview {
  id: string
  rating: number
  comment: string
  author: string
  date: string // Consider Date
}

// Type for card data being edited or added
export interface ICardData {
  front: string
  back: string
  // Add other fields like tags, deckId, audio, image etc. as needed
}
