interface EmptyStateProps {
  icon: string
  message: string
}

export const EmptyState = ({ icon, message }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <span>{icon}</span>
      <p>{message}</p>
    </div>
  )
}
