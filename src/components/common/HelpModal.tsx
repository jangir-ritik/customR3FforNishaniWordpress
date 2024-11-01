import React from 'react'

function HelpModal({ setShowHelp }: { setShowHelp: (show: boolean) => void }) {
  return (
    <div className="tdt-help-modal">
      <div className="tdt-help-content">
            <h3 className='tdt-help-content-title'>How to use the 3D viewer</h3>
            <ul className='tdt-help-content-list'>
              <li>🖱️ Left click + drag to rotate</li>
              <li>🖱️ Right click + drag to pan</li>
              <li>⚲ Scroll wheel to zoom in/out</li>
            </ul>
            <button onClick={() => setShowHelp(false)}>Got it!</button>
          </div>
        </div>
  )
}

export default HelpModal