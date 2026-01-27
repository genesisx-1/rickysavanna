'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Segment {
  position: THREE.Vector3
  mesh: THREE.Mesh
}

interface Worm {
  segments: Segment[]
  direction: { x: number; y: number }
  color: number
  headColor: number
  isAI: boolean
  score: number
}

export default function WormGame() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const wormsRef = useRef<Worm[]>([])
  const foodRef = useRef<THREE.Mesh | null>(null)
  const keysRef = useRef<Set<string>>(new Set())
  const animationIdRef = useRef<number | null>(null)

  const GRID_SIZE = 20
  const CELL_SIZE = 0.5
  const INITIAL_LENGTH = 3
  const NUM_AI_WORMS = 3

  const createFood = (scene: THREE.Scene, avoidPositions: THREE.Vector3[] = []) => {
    if (foodRef.current) {
      scene.remove(foodRef.current)
      foodRef.current.geometry.dispose()
      if (foodRef.current.material instanceof THREE.Material) {
        foodRef.current.material.dispose()
      }
    }

    const foodGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const foodMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6b6b,
      emissive: 0xff6b6b,
      emissiveIntensity: 0.5
    })
    const food = new THREE.Mesh(foodGeometry, foodMaterial)
    
    // Random position on grid, avoiding worm positions
    let attempts = 0
    let x: number, y: number
    do {
      x = Math.floor(Math.random() * GRID_SIZE) - GRID_SIZE / 2
      y = Math.floor(Math.random() * GRID_SIZE) - GRID_SIZE / 2
      attempts++
    } while (
      attempts < 50 && 
      avoidPositions.some(pos => 
        Math.abs(pos.x - x * CELL_SIZE) < CELL_SIZE && 
        Math.abs(pos.y - y * CELL_SIZE) < CELL_SIZE
      )
    )
    
    food.position.set(x * CELL_SIZE, y * CELL_SIZE, 0)
    scene.add(food)
    foodRef.current = food
  }

  const checkCollision = (head: THREE.Vector3, wormIndex: number, allWorms: Worm[]): boolean => {
    // Check wall collision
    const halfGrid = (GRID_SIZE * CELL_SIZE) / 2
    if (
      Math.abs(head.x) >= halfGrid ||
      Math.abs(head.y) >= halfGrid
    ) {
      return true
    }

    // Check collision with all worms (including self)
    for (let w = 0; w < allWorms.length; w++) {
      const worm = allWorms[w]
      const startIndex = (w === wormIndex) ? 1 : 0 // Skip own head for self-collision
      for (let i = startIndex; i < worm.segments.length; i++) {
        const segment = worm.segments[i]
        if (head.distanceTo(segment.position) < CELL_SIZE * 0.8) {
          return true
        }
      }
    }

    return false
  }

  const getAIDirection = (worm: Worm, foodPos: THREE.Vector3): { x: number; y: number } => {
    if (!foodPos) return worm.direction

    const head = worm.segments[0].position
    const dx = foodPos.x - head.x
    const dy = foodPos.y - head.y

    // Simple AI: move toward food, but avoid immediate collisions
    const possibleDirections = [
      { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
    ]

    // Filter out opposite direction (can't reverse)
    const opposite = { x: -worm.direction.x, y: -worm.direction.y }
    const validDirections = possibleDirections.filter(dir => 
      !(dir.x === opposite.x && dir.y === opposite.y)
    )

    // Score each direction
    const scored = validDirections.map(dir => {
      const testPos = new THREE.Vector3(
        head.x + dir.x * CELL_SIZE,
        head.y + dir.y * CELL_SIZE,
        0
      )
      
      // Check if this direction would cause collision
      const wouldCollide = checkCollision(testPos, wormsRef.current.indexOf(worm), wormsRef.current)
      
      // Distance to food
      const distToFood = Math.abs(testPos.x - foodPos.x) + Math.abs(testPos.y - foodPos.y)
      
      return {
        dir,
        score: wouldCollide ? -1000 : -distToFood, // Prefer closer to food, avoid collisions
        wouldCollide
      }
    })

    // Sort by score (higher is better)
    scored.sort((a, b) => b.score - a.score)

    // Sometimes add randomness to make AI less perfect
    if (Math.random() > 0.3 && scored.length > 1) {
      // 70% chance to pick best, 30% chance to pick from top 2
      const topChoices = scored.filter(s => !s.wouldCollide).slice(0, 2)
      if (topChoices.length > 0) {
        return topChoices[Math.floor(Math.random() * topChoices.length)].dir
      }
    }

    return scored[0]?.dir || worm.direction
  }

  const createWorm = (
    scene: THREE.Scene,
    startX: number,
    startY: number,
    color: number,
    headColor: number,
    isAI: boolean
  ): Worm => {
    const segmentGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const segmentMaterial = new THREE.MeshStandardMaterial({ 
      color: color,
      emissive: color,
      emissiveIntensity: 0.3
    })

    const segments: Segment[] = []
    const direction = isAI 
      ? { x: Math.random() > 0.5 ? 1 : -1, y: 0 }
      : { x: 1, y: 0 }

    for (let i = 0; i < INITIAL_LENGTH; i++) {
      const segment = new THREE.Mesh(segmentGeometry.clone(), segmentMaterial.clone())
      const position = new THREE.Vector3(
        startX - i * direction.x * CELL_SIZE,
        startY - i * direction.y * CELL_SIZE,
        0
      )
      segment.position.copy(position)
      scene.add(segment)
      segments.push({ position, mesh: segment })
    }

    // Make head slightly larger and different color
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: headColor,
      emissive: headColor,
      emissiveIntensity: 0.5
    })
    segments[0].mesh.material = headMaterial
    segments[0].mesh.scale.set(1.2, 1.2, 1.2)

    return {
      segments,
      direction,
      color,
      headColor,
      isAI,
      score: 0
    }
  }

  const startGame = () => {
    if (!containerRef.current || !sceneRef.current) return

    setIsPlaying(true)
    setGameOver(false)
    setScore(0)
    keysRef.current.clear()

    // Clear existing worms
    wormsRef.current.forEach(worm => {
      worm.segments.forEach(segment => {
        sceneRef.current!.remove(segment.mesh)
        segment.mesh.geometry.dispose()
        if (segment.mesh.material instanceof THREE.Material) {
          segment.mesh.material.dispose()
        }
      })
    })
    wormsRef.current = []

    // Create player worm (cyan)
    const playerWorm = createWorm(
      sceneRef.current,
      -2 * CELL_SIZE,
      0,
      0x4ecdc4,
      0x45b7b8,
      false
    )
    wormsRef.current.push(playerWorm)

    // Create AI worms with different colors
    const aiColors = [
      { body: 0xff6b9d, head: 0xff8fab }, // Pink
      { body: 0x95e1d3, head: 0x6bcfb8 }, // Mint
      { body: 0xffd93d, head: 0xffed4e }, // Yellow
    ]

    const positions = [
      { x: 2 * CELL_SIZE, y: 2 * CELL_SIZE },
      { x: -2 * CELL_SIZE, y: 2 * CELL_SIZE },
      { x: 0, y: -2 * CELL_SIZE },
    ]

    for (let i = 0; i < NUM_AI_WORMS; i++) {
      const aiWorm = createWorm(
        sceneRef.current,
        positions[i].x,
        positions[i].y,
        aiColors[i].body,
        aiColors[i].head,
        true
      )
      wormsRef.current.push(aiWorm)
    }

    // Create initial food
    const allPositions = wormsRef.current.flatMap(w => w.segments.map(s => s.position))
    createFood(sceneRef.current, allPositions)
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)
    sceneRef.current = scene

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    camera.position.z = 8
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Grid helper
    const gridHelper = new THREE.GridHelper(GRID_SIZE * CELL_SIZE, GRID_SIZE, 0x333333, 0x222222)
    scene.add(gridHelper)

    let lastUpdate = 0
    const updateInterval = 200 // milliseconds

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!isPlaying || gameOver) {
        renderer.render(scene, camera)
        return
      }

      const now = Date.now()
      if (now - lastUpdate < updateInterval) {
        renderer.render(scene, camera)
        return
      }
      lastUpdate = now

      // Handle player input
      const playerWorm = wormsRef.current[0]
      if (playerWorm && !playerWorm.isAI) {
        const keys = Array.from(keysRef.current)
        if (keys.includes('ArrowUp') && playerWorm.direction.y === 0) {
          playerWorm.direction = { x: 0, y: 1 }
        } else if (keys.includes('ArrowDown') && playerWorm.direction.y === 0) {
          playerWorm.direction = { x: 0, y: -1 }
        } else if (keys.includes('ArrowLeft') && playerWorm.direction.x === 0) {
          playerWorm.direction = { x: -1, y: 0 }
        } else if (keys.includes('ArrowRight') && playerWorm.direction.x === 0) {
          playerWorm.direction = { x: 1, y: 0 }
        }
      }

      // Update all worms
      for (let w = 0; w < wormsRef.current.length; w++) {
        const worm = wormsRef.current[w]
        const head = worm.segments[0]

        // Update AI direction
        if (worm.isAI && foodRef.current) {
          worm.direction = getAIDirection(worm, foodRef.current.position)
        }

        // Calculate new head position
        const newHeadPos = new THREE.Vector3(
          head.position.x + worm.direction.x * CELL_SIZE,
          head.position.y + worm.direction.y * CELL_SIZE,
          0
        )

        // Check collision
        if (checkCollision(newHeadPos, w, wormsRef.current)) {
          if (!worm.isAI) {
            // Player died
            setGameOver(true)
            setIsPlaying(false)
          } else {
            // AI died - remove it
            worm.segments.forEach(segment => {
              scene.remove(segment.mesh)
              segment.mesh.geometry.dispose()
              if (segment.mesh.material instanceof THREE.Material) {
                segment.mesh.material.dispose()
              }
            })
            wormsRef.current.splice(w, 1)
            w-- // Adjust index after removal
            continue
          }
          renderer.render(scene, camera)
          return
        }

        // Check food collision
        let ateFood = false
        if (foodRef.current && head.position.distanceTo(foodRef.current.position) < CELL_SIZE * 0.6) {
          ateFood = true
          worm.score++
          if (!worm.isAI) {
            setScore(prev => prev + 1)
          }
          
          // Create new food, avoiding all worm positions
          const allPositions = wormsRef.current.flatMap(w => w.segments.map(s => s.position))
          createFood(scene, allPositions)
        }

        // Add new head
        const segmentGeometry = new THREE.SphereGeometry(0.2, 16, 16)
        const headMaterial = new THREE.MeshStandardMaterial({ 
          color: worm.headColor,
          emissive: worm.headColor,
          emissiveIntensity: 0.5
        })
        const newHead = new THREE.Mesh(segmentGeometry, headMaterial)
        newHead.position.copy(newHeadPos)
        newHead.scale.set(1.2, 1.2, 1.2)
        scene.add(newHead)

        // Update old head to body segment
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
          color: worm.color,
          emissive: worm.color,
          emissiveIntensity: 0.3
        })
        head.mesh.material = bodyMaterial
        head.mesh.scale.set(1, 1, 1)

        worm.segments.unshift({ position: newHeadPos, mesh: newHead })

        // Remove tail if didn't eat food
        if (!ateFood && worm.segments.length > INITIAL_LENGTH) {
          const tail = worm.segments.pop()!
          scene.remove(tail.mesh)
          tail.mesh.geometry.dispose()
          if (tail.mesh.material instanceof THREE.Material) {
            tail.mesh.material.dispose()
          }
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Keyboard controls
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault()
        keysRef.current.add(event.key)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isPlaying, gameOver])

  const playerWorm = wormsRef.current[0]
  const aiWorms = wormsRef.current.filter(w => w.isAI)

  return (
    <div className="relative w-full h-[600px] max-w-4xl mx-auto rounded-lg overflow-hidden border border-gray-800">
      <div ref={containerRef} className="w-full h-full" />
      
      <div className="absolute top-4 left-4 z-20 bg-black/70 text-white px-4 py-2 rounded-lg">
        <div className="text-lg font-bold">Your Score: {score}</div>
        <div className="text-sm text-gray-300">Your Length: {playerWorm?.segments.length || 0}</div>
        {aiWorms.length > 0 && (
          <div className="text-xs text-gray-400 mt-2">
            AI Worms: {aiWorms.length} remaining
          </div>
        )}
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {gameOver ? 'Game Over!' : 'Worm Game'}
            </h2>
            {gameOver && (
              <p className="text-xl mb-4">Final Score: {score}</p>
            )}
            <p className="mb-4 text-gray-300">
              Compete against {NUM_AI_WORMS} AI worms!<br />
              Use arrow keys to move. Eat the red food to grow!
            </p>
            <button
              onClick={startGame}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              {gameOver ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        </div>
      )}

      {isPlaying && !gameOver && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
          Use arrow keys to control your worm (cyan). Compete with AI worms for food!
        </div>
      )}
    </div>
  )
}
