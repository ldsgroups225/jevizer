import { cn } from '@/lib/utils'
// src/components/progress-circle.tsx
import React from 'react'

interface ProgressCircleProps extends React.SVGProps<SVGSVGElement> {
  value: number // 0 to 100
  strokeWidth?: number
  size?: number
  baseColor?: string
  progressColor?: string
  showText?: boolean
  textSize?: string
  textColor?: string
  textSuffix?: string
}

export function ProgressCircle({
  value,
  strokeWidth = 4,
  size = 48,
  baseColor = 'text-gray-200',
  progressColor = 'text-primary',
  showText = true,
  textSize = 'text-sm',
  textColor = 'text-muted-foreground font-semibold',
  textSuffix = '%',
  className,
  ...props
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const center = size / 2

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
        <circle
          className={cn('stroke-current', baseColor)}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          className={cn('stroke-current transition-all duration-300 ease-linear', progressColor)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      {showText && (
        <span className={cn('absolute', textSize, textColor)}>
          {Math.round(value)}
          {textSuffix}
        </span>
      )}
    </div>
  )
}
