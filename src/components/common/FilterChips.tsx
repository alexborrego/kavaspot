interface FilterChip {
  label: string
  value: string
  icon?: string
}

interface FilterChipsProps {
  chips: FilterChip[]
  activeValue: string | string[]
  onChange: (value: string | string[]) => void
  label?: string
  multiSelect?: boolean
}

export const FilterChips: React.FC<FilterChipsProps> = ({ chips, activeValue, onChange, label, multiSelect = false }) => {
  const isActive = (chipValue: string) => {
    if (Array.isArray(activeValue)) {
      return activeValue.includes(chipValue)
    }
    return activeValue === chipValue
  }

  const handleClick = (chipValue: string) => {
    if (multiSelect && Array.isArray(activeValue)) {
      // Handle multiselect
      if (chipValue === 'All') {
        // If "All" is clicked, clear all selections
        onChange(['All'])
      } else {
        // Toggle the chip
        let newValue: string[]
        if (activeValue.includes(chipValue)) {
          // Remove if already selected
          newValue = activeValue.filter(v => v !== chipValue)
          // If nothing selected, default to "All"
          if (newValue.length === 0) {
            newValue = ['All']
          }
        } else {
          // Add to selection and remove "All" if present
          newValue = [...activeValue.filter(v => v !== 'All'), chipValue]
        }
        onChange(newValue)
      }
    } else {
      // Single select
      onChange(chipValue)
    }
  }

  return (
    <div className="filter-chips">
      {label && <span className="filter-chips-label">{label}</span>}
      <div className="filter-chips-container">
        {chips.map((chip) => (
          <button
            key={chip.value}
            className={`filter-chip ${isActive(chip.value) ? 'active' : ''}`}
            onClick={() => handleClick(chip.value)}
          >
            {chip.icon && <span className="filter-chip-icon">{chip.icon}</span>}
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
