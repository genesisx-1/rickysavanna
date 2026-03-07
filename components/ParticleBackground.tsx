'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

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
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Particles
    const particleCount = 800
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25
      velocities[i] = (Math.random() - 0.5) * 0.002
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0x6c5ce7,
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Connection lines
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(particleCount * particleCount * 3)
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6c5ce7,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse interaction
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const posArr = posAttr.array as Float32Array

      // Update particle positions
      for (let i = 0; i < particleCount * 3; i++) {
        posArr[i] += velocities[i]
        if (posArr[i] > 12.5 || posArr[i] < -12.5) {
          velocities[i] *= -1
        }
      }

      // Mouse influence
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        const dx = posArr[idx] - mouse.x * 5
        const dy = posArr[idx + 1] - mouse.y * 5
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 2) {
          posArr[idx] += dx * 0.005
          posArr[idx + 1] += dy * 0.005
        }
      }

      posAttr.needsUpdate = true

      // Update connections (only check nearby particles for performance)
      let lineIndex = 0
      const lineArr = lineGeometry.attributes.position.array as Float32Array
      const maxConnections = 300
      let connections = 0

      for (let i = 0; i < particleCount && connections < maxConnections; i++) {
        for (let j = i + 1; j < particleCount && connections < maxConnections; j++) {
          const dx = posArr[i * 3] - posArr[j * 3]
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1]
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < 1.5) {
            lineArr[lineIndex++] = posArr[i * 3]
            lineArr[lineIndex++] = posArr[i * 3 + 1]
            lineArr[lineIndex++] = posArr[i * 3 + 2]
            lineArr[lineIndex++] = posArr[j * 3]
            lineArr[lineIndex++] = posArr[j * 3 + 1]
            lineArr[lineIndex++] = posArr[j * 3 + 2]
            connections++
          }
        }
      }

      // Clear remaining lines
      for (let i = lineIndex; i < lineArr.length; i++) {
        lineArr[i] = 0
      }

      lineGeometry.attributes.position.needsUpdate = true

      // Slow rotation
      particles.rotation.y += 0.0003
      lines.rotation.y += 0.0003

      renderer.render(scene, camera)
    }
    animate()

    // Theme observer
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme')
      const color = theme === 'light' ? 0xa29bfe : 0x6c5ce7
      material.color.setHex(color)
      lineMaterial.color.setHex(color)
      material.opacity = theme === 'light' ? 0.3 : 0.4
      lineMaterial.opacity = theme === 'light' ? 0.04 : 0.06
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
