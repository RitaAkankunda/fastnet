
import React from 'react';
import { Package, PortalSettings } from '../types';

interface Props {
  settings: PortalSettings;
  packages: Package[];
}

const ScriptView: React.FC<Props> = ({ settings, packages }) => {
  const getScripts = () => {
    let script = `# --- FASTNET AUTO-GENERATED CONFIG ---\n`;
    script += `/ip hotspot profile\n`;
    script += `set [ find default=yes ] html-directory=hotspot login-by=http-chap,http-pap\n\n`;
    script += `# User Profiles for each tier\n`;
    
    packages.forEach(pkg => {
      const sanitizedName = pkg.name.replace(/\s+/g, '_').toUpperCase();
      script += `/ip hotspot user profile\n`;
      script += `add name="FN_${sanitizedName}" session-timeout=${pkg.uptime} status-autorefresh=1m idle-timeout=5m\n`;
    });

    script += `\n# Walled Garden for Payment Processing\n`;
    script += `/ip hotspot walled-garden\n`;
    script += `add comment="MTN MoMo API" dst-host=api.mtn.com\n`;
    script += `add comment="Airtel Money API" dst-host=api.airtel.com\n`;
    script += `add comment="Backend API Server" dst-host=your-api-domain.com\n`;
    
    return script;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getScripts());
    alert('RouterOS script copied!');
  };

  return (
    <div className="p-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">RouterOS Configuration</h2>
          <p className="text-slate-400 font-medium">Copy the generated RouterOS script to provision hotspot profiles.</p>
        </div>
        <button 
          onClick={copyToClipboard}
          aria-label="Copy RouterOS configuration to clipboard"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 text-sm uppercase tracking-widest"
        >
          Copy Configuration
        </button>
      </div>

      <div className="flex-1 bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
           <div className="w-20 h-20 border-t-4 border-r-4 border-white rounded-tr-3xl"></div>
        </div>
        <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-auto h-full custom-scrollbar">
          {getScripts()}
        </pre>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex space-x-4">
           <div className="text-2xl">💡</div>
           <div>
              <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">Terminal Hint</p>
              <p className="text-sm text-amber-700 font-medium">Paste this into the WinBox Terminal or SSH session directly.</p>
           </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex space-x-4">
           <div className="text-2xl">⚙️</div>
           <div>
              <p className="text-xs font-black text-indigo-800 uppercase tracking-widest mb-1">Auto-Auth</p>
              <p className="text-sm text-indigo-700 font-medium">Ensure "Trial" mode is disabled for maximum security.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptView;
