import { Modal } from './Modal'
import { useApp } from '../../context/AppContext'

export const AboutModal = () => {
  const { showAboutModal, setShowAboutModal } = useApp()

  return (
    <Modal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)}>
      <div className="modal-body about-content">
        <h2>What is Kava?</h2>
        <p>Kava is a traditional South Pacific beverage made from the roots of the <em>Piper methysticum</em> plant. For centuries, Pacific Island cultures have used kava in ceremonial and social settings.</p>
        <p>When consumed, kava has a <strong>relaxing effect on the body</strong>, eases tension, and alleviates stress while enhancing mental clarity, creativity, and sociability. It's similar to alcohol's calming effects but without the hangover.</p>
        <h3>Popular Drinks</h3>
        <ul>
          <li><strong>Kava Shell</strong> - Traditional preparation, served in coconut shells</li>
          <li><strong>Kava Flight</strong> - Sample multiple varieties</li>
          <li><strong>Botanical Elixirs</strong> - Kava mixed with herbs and flavors</li>
          <li><strong>Kava Tea</strong> - Relaxing herbal tea blend</li>
        </ul>
        <h3>About Bula Board</h3>
        <p>We curate the best kava bars, events, and deals in St. Petersburg and Clearwater. Whether you're a kava connoisseur or trying it for the first time, we've got you covered.</p>
        <p className="about-note">Please drink responsibly. Kava may cause drowsiness. Do not operate heavy machinery after consuming.</p>
      </div>
    </Modal>
  )
}
