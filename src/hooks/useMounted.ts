import { useEffect, useRef } from 'react'

export function useMounted() {
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const safeSetState = <T>(setState: (value: T | ((prev: T) => T)) => void, value: T | ((prev: T) => T)) => {
    if (mountedRef.current) {
      setState(value)
    }
  }

  return { safeSetState }
}
