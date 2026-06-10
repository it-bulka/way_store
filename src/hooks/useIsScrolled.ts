import { useState, useEffect } from 'react'

export function useIsScrolled(): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.cssText =
      'position:absolute;top:0;height:1px;width:1px;pointer-events:none;visibility:hidden;'
    document.body.prepend(sentinel)

    const observer = new IntersectionObserver(([entry]) => setIsScrolled(!entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  return isScrolled
}
