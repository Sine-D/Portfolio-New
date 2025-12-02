import { useCallback } from 'react'

export function useConfetti() {
  return useCallback(async () => {
    const { default: confetti } = await import('canvas-confetti')
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.7 },
      ticks: 200,
      gravity: 1.2,
    })
  }, [])
}

