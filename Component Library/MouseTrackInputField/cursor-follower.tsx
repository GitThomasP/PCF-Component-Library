"use client"

import { useEffect, useRef , useState } from "react"


function Avatar({ offset, color }: { offset: { x: number; y: number }; color: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [rotation, setRotation] = useState(0)

  const _target = useRef({x: 0, y: 0})

  useEffect(() => {
    let animationFrameId: number
    let currentX = 0
    let currentY = 0
    let previousX = 0
    let previousY = 0

    const handleMouseMove = (e: MouseEvent) => {
      _target.current.x = e.clientX + offset.x;
      _target.current.y = e.clientY + offset.y;

      if (!isVisible) {
        setIsVisible(true)
        currentX = _target.current.x;
        currentY = _target.current.y;

        previousX = _target.current.x;
        previousY = _target.current.y;
      }
    }

    const animate = () => {
      const ease = 0.15
      currentX += (_target.current.x - currentX) * ease
      currentY += (_target.current.y - currentY) * ease

      const deltaX = currentX - previousX
      const deltaY = currentY - previousY
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
        setRotation(angle)
      }

      previousX = currentX
      previousY = currentY

      setPosition({ x: currentX, y: currentY })
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible, offset.x, offset.y])

  if (!isVisible) return null

  return (
    <div
      className="avatar-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      <div className="avatar-shadow" style={{ backgroundColor: color }} />

      <div className="avatar-main">
        <div className="avatar-body" style={{ backgroundColor: color }}>
          <div
            className="avatar-face"
            style={{ backgroundColor: color === "#9b87f5" ? "#7dd3fc" : color === "#f97316" ? "#fbbf24" : "#a78bfa" }}
          >
            <div className="avatar-eye avatar-eye-left" />
            <div className="avatar-eye avatar-eye-right" />
            <div className="avatar-mouth" />
            <div className="avatar-blush avatar-blush-left" style={{ backgroundColor: color }} />
            <div className="avatar-blush avatar-blush-right" style={{ backgroundColor: color }} />
          </div>

          <div
            className="avatar-ear avatar-ear-left"
            style={{ backgroundColor: color === "#9b87f5" ? "#7dd3fc" : color === "#f97316" ? "#fbbf24" : "#a78bfa" }}
          />
          <div
            className="avatar-ear avatar-ear-right"
            style={{ backgroundColor: color === "#9b87f5" ? "#7dd3fc" : color === "#f97316" ? "#fbbf24" : "#a78bfa" }}
          />

          <div className="avatar-arm avatar-arm-left" style={{ backgroundColor: color }} />
          <div className="avatar-arm avatar-arm-right" style={{ backgroundColor: color }} />
        </div>

        <div className="avatar-sparkle avatar-sparkle-1">✨</div>
        <div className="avatar-sparkle avatar-sparkle-2">✨</div>
      </div>
    </div>
  )
}

export default function CursorFollower() {
  return (
    <>
      <Avatar offset={{ x: 0, y: 80 }} color="#9b87f5" />
      <Avatar offset={{ x: -150, y: -80 }} color="#f97316" />
      <Avatar offset={{ x: 150, y: -80 }} color="#8b5cf6" />
    </>
  )
}
