// src/components/ClientLayoutWrapper.tsx
'use client'

import { pageTransitionVariants } from '@/types/animations'
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // const [isMounted, setIsMounted] = useState(false)
  // useEffect(() => {
  //   setIsMounted(true)
  // }, [])

  // if (!isMounted) {
  //   return null // or a loading spinner
  // }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageTransitionVariants}
          className="min-h-screen flex flex-col"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </LazyMotion>
  )
}
