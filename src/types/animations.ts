// src/types/animations.ts
import type { Variants } from 'framer-motion'

export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

export const expandedContentVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.1 },
    },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
}

export const cardFlipVariants: Variants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
}

export const buttonTapScale = { scale: 0.95 }
