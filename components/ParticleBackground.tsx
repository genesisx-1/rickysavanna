'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const MAX_LINKS = 1400
const PARTICLE_COUNT = 260
const LINK_DIST = 2.6

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 11

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return
    }
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    container.appendChild(renderer.domElement)

    const readAccent = () => {
      const styles = getComputedStyle(document.documentElement)
      const hex = styles.getPropertyValue('--particle-color').trim() || '#6c5ce7'
      try {
        return new THREE.Color(hex)
      } catch {
        return new THREE.Color('#6c5ce7')
      }
    }

    // ---- Points ----
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      velocities[i * 3] = (Math.random() - 0.5) * 0.009
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.009
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }

    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const accent = readAccent()
    const pointMaterial = new THREE.PointsMaterial({
      color: accent,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const points = new THREE.Points(pointGeometry, pointMaterial)
    scene.add(points)

    // ---- Links (bounded buffer) ----
    const linkPositions = new Float32Array(MAX_LINKS * 2 * 3)
    const linkGeometry = new THREE.BufferGeometry()
    const linkAttr = new THREE.BufferAttribute(linkPositions, 3)
    linkAttr.setUsage(THREE.DynamicDrawUsage)
    linkGeometry.setAttribute('position', linkAttr)
    const linkMaterial = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const links = new THREE.LineSegments(linkGeometry, linkMaterial)
    scene.add(links)

    // ---- Interaction ----
    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const themeObserver = new MutationObserver(() => {
      const next = readAccent()
      pointMaterial.color.copy(next)
      linkMaterial.color.copy(next)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let frame = 0
    let running = true
    const onVisibility = () => {
      running = !document.hidden
      if (running) animate()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const posAttr = pointGeometry.getAttribute('position') as THREE.BufferAttribute

    function animate() {
      if (!running) return
      frame = requestAnimationFrame(animate)

      const pos = posAttr.array as Float32Array

      if (!reduceMotion) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const ix = i * 3
          pos[ix] += velocities[ix]
          pos[ix + 1] += velocities[ix + 1]
          pos[ix + 2] += velocities[ix + 2]
          if (pos[ix] > 13 || pos[ix] < -13) velocities[ix] *= -1
          if (pos[ix + 1] > 8 || pos[ix + 1] < -8) velocities[ix + 1] *= -1
          if (pos[ix + 2] > 5 || pos[ix + 2] < -5) velocities[ix + 2] *= -1
        }
        posAttr.needsUpdate = true
      }

      // rebuild links
      let n = 0
      for (let i = 0; i < PARTICLE_COUNT && n < MAX_LINKS; i++) {
        const ax = pos[i * 3], ay = pos[i * 3 + 1], az = pos[i * 3 + 2]
        for (let j = i + 1; j < PARTICLE_COUNT && n < MAX_LINKS; j++) {
          const dx = ax - pos[j * 3]
          const dy = ay - pos[j * 3 + 1]
          const dz = az - pos[j * 3 + 2]
          if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
            const o = n * 6
            linkPositions[o] = ax
            linkPositions[o + 1] = ay
            linkPositions[o + 2] = az
            linkPositions[o + 3] = pos[j * 3]
            linkPositions[o + 4] = pos[j * 3 + 1]
            linkPositions[o + 5] = pos[j * 3 + 2]
            n++
          }
        }
      }
      linkGeometry.setDrawRange(0, n * 2)
      linkAttr.needsUpdate = true

      pointer.x += (target.x - pointer.x) * 0.04
      pointer.y += (target.y - pointer.y) * 0.04
      camera.position.x = pointer.x * 1.1
      camera.position.y = -pointer.y * 0.7
      camera.lookAt(0, 0, 0)

      if (!reduceMotion) {
        points.rotation.y += 0.0006
        links.rotation.y = points.rotation.y
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      themeObserver.disconnect()
      pointGeometry.dispose()
      linkGeometry.dispose()
      pointMaterial.dispose()
      linkMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  )
}
