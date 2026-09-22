'use client'

import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  iconOnly?: boolean
  lightMode?: boolean
}

export function BrandLogo({ className, iconOnly = false, lightMode = false }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 sm:gap-3 select-none group", className)}>
      {/* Premium Crimson EdTech AI Shield Emblem */}
      <div className="relative flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
        <svg 
          viewBox="0 0 40 40" 
          className="h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 drop-shadow-md" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brandCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="60%" stopColor="#DC1342" />
              <stop offset="100%" stopColor="#8D1B2D" />
            </linearGradient>
            <linearGradient id="brandGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Outer Badge */}
          <rect 
            x="2" 
            y="2" 
            width="36" 
            height="36" 
            rx="9" 
            fill="url(#brandCrimson)" 
            stroke="#FB7185" 
            strokeWidth="1.2" 
            strokeOpacity="0.5" 
          />
          
          {/* Glass Specular Highlight */}
          <rect 
            x="3" 
            y="3" 
            width="34" 
            height="17" 
            rx="7" 
            fill="url(#brandGlow)" 
          />
          
          {/* Graduation Cap Top Rhombus */}
          <path 
            d="M20 9.5L31.5 15.5L20 21.5L8.5 15.5L20 9.5Z" 
            fill="#FFFFFF" 
          />
          
          {/* Cap Lower Arch Base */}
          <path 
            d="M12.5 19V23.5C12.5 26.2 15.8 28.5 20 28.5C24.2 28.5 27.5 26.2 27.5 23.5V19L20 23L12.5 19Z" 
            fill="#FFFFFF" 
            fillOpacity="0.92" 
          />
          
          {/* Gold AI Sparkle / Intellect Node */}
          <path 
            d="M20 23.5L21.3 27.2L25 28.5L21.3 29.8L20 33.5L18.7 29.8L15 28.5L18.7 27.2L20 23.5Z" 
            fill="#FBBF24" 
          />
          
          {/* Tassel Detail */}
          <path 
            d="M29.5 16.5V23M29.5 23C29.5 24 30.5 24.5 31 24.5" 
            stroke="#FBBF24" 
            strokeWidth="1.3" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span 
              className={cn(
                "font-black text-sm sm:text-base md:text-[17px] tracking-tight uppercase font-sans",
                lightMode ? "text-slate-900" : "text-white"
              )}
            >
              AI <span className="text-[#E11D48]">EDUCATION</span>
            </span>
          </div>
          <span 
            className={cn(
              "text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-[0.25em] uppercase font-bold mt-0.5 leading-none",
              lightMode ? "text-slate-600" : "text-slate-200"
            )}
          >
            PLATFORM
          </span>
        </div>
      )}
    </div>
  )
}
