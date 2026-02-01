// Plausible analytics wrapper
declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Record<string, string | number> }) => void
  }
}

export const trackEvent = (eventName: string, props?: Record<string, string | number>) => {
  if (typeof window.plausible !== 'undefined') {
    window.plausible(eventName, props ? { props } : undefined)
  }
}
