/**
 * Example usage of enhanced 3D components
 * This file demonstrates how to use the new 3D animation components
 */

import { useState } from 'react'
import ThreeDScene from './ThreeDScene'
import ThreeDMeshBackground from './ThreeDMeshBackground'
import { Scroll3DParallax, Card3DReveal, Stack3D } from './Scroll3DParallax'
import { AdvancedText3D, WaveText3D, TextReveal3D, GlitchText3D } from './ThreeDTextAdvanced'
import { TabNav3D, MenuItem3D } from './ThreeDNavigation'

// Example: Using 3D Scene
export function ExampleThreeDScene() {
  return (
    <div className="relative w-full h-screen">
      <ThreeDScene showControls={false} intensity={0.6} />
    </div>
  )
}

// Example: Using 3D Mesh Background
export function ExampleMeshBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  return (
    <div
      className="relative w-full h-screen"
      onMouseMove={(e) => {
        setMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        })
      }}
    >
      <ThreeDMeshBackground mouse={mouse} />
    </div>
  )
}

// Example: Using Scroll 3D Parallax
export function ExampleScrollParallax() {
  return (
    <div className="min-h-[200vh]">
      <Scroll3DParallax speed={0.8} depth={200} direction="up">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Scroll to see 3D effect</h2>
          <p>This content moves in 3D space as you scroll</p>
        </div>
      </Scroll3DParallax>
    </div>
  )
}

// Example: Using 3D Card Reveal
export function ExampleCardReveal() {
  return (
    <div className="min-h-screen py-20">
      <Card3DReveal direction="up" delay={0}>
        <div className="glass rounded-2xl p-8 max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-4">Card 1</h3>
          <p>This card reveals with a 3D rotation effect</p>
        </div>
      </Card3DReveal>
      
      <Card3DReveal direction="left" delay={0.2}>
        <div className="glass rounded-2xl p-8 max-w-md mx-auto mt-8">
          <h3 className="text-2xl font-bold mb-4">Card 2</h3>
          <p>Another card with different direction</p>
        </div>
      </Card3DReveal>
    </div>
  )
}

// Example: Using Advanced 3D Text
export function ExampleAdvancedText() {
  return (
    <div className="space-y-12 p-12">
      <div>
        <h2 className="text-2xl mb-4">Advanced 3D Text</h2>
        <AdvancedText3D depth={60} layers={8} color="#06b6d4" glowColor="#8b5cf6">
          HELLO WORLD
        </AdvancedText3D>
      </div>

      <div>
        <h2 className="text-2xl mb-4">Wave 3D Text</h2>
        <WaveText3D amplitude={30} frequency={0.03}>
          WAVE ANIMATION
        </WaveText3D>
      </div>

      <div>
        <h2 className="text-2xl mb-4">Reveal 3D Text</h2>
        <TextReveal3D delay={0}>
          REVEAL EFFECT
        </TextReveal3D>
      </div>

      <div>
        <h2 className="text-2xl mb-4">Glitch 3D Text</h2>
        <GlitchText3D intensity={8}>
          GLITCH MODE
        </GlitchText3D>
      </div>
    </div>
  )
}

// Example: Using 3D Stack
export function ExampleStack3D() {
  const cards = [
    <div key="1" className="glass rounded-xl p-6">
      <h3 className="text-xl font-bold">Card 1</h3>
      <p>First card in stack</p>
    </div>,
    <div key="2" className="glass rounded-xl p-6">
      <h3 className="text-xl font-bold">Card 2</h3>
      <p>Second card in stack</p>
    </div>,
    <div key="3" className="glass rounded-xl p-6">
      <h3 className="text-xl font-bold">Card 3</h3>
      <p>Third card in stack</p>
    </div>,
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-md mx-auto h-96">
        <Stack3D spacing={30}>{cards}</Stack3D>
      </div>
    </div>
  )
}

// Example: Using 3D Tab Navigation
export function ExampleTabNav() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = [
    {
      label: 'Tab 1',
      content: <div className="glass rounded-xl p-6">Content for Tab 1</div>,
    },
    {
      label: 'Tab 2',
      content: <div className="glass rounded-xl p-6">Content for Tab 2</div>,
    },
    {
      label: 'Tab 3',
      content: <div className="glass rounded-xl p-6">Content for Tab 3</div>,
    },
  ]

  return (
    <div className="p-12">
      <TabNav3D tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

// Example: Using 3D Menu Items
export function ExampleMenuItems() {
  return (
    <div className="flex gap-4 p-12">
      <MenuItem3D active>
        <button className="px-6 py-3 glass-strong rounded-lg">Home</button>
      </MenuItem3D>
      <MenuItem3D>
        <button className="px-6 py-3 glass rounded-lg">About</button>
      </MenuItem3D>
      <MenuItem3D>
        <button className="px-6 py-3 glass rounded-lg">Projects</button>
      </MenuItem3D>
      <MenuItem3D>
        <button className="px-6 py-3 glass rounded-lg">Contact</button>
      </MenuItem3D>
    </div>
  )
}

