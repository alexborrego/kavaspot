interface FilterChip {
  label: string
  value: string
  icon?: string
}

interface FilterChipsProps {
  chips: FilterChip[]
  activeValue: string
  onChange: (value: string) => void
  label?: string
}

export const FilterChips: React.FC<FilterChipsProps> = ({ chips, activeValue, onChange, label }) => {
  return (
    <div className="filter-chips">
      {label && <span className="filter-chips-label">{label}</span>}
      <div className="filter-chips-container">
        {chips.map((chip) => (
          <button
            key={chip.value}
            className={`filter-chip ${activeValue === chip.value ? 'active' : ''}`}
            onClick={() => onChange(chip.value)}
          >
            {chip.icon && <span className="filter-chip-icon">{chip.icon}</span>}
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
