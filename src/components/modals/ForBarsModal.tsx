import { Modal } from './Modal'
import { useApp } from '../../context/AppContext'

export const ForBarsModal = () => {
  const { showForBarsModal, setShowForBarsModal } = useApp()

  return (
    <Modal isOpen={showForBarsModal} onClose={() => setShowForBarsModal(false)}>
      <div className="modal-body about-content">
        <h2>List Your Bar on Bula Board</h2>
        <p>Reach thousands of kava enthusiasts in the St. Petersburg and Clearwater area.</p>
        <h3>What's Included</h3>
        <ul>
          <li>Free listing with hours, address, and description</li>
          <li>Promote your events and specials</li>
          <li>Reach a targeted local audience</li>
        </ul>
        <h3>Get Started</h3>
        <p>Email us at <strong>hello@bulaboard.com</strong> to add your bar to our directory.</p>
      </div>
    </Modal>
  )
}
