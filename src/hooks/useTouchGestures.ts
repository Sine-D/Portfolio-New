import { useState, useRef, useEffect, TouchEvent } from 'react'

interface SwipeDirection {
  direction: 'left' | 'right' | 'up' | 'down' | null
  distance: number
}

interface TouchGestureHandlers {
  onSwipe?: (direction: SwipeDirection) => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onTap?: () => void
  onLongPress?: () => void
  threshold?: number
  longPressDelay?: number
}

export function useTouchGestures({
  onSwipe,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onTap,
  onLongPress,
  threshold = 50,
  longPressDelay = 500,
}: TouchGestureHandlers) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number; time: number } | null>(null)
  const [pinchStart, setPinchStart] = useState<number | null>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const minSwipeDistance = threshold

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    const startPos = { x: touch.clientX, y: touch.clientY, time: Date.now() }
    setTouchStart(startPos)
    setTouchEnd(null)

    // Long press detection
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress()
      }, longPressDelay)
    }

    // Pinch detection
    if (e.touches.length === 2 && onPinch) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      setPinchStart(distance)
    }
  }

  const onTouchMove = (e: TouchEvent) => {
    // Cancel long press if moved
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }

    // Pinch handling
    if (e.touches.length === 2 && onPinch && pinchStart !== null) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      const scale = distance / pinchStart
      onPinch(scale)
    }

    const touch = e.touches[0]
    setTouchEnd({ x: touch.clientX, y: touch.clientY, time: Date.now() })
  }

  const onTouchEnd = () => {
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }

    if (!touchStart || !touchEnd) {
      // Check for tap
      if (onTap && touchStart) {
        const timeDiff = Date.now() - touchStart.time
        if (timeDiff < 300) {
          onTap()
        }
      }
      return
    }

    const distanceX = touchEnd.x - touchStart.x
    const distanceY = touchEnd.y - touchStart.y

    const isLeftSwipe = distanceX < -minSwipeDistance
    const isRightSwipe = distanceX > minSwipeDistance
    const isUpSwipe = distanceY < -minSwipeDistance
    const isDownSwipe = distanceY > minSwipeDistance

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (isLeftSwipe) {
        onSwipeLeft?.()
        onSwipe?.({ direction: 'left', distance: Math.abs(distanceX) })
      }
      if (isRightSwipe) {
        onSwipeRight?.()
        onSwipe?.({ direction: 'right', distance: Math.abs(distanceX) })
      }
    } else {
      // Vertical swipe
      if (isUpSwipe) {
        onSwipeUp?.()
        onSwipe?.({ direction: 'up', distance: Math.abs(distanceY) })
      }
      if (isDownSwipe) {
        onSwipeDown?.()
        onSwipe?.({ direction: 'down', distance: Math.abs(distanceY) })
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
    setPinchStart(null)
  }

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
    }
  }, [])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}

