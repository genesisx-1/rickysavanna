'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * A contour sphere: stacked latitude rings plus a few meridians, drawn as thin
 * monochrome lines. Rotates slowly and tilts a little toward the pointer.
 * Deliberately quiet — it reads as a drawing, not an effect.
 */
export default function HeroWire() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dim = () => Math.min(mount.clientWidth || 480, 620)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 5.4

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return
    }
    let size = dim()
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const readInk = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      return theme === 'light' ? 0x000000 : 0xffffff
    }

    const group = new THREE.Group()
    group.rotation.z = THREE.MathUtils.degToRad(-14)
    scene.add(group)

    const geometries: THREE.BufferGeometry[] = []
    const strokes: { mat: THREE.LineBasicMaterial; base: number }[] = []
    const R = 1.9

    // White-on-black reads fainter than black-on-white at equal alpha, so the
    // dark theme gets a lift.
    const inkBoost = () =>
      document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 1.75

    const makeMaterial = (opacity: number) => {
      const m = new THREE.LineBasicMaterial({
        color: readInk(),
        transparent: true,
        opacity: Math.min(1, opacity * inkBoost()),
      })
      strokes.push({ mat: m, base: opacity })
      return m
    }

    const ringPoints = (radius: number, segments = 128) => {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
      }
      return pts
    }

    // Latitude rings — denser toward the equator, like a contour map
    const LAT_COUNT = 19
    for (let i = 0; i < LAT_COUNT; i++) {
      const t = (i / (LAT_COUNT - 1)) * 2 - 1 // -1 .. 1
      const phi = (t * Math.PI) / 2
      const y = Math.sin(phi) * R
      const r = Math.cos(phi) * R
      if (r < 0.03) continue

      const geo = new THREE.BufferGeometry().setFromPoints(ringPoints(r))
      geometries.push(geo)
      const edgeFade = 1 - Math.abs(t) * 0.55
      const line = new THREE.Line(geo, makeMaterial(0.3 * edgeFade))
      line.position.y = y
      group.add(line)
    }

    // A few meridians for structure
    const MERIDIANS = 4
    for (let i = 0; i < MERIDIANS; i++) {
      const pts: THREE.Vector3[] = []
      const rot = (i / MERIDIANS) * Math.PI
      for (let j = 0; j <= 96; j++) {
        const a = (j / 96) * Math.PI * 2
        pts.push(new THREE.Vector3(
          Math.cos(a) * R * Math.cos(rot),
          Math.sin(a) * R,
          Math.cos(a) * R * Math.sin(rot),
        ))
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      geometries.push(geo)
      group.add(new THREE.Line(geo, makeMaterial(0.14)))
    }

    // Outer orbit ring, tilted off-axis
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(ringPoints(R * 1.34, 160))
    geometries.push(orbitGeo)
    const orbit = new THREE.Line(orbitGeo, makeMaterial(0.26))
    orbit.rotation.x = THREE.MathUtils.degToRad(72)
    group.add(orbit)

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const onResize = () => {
      size = dim()
      renderer.setSize(size, size)
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const themeObserver = new MutationObserver(() => {
      const ink = readInk()
      const boost = inkBoost()
      strokes.forEach(({ mat, base }) => {
        mat.color.setHex(ink)
        mat.opacity = Math.min(1, base * boost)
      })
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
        group.rotation.y = t * 0.085
        orbit.rotation.z = t * 0.12
      }

      pointer.x += (target.x - pointer.x) * 0.045
      pointer.y += (target.y - pointer.y) * 0.045
      group.rotation.x = pointer.y * 0.14
      camera.position.x = pointer.x * 0.35
      camera.lookAt(0, 0, 0)

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
      geometries.forEach(g => g.dispose())
      strokes.forEach(({ mat }) => mat.dispose())
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />
}
