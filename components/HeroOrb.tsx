'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * A slowly rotating wireframe icosphere with an orbiting point shell.
 * Sits behind the portrait and reacts to pointer movement.
 */
export default function HeroOrb() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const size = () => Math.min(mount.clientWidth || 460, 560)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 4.2

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return
    }
    let dim = size()
    renderer.setSize(dim, dim)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      const a = s.getPropertyValue('--accent').trim() || '#6c5ce7'
      const b = s.getPropertyValue('--accent-secondary').trim() || '#00cec9'
      try {
        return [new THREE.Color(a), new THREE.Color(b)] as const
      } catch {
        return [new THREE.Color('#6c5ce7'), new THREE.Color('#00cec9')] as const
      }
    }
    let [colA, colB] = readColors()

    const group = new THREE.Group()
    scene.add(group)

    // Wireframe shell
    const shellGeo = new THREE.IcosahedronGeometry(1.75, 2)
    const shellMat = new THREE.MeshBasicMaterial({
      color: colA,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    })
    const shell = new THREE.Mesh(shellGeo, shellMat)
    group.add(shell)

    // Inner dense shell
    const innerGeo = new THREE.IcosahedronGeometry(1.25, 1)
    const innerMat = new THREE.MeshBasicMaterial({
      color: colB,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const inner = new THREE.Mesh(innerGeo, innerMat)
    group.add(inner)

    // Orbiting point shell
    const dotCount = 420
    const dotPos = new Float32Array(dotCount * 3)
    for (let i = 0; i < dotCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.1 + Math.random() * 0.35
      dotPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      dotPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      dotPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3))
    const dotMat = new THREE.PointsMaterial({
      color: colB,
      size: 0.035,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const dots = new THREE.Points(dotGeo, dotMat)
    group.add(dots)

    // Equator ring
    const ringGeo = new THREE.TorusGeometry(2.35, 0.006, 8, 160)
    const ringMat = new THREE.MeshBasicMaterial({ color: colA, transparent: true, opacity: 0.45 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.4
    group.add(ring)

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const onResize = () => {
      dim = size()
      renderer.setSize(dim, dim)
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const themeObserver = new MutationObserver(() => {
      ;[colA, colB] = readColors()
      shellMat.color.copy(colA)
      ringMat.color.copy(colA)
      innerMat.color.copy(colB)
      dotMat.color.copy(colB)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let frame = 0
    let running = true
    const onVisibility = () => {
      running = !document.hidden
      if (running) animate()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const clock = new THREE.Clock()

    function animate() {
      if (!running) return
      frame = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      if (!reduceMotion) {
        shell.rotation.y = t * 0.12
        shell.rotation.x = Math.sin(t * 0.18) * 0.18
        inner.rotation.y = -t * 0.2
        inner.rotation.z = t * 0.08
        dots.rotation.y = t * 0.06
        ring.rotation.z = t * 0.1
        group.position.y = Math.sin(t * 0.6) * 0.06
      }

      pointer.x += (target.x - pointer.x) * 0.05
      pointer.y += (target.y - pointer.y) * 0.05
      group.rotation.y = pointer.x * 0.25
      group.rotation.x = pointer.y * 0.18

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
      ;[shellGeo, innerGeo, dotGeo, ringGeo].forEach(g => g.dispose())
      ;[shellMat, innerMat, dotMat, ringMat].forEach(m => m.dispose())
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="hero-orb" aria-hidden="true" />
}
