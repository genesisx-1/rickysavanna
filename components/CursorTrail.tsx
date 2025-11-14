'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create particles for trail
    const particleCount = 15
    const particles: THREE.Vector3[] = []
    const velocities: THREE.Vector3[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new THREE.Vector3(0, 0, 0))
      velocities.push(new THREE.Vector3(0, 0, 0))
    }

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0x888888,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    })

    const trail = new THREE.Points(geometry, material)
    scene.add(trail)

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1
      
      // Update particle positions (trail effect)
      for (let i = particleCount - 1; i > 0; i--) {
        particles[i].x = particles[i - 1].x
        particles[i].y = particles[i - 1].y
        particles[i].z = particles[i - 1].z
      }
      
      // Lead particle follows cursor
      particles[0].x = mouseRef.current.x * 5
      particles[0].y = mouseRef.current.y * 5
      particles[0].z = 0
      
      // Update geometry
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = particles[i].x
        positions[i * 3 + 1] = particles[i].y
        positions[i * 3 + 2] = particles[i].z
      }
      geometry.attributes.position.needsUpdate = true
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-50"
    />
  )
}

