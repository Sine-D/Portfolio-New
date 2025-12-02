import { useCallback, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

export function useDragScroll<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null)
  const isPointerDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  const onPointerDown = useCallback((event: ReactPointerEvent<T>) => {
    if (!containerRef.current || event.pointerType !== 'mouse') return
    isPointerDown.current = true
    startX.current = event.clientX
    scrollLeft.current = containerRef.current.scrollLeft
    containerRef.current.setPointerCapture(event.pointerId)
  }, [])

  const onPointerMove = useCallback((event: ReactPointerEvent<T>) => {
    if (!isPointerDown.current || !containerRef.current || event.pointerType !== 'mouse') return
    event.preventDefault()
    setIsDragging(true)
    const walk = (event.clientX - startX.current) * 1.2
    containerRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const endDrag = useCallback((event?: ReactPointerEvent<T>) => {
    if (event && containerRef.current && event.pointerType === 'mouse') {
      containerRef.current.releasePointerCapture(event.pointerId)
    }
    isPointerDown.current = false
    setTimeout(() => setIsDragging(false), 150)
  }, [])

  return {
    containerRef,
    isDragging,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
    },
  }
}

