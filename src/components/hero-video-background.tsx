'use client'

interface HeroVideoBackgroundProps {
  videoUrl?: string
  youtubeId?: string
  posterUrl?: string
  imageUrl?: string
  overlayClassName?: string
  opacityClass?: string
}

export function HeroVideoBackground({
  videoUrl,
  youtubeId,
  posterUrl,
  imageUrl,
  overlayClassName = 'bg-gradient-to-r from-[#00121d]/90 via-[#001622]/60 to-[#001622]/30',
  opacityClass = 'opacity-100'
}: HeroVideoBackgroundProps) {
  const bgImage = imageUrl || posterUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?q=85&w=2400&auto=format&fit=crop'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#00141f]">
      {/* Ultra-HD 4K Crisp Background Image with High Visual Fidelity */}
      {bgImage && (
        <img
          src={bgImage}
          alt="Sindh School of Technology Campus"
          aria-hidden="true"
          className={"absolute inset-0 w-full h-full object-cover object-center brightness-[0.88] contrast-[1.08] saturate-[1.05] transition-all duration-700 " + opacityClass}
        />
      )}

      {/* Cinematic Directional Scrim: Smooth dark gradient on the left for text legibility, open and clear on the right */}
      <div className={"absolute inset-0 z-1 " + overlayClassName} />

      {/* Subtle High-Tech Cyan Mesh Grid */}
      <div className="absolute inset-0 z-1 opacity-10 bg-[linear-gradient(to_right,#0ea5e915_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e915_1px,transparent_1px)] bg-[size:36px_36px]" />
    </div>
  )
}
