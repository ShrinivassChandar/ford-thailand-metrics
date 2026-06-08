import { motion } from 'framer-motion'

export default function MustangSilhouette({ width = 700 }) {
  const scale = width / 700

  return (
    <div
      style={{
        width,
        height: width * 0.55,
        position: 'relative',
        filter: 'drop-shadow(0 0 40px rgba(180,210,255,0.5)) drop-shadow(0 0 80px rgba(74,158,255,0.3))',
      }}
    >
      {/* Headlight beams - left */}
      <motion.div
        style={{
          position: 'absolute',
          left: '22%',
          top: '35%',
          width: 200 * scale,
          height: 120 * scale,
          background: 'conic-gradient(from 160deg at 10% 50%, rgba(255,255,255,0.25) 0deg, transparent 40deg)',
          transformOrigin: 'left center',
          borderRadius: '0 50% 50% 0',
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Headlight beams - right */}
      <motion.div
        style={{
          position: 'absolute',
          right: '22%',
          top: '35%',
          width: 200 * scale,
          height: 120 * scale,
          background: 'conic-gradient(from 20deg at 90% 50%, rgba(255,255,255,0.25) 0deg, transparent 40deg)',
          transformOrigin: 'right center',
          borderRadius: '50% 0 0 50%',
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* Mustang SVG silhouette - front view */}
      <svg
        width={width}
        height={width * 0.55}
        viewBox="0 0 700 385"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Main car body */}
        <g fill="rgba(220,235,255,0.92)" stroke="rgba(180,210,255,0.4)" strokeWidth="0.5">
          {/* Roof */}
          <path d="M230 120 Q280 60 350 55 Q420 60 470 120 L480 140 L220 140 Z" />
          {/* Windshield frame */}
          <path d="M215 145 L225 120 L475 120 L485 145 Z" fill="rgba(100,150,200,0.3)" />
          {/* A-pillars */}
          <rect x="213" y="118" width="14" height="35" rx="3" />
          <rect x="473" y="118" width="14" height="35" rx="3" />
          {/* Hood - wide and muscular */}
          <path d="M120 210 L140 170 L200 155 L350 148 L500 155 L560 170 L580 210 L575 230 L125 230 Z" />
          {/* Hood center vents */}
          <rect x="290" y="158" width="120" height="8" rx="4" fill="rgba(0,20,60,0.5)" />
          <rect x="310" y="170" width="80" height="6" rx="3" fill="rgba(0,20,60,0.5)" />
          {/* Grille opening */}
          <path d="M200 230 L500 230 L510 270 L190 270 Z" fill="rgba(0,10,30,0.8)" />
          {/* Grille bars */}
          <line x1="200" y1="240" x2="500" y2="240" stroke="rgba(180,210,255,0.3)" strokeWidth="2" />
          <line x1="200" y1="250" x2="500" y2="250" stroke="rgba(180,210,255,0.3)" strokeWidth="2" />
          <line x1="200" y1="260" x2="500" y2="260" stroke="rgba(180,210,255,0.3)" strokeWidth="2" />
          {/* Front bumper / lower body */}
          <path d="M155 270 L180 250 L195 270 L505 270 L520 250 L545 270 L570 290 L560 310 L430 320 L350 322 L270 320 L140 310 L130 290 Z" />
          {/* Splitter */}
          <path d="M160 305 L540 305 L535 318 L165 318 Z" fill="rgba(0,10,30,0.6)" />
          {/* Left headlight assembly */}
          <path d="M130 200 L200 190 L210 225 L125 230 Z" fill="rgba(200,225,255,0.95)" />
          {/* Left headlight inner glow */}
          <ellipse cx="165" cy="210" rx="28" ry="14"
            fill="rgba(255,255,255,1)"
            style={{ filter: 'blur(2px)' }}
          />
          <ellipse cx="165" cy="210" rx="18" ry="9" fill="white" />
          {/* Left DRL strip */}
          <path d="M130 198 L200 188 L202 194 L132 204 Z" fill="rgba(255,255,255,0.9)" />

          {/* Right headlight assembly */}
          <path d="M570 200 L500 190 L490 225 L575 230 Z" fill="rgba(200,225,255,0.95)" />
          {/* Right headlight inner glow */}
          <ellipse cx="535" cy="210" rx="28" ry="14"
            fill="rgba(255,255,255,1)"
            style={{ filter: 'blur(2px)' }}
          />
          <ellipse cx="535" cy="210" rx="18" ry="9" fill="white" />
          {/* Right DRL strip */}
          <path d="M570 198 L500 188 L498 194 L568 204 Z" fill="rgba(255,255,255,0.9)" />

          {/* Front fenders - left */}
          <path d="M100 190 L125 160 L190 155 L200 190 L130 200 Z" />
          {/* Front fenders - right */}
          <path d="M600 190 L575 160 L510 155 L500 190 L570 200 Z" />

          {/* Side mirrors */}
          <path d="M108 165 L88 170 L86 178 L108 175 Z" />
          <path d="M592 165 L612 170 L614 178 L592 175 Z" />

          {/* Wheel arches outline */}
          <path d="M90 285 Q90 330 130 335 Q175 340 200 310 L200 285 Z" fill="rgba(0,10,30,0.7)" />
          <path d="M610 285 Q610 330 570 335 Q525 340 500 310 L500 285 Z" fill="rgba(0,10,30,0.7)" />

          {/* Wheels */}
          <circle cx="148" cy="318" r="38" fill="rgba(20,35,60,0.9)" stroke="rgba(180,210,255,0.6)" strokeWidth="2" />
          <circle cx="148" cy="318" r="26" fill="rgba(40,60,100,0.8)" stroke="rgba(180,210,255,0.4)" strokeWidth="1" />
          <circle cx="148" cy="318" r="12" fill="rgba(180,210,255,0.9)" />
          {/* Left wheel spokes */}
          {[0,60,120,180,240,300].map((angle, i) => (
            <line key={i}
              x1={148 + Math.cos(angle * Math.PI / 180) * 12}
              y1={318 + Math.sin(angle * Math.PI / 180) * 12}
              x2={148 + Math.cos(angle * Math.PI / 180) * 26}
              y2={318 + Math.sin(angle * Math.PI / 180) * 26}
              stroke="rgba(180,210,255,0.5)" strokeWidth="3"
            />
          ))}

          <circle cx="552" cy="318" r="38" fill="rgba(20,35,60,0.9)" stroke="rgba(180,210,255,0.6)" strokeWidth="2" />
          <circle cx="552" cy="318" r="26" fill="rgba(40,60,100,0.8)" stroke="rgba(180,210,255,0.4)" strokeWidth="1" />
          <circle cx="552" cy="318" r="12" fill="rgba(180,210,255,0.9)" />
          {/* Right wheel spokes */}
          {[0,60,120,180,240,300].map((angle, i) => (
            <line key={i}
              x1={552 + Math.cos(angle * Math.PI / 180) * 12}
              y1={318 + Math.sin(angle * Math.PI / 180) * 12}
              x2={552 + Math.cos(angle * Math.PI / 180) * 26}
              y2={318 + Math.sin(angle * Math.PI / 180) * 26}
              stroke="rgba(180,210,255,0.5)" strokeWidth="3"
            />
          ))}

          {/* Ground shadow */}
          <ellipse cx="350" cy="368" rx="220" ry="12" fill="rgba(74,158,255,0.08)" />
          {/* Mustang logo on grille - pony */}
          <text x="350" y="258" textAnchor="middle" fontSize="18" fill="rgba(180,210,255,0.8)" fontFamily="serif">🐎</text>
        </g>

        {/* Headlight glow effects */}
        <ellipse cx="165" cy="210" rx="35" ry="20" fill="rgba(255,255,255,0.15)" style={{ filter: 'blur(8px)' }} />
        <ellipse cx="535" cy="210" rx="35" ry="20" fill="rgba(255,255,255,0.15)" style={{ filter: 'blur(8px)' }} />
      </svg>
    </div>
  )
}
