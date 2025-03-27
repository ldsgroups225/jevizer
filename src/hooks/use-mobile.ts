import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Create a ref to track the current mobile state
  const isMobileRef = React.useRef<boolean>(false)

  // Create state that forces re-render when mobile status changes
  const [, forceRender] = React.useReducer((x: number) => x + 1, 0)

  // Setup once on mount
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Update ref and trigger re-render when media query changes
    const onChange = (e: MediaQueryListEvent) => {
      isMobileRef.current = e.matches
      forceRender()
    }

    // Set initial value
    isMobileRef.current = mql.matches
    forceRender()

    // Listen for changes
    mql.addEventListener('change', onChange)

    // Cleanup
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobileRef.current
}
