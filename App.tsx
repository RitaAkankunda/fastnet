
import React, { useState } from 'react';
import { PortalSettings, Package } from './types';
import { PACKAGES } from './constants';
import PortalPreview from './components/PortalPreview';

const App: React.FC = () => {
  const [packages] = useState<Package[]>(PACKAGES);
  const [settings] = useState<PortalSettings>({
    networkName: 'FASTNET',
    tagline: 'High-Speed Fiber Wi-Fi',
    primaryColor: '#1e3a8a',
    accentColor: '#facc15',
    currency: 'UGX',
    showVoucher: true,
    backendUrl: 'http://localhost:4000'
  });

  return (
    <div className="app-root">
      <div className="container">

        <div className="badge">
          <span className="dot"></span>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Live Portal Preview
          </span>
        </div>

        <div className="preview">
          <PortalPreview settings={settings} packages={packages} />
        </div>

      </div>

      <div className="footer">FASTNET Captive • Ready for RouterOS 7+</div>
    </div>
  );
};

export default App;
