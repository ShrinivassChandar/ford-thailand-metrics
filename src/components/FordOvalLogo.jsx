export default function FordOvalLogo({ width = 220, glow = false }) {
  return (
    <img
      src="/Ford_logo_flat.svg"
      alt="Ford"
      width={width}
      style={{ width: '220px', filter: glow ? 'drop-shadow(0 0 25px rgba(255,255,255,0.6)) drop-shadow(0 0 50px rgba(255,255,255,0.3))' : 'none' }}
    />
  )
}
