import { useEffect, useRef, useState } from 'react'

function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const cursorGlowRef = useRef(null)
  const trailsRef = useRef([])
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Store refs for trail elements
  const trailContainerRef = useRef(null)

  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    const glow = cursorGlowRef.current
    const trailContainer = trailContainerRef.current

    if (!dot || !ring || !glow || !trailContainer) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let glowX = 0
    let glowY = 0

    // Create trail particles
    const TRAIL_COUNT = 8
    const trailElements = []
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const trail = document.createElement('div')
      trail.className = 'cursor-trail'
      trail.style.cssText = `
        position: fixed;
        width: ${6 - i * 0.5}px;
        height: ${6 - i * 0.5}px;
        border-radius: 50%;
        background: var(--neon-red);
        pointer-events: none;
        z-index: 99997;
        opacity: ${0.6 - i * 0.07};
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
        filter: blur(${i * 0.3}px);
      `
      trailContainer.appendChild(trail)
      trailElements.push({ el: trail, x: 0, y: 0 })
    }
    trailsRef.current = trailElements

    // Sparkle pool
    const SPARKLE_POOL_SIZE = 20
    const sparklePool = []
    for (let i = 0; i < SPARKLE_POOL_SIZE; i++) {
      const sparkle = document.createElement('div')
      sparkle.className = 'cursor-sparkle'
      sparkle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: var(--neon-pink);
        pointer-events: none;
        z-index: 99996;
        opacity: 0;
        transform: translate(-50%, -50%);
      `
      trailContainer.appendChild(sparkle)
      sparklePool.push({ el: sparkle, active: false })
    }

    let sparkleIndex = 0
    let lastSparkleTime = 0
    let lastSparkleX = 0
    let lastSparkleY = 0

    const emitSparkle = (x, y) => {
      const now = Date.now()
      const dist = Math.hypot(x - lastSparkleX, y - lastSparkleY)
      if (now - lastSparkleTime < 50 || dist < 15) return

      lastSparkleTime = now
      lastSparkleX = x
      lastSparkleY = y

      const sparkle = sparklePool[sparkleIndex % SPARKLE_POOL_SIZE]
      sparkleIndex++

      const angle = Math.random() * Math.PI * 2
      const distance = 15 + Math.random() * 25
      const tx = Math.cos(angle) * distance
      const ty = Math.sin(angle) * distance
      const size = 2 + Math.random() * 3

      sparkle.el.style.width = `${size}px`
      sparkle.el.style.height = `${size}px`
      sparkle.el.style.left = `${x}px`
      sparkle.el.style.top = `${y}px`
      sparkle.el.style.opacity = '1'
      sparkle.el.style.background = Math.random() > 0.5 ? 'var(--neon-red)' : 'var(--neon-pink)'
      sparkle.el.style.boxShadow = `0 0 6px currentColor`
      sparkle.el.style.transition = 'none'

      requestAnimationFrame(() => {
        sparkle.el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        sparkle.el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`
        sparkle.el.style.opacity = '0'
      })
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
      emitSparkle(mouseX, mouseY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('btn') ||
        target.closest('.btn') ||
        target.classList.contains('nav-link') ||
        target.closest('.nav-link') ||
        target.classList.contains('project-card') ||
        target.closest('.project-card') ||
        target.classList.contains('cert-card') ||
        target.closest('.cert-card') ||
        target.classList.contains('social-link') ||
        target.closest('.social-link') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    // Animation loop for smooth following
    const animate = () => {
      // Smooth follow for ring
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15

      // Even smoother for glow
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08

      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`

      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`

      glow.style.left = `${glowX}px`
      glow.style.top = `${glowY}px`

      // Animate trails
      const trails = trailsRef.current
      for (let i = trails.length - 1; i > 0; i--) {
        trails[i].x += (trails[i - 1].x - trails[i].x) * 0.35
        trails[i].y += (trails[i - 1].y - trails[i].y) * 0.35
        trails[i].el.style.left = `${trails[i].x}px`
        trails[i].el.style.top = `${trails[i].y}px`
      }
      if (trails.length > 0) {
        trails[0].x = mouseX
        trails[0].y = mouseY
        trails[0].el.style.left = `${mouseX}px`
        trails[0].el.style.top = `${mouseY}px`
      }

      requestAnimationFrame(animate)
    }

    animate()

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      // Clean up trail and sparkle elements
      while (trailContainer.firstChild) {
        trailContainer.removeChild(trailContainer.firstChild)
      }
    }
  }, [])

  // Build class names
  const dotClass = `cursor-dot${isHovering ? ' hovering' : ''}${isClicking ? ' clicking' : ''}${isVisible ? ' visible' : ''}`
  const ringClass = `cursor-ring${isHovering ? ' hovering' : ''}${isClicking ? ' clicking' : ''}${isVisible ? ' visible' : ''}`
  const glowClass = `cursor-glow${isHovering ? ' hovering' : ''}${isClicking ? ' clicking' : ''}${isVisible ? ' visible' : ''}`

  return (
    <>
      <div ref={trailContainerRef} className="cursor-trail-container" />
      <div ref={cursorGlowRef} className={glowClass} />
      <div ref={cursorRingRef} className={ringClass} />
      <div ref={cursorDotRef} className={dotClass} />
    </>
  )
}

export default CustomCursor
