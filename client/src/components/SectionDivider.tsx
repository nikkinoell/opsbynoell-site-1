import { useScrollReveal } from '@/hooks/useScrollReveal'

export function SectionDivider() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}
    >
      <div
        style={{
          width: isVisible ? '60px' : '0px',
          height: '1px',
          background: 'rgba(167,139,250,0.25)',
          transition: 'width 0.8s ease-out',
        }}
      />
    </div>
  )
}
