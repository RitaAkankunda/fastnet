
import React, { useState } from 'react';
import { Package, PortalSettings } from './types';

interface Props {
  settings: PortalSettings;
  packages: Package[];
}

const PortalPreview: React.FC<Props> = ({ settings, packages }) => {
  const [view, setView] = useState<'selection' | 'payment' | 'processing' | 'success' | 'voucher'>('selection');
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [selectedProvider, setSelectedProvider] = useState<'airtel' | 'mtn' | null>(null);
  const [phone, setPhone] = useState('');
   const [voucherCode, setVoucherCode] = useState('');

  const handlePay = () => {
    if (!phone) return alert('Please enter a phone number');
    if (!selectedProvider) return alert('Please select your payment method (Airtel or MTN)');
    setView('processing');
    setTimeout(() => setView('success'), 2200);
  };

  const reset = () => {
    setView('selection');
    setPhone('');
    setSelectedProvider(null);
  };

  return (
    <div className="phone-area">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="relative z-10 animate-scaleIn">
        <div className="phone-frame">
          <div className="phone-display">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.25))', pointerEvents: 'none' }}></div>
            <div className="phone-inner">

              <div className="status-row">
                 <div className="network-badge">
                    <div className="network-icon" style={{ background: 'linear-gradient(135deg,#facc15,#f59e0b)' }}>
                       <span style={{ fontSize: 18, fontWeight: 900, color: '#000' }}>⚡</span>
                    </div>
                    <div>
                       <div style={{ fontSize: 14, fontWeight: 900, fontStyle: 'italic' }}>{settings.networkName}</div>
                       <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>KAMPALA #1 HOTSPOT</div>
                    </div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, marginBottom: 6 }} aria-hidden>
                                 {[1,2,3,4].map(i => <div key={i} style={{ width:6, height:16, background: 'linear-gradient(180deg,#facc15,#f59e0b)', borderRadius:3 }}></div>)}
                              </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap:6 }}>
                      <div style={{ width:8, height:8, background:'#34d399', borderRadius:99 }}></div>
                      <div style={{ fontSize:9, fontWeight:900, color:'#34d399', textTransform:'uppercase', letterSpacing:'0.18em' }}>Excellent</div>
                    </div>
                 </div>
              </div>

              {view === 'selection' && (
                <div className="animate-fadeIn" style={{ display:'flex', flexDirection:'column', height:'100%' }}>
                  <div style={{ marginBottom: 24 }}>
                     <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 12px', background:'rgba(0,0,0,0.4)', border:'1px solid rgba(250,204,21,0.12)', borderRadius:999, marginBottom:12 }}>
                        <span style={{ width:6, height:6, background:'#facc15', borderRadius:99, boxShadow:'0 0 8px rgba(250,204,21,0.18)' }}></span>
                        <span style={{ fontSize:11, fontWeight:900, color:'#facc15', textTransform:'uppercase', letterSpacing:'0.12em' }}>Fiber Node • 10Gbps Active</span>
                     </div>
                     <h2 className="title">FAST<br/><span style={{ color:'#facc15' }}>NET.</span></h2>
                     <p className="subtitle">{settings.tagline}</p>
                  </div>

                           <div className="pkg-list">
                              {packages.map((pkg, idx) => (
                                 <button
                                    key={pkg.id}
                                    onClick={() => { setSelectedPackage(pkg); setView('payment'); }}
                                    className="pkg-card"
                                    aria-label={`Select plan ${pkg.name} for ${pkg.price.toLocaleString()} ${settings.currency}`}
                                 >
                        <div className="meta">
                           <div style={{ paddingRight: 12, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                              <div style={{ fontSize:9, fontWeight:900, textTransform:'uppercase', color:'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginBottom:6 }}>{pkg.name.split(' ')[0]}</div>
                              <div style={{ fontSize:11, fontWeight:900 }}>{pkg.uptime.toUpperCase()}</div>
                           </div>
                           <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
                              <div className="pkg-price">{pkg.price.toLocaleString()}</div>
                              <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.12em' }}>{settings.currency}</div>
                           </div>
                        </div>
                        {idx === 1 && (
                          <div style={{ background:'#facc15', color:'#000', padding: '6px 8px', borderRadius:999, fontSize:10, fontWeight:900, letterSpacing: '0.06em' }}>Best Value</div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16, paddingBottom: 8 }}>
                              <button onClick={() => setView('voucher')} style={{ width:'100%', background:'transparent', color:'rgba(255,255,255,0.4)', fontWeight:900, letterSpacing:'0.18em', padding:'12px 0', border:'none', cursor:'pointer' }} aria-label="Use a voucher code">Using a Voucher?</button>
                  </div>
                </div>
              )}

              {view === 'payment' && (
                <div className="animate-slideIn" style={{ display:'flex', flexDirection:'column', height:'100%' }}>
                  <button onClick={() => setView('selection')} style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.18em', marginBottom:18, background:'none', border:'none', cursor:'pointer' }} aria-label="Back to plans">← Back to Plans</button>
                  
                  <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:24, padding:18, border:'1px solid rgba(255,255,255,0.04)', marginBottom:18 }}>
                     <div style={{ fontSize:10, fontWeight:900, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', marginBottom:8, letterSpacing:'0.14em' }}>Checkout Plan</div>
                     <h3 style={{ fontSize:24, fontWeight:900, fontStyle:'italic', marginBottom:8 }}>{selectedPackage.name}</h3>
                     <div style={{ display:'flex', alignItems:'baseline', gap:8, color:'#facc15', fontWeight:900, fontSize:26 }}>
                        <span>{selectedPackage.price.toLocaleString()}</span>
                        <span style={{ fontSize:10, textTransform:'uppercase', opacity:0.6 }}>{settings.currency}</span>
                     </div>
                  </div>

                  <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                     <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        <label style={{ fontSize:9, fontWeight:900, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.12em' }}>1. Your Number</label>
                        <input 
                           type="tel" 
                           placeholder="07XX XXX XXX" 
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           className="input-large"
                        />
                     </div>

                     <div>
                        <label style={{ fontSize:9, fontWeight:900, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.12em', display:'block', marginBottom:8 }}>2. Payment Method</label>
                        <div className="provider-grid">
                                       <button 
                                          onClick={() => setSelectedProvider('airtel')}
                                          className={`provider-btn ${selectedProvider === 'airtel' ? 'selected' : ''}`}
                                          aria-pressed={selectedProvider === 'airtel'}
                                          aria-label="Pay with Airtel"
                                       >
                             <div style={{ height:56, width:56, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8, background:'#fff', borderRadius:8 }}>
                                <img
                                   src="/assets/airtel.png"
                                   onError={(e: any) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/airtel.svg'; }}
                                   style={{ maxHeight:'100%', maxWidth:'100%', objectFit: 'contain' }}
                                   alt="Airtel"
                                />
                             </div>
                             <span style={{ fontSize:10, fontWeight:900, textTransform:'uppercase' }}>Airtel</span>
                          </button>
                                       <button 
                                          onClick={() => setSelectedProvider('mtn')}
                                          className={`provider-btn ${selectedProvider === 'mtn' ? 'selected' : ''}`}
                                          aria-pressed={selectedProvider === 'mtn'}
                                          aria-label="Pay with MTN"
                                       >
                             <div style={{ height:56, width:56, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8, background:'#fff', borderRadius:8 }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/512px-MTN_Logo.svg.png" style={{ maxHeight:'100%', maxWidth:'100%' }} alt="MTN" />
                             </div>
                             <span style={{ fontSize:10, fontWeight:900, textTransform:'uppercase' }}>MTN Momo</span>
                          </button>
                        </div>
                     </div>

                               <button 
                                  onClick={handlePay}
                                  disabled={!phone || !selectedProvider}
                                  className="cta-btn"
                                  style={{ marginTop: 8 }}
                                  aria-label="Activate plan and pay"
                               >
                                  Instant Activation
                               </button>
                  </div>
                </div>
              )}

              {view === 'processing' && (
                 <div className="flex-1 flex flex-col items-center justify-center animate-fadeIn text-center" role="status" aria-live="polite">
                    <div className="spin" style={{ marginBottom: 28 }} aria-hidden></div>
                    <h3 style={{ fontSize:20, fontWeight:900, fontStyle:'italic', marginBottom:10 }}>{settings.backendUrl ? 'Contacting Server...' : 'Requesting...'}</h3>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em' }}>Enter your PIN on the prompt we just sent</p>
                 </div>
              )}

              {view === 'success' && (
                         <div className="flex-1 flex flex-col items-center justify-center animate-scaleIn text-center" role="status" aria-live="polite">
                              <div style={{ width:96, height:96, background:'#34d399', color:'#000', borderRadius:999, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, fontWeight:900, marginBottom:20, boxShadow:'0 24px 60px rgba(52,211,153,0.16)' }} aria-hidden>✓</div>
                              <h3 style={{ fontSize:28, fontWeight:900, fontStyle:'italic', marginBottom:8 }}>Success!</h3>
                              <p style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:18 }}>Connected to {settings.networkName}</p>
                              <button 
                                 onClick={reset}
                                 style={{ background:'#fff', color:'#000', padding:'12px 36px', borderRadius:18, fontWeight:900, letterSpacing:'0.12em', cursor:'pointer', boxShadow:'0 18px 48px rgba(0,0,0,0.18)' }}
                                 aria-label="Start browsing now"
                              >
                                 Start Browsing
                              </button>
                         </div>
              )}

              {view === 'voucher' && (
                 <div className="animate-slideIn" style={{ display:'flex', flexDirection:'column', height:'100%' }}>
                    <button onClick={() => setView('selection')} style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontWeight:900, textTransform:'uppercase', marginBottom:18, border:'none', background:'none', cursor:'pointer' }}>← Back</button>
                    <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:36, padding:24, textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.35)' }}>
                       <div style={{ marginBottom:18 }}>
                          <span style={{ fontSize:28, display:'block', marginBottom:8 }}>🎟️</span>
                          <div style={{ fontSize:11, fontWeight:900, textTransform:'uppercase', letterSpacing:'0.13em', color:'rgba(255,255,255,0.9)' }}>Voucher Activation</div>
                       </div>
                          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                          <div>
                             <label style={{ fontSize:9, fontWeight:900, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.12em', display:'block', marginBottom:8 }}>Ticket Code</label>
                             <input
                                type="text"
                                placeholder="XXXX-XXXX"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                style={{ width:'100%', padding:'14px', borderRadius:18, background:'transparent', border:'1px solid rgba(255,255,255,0.06)', fontFamily:'monospace', fontWeight:900, fontSize:20, textAlign:'center', color:'#facc15' }}
                             />
                          </div>
                          <button
                             onClick={() => {
                                if (!voucherCode || voucherCode.trim().length < 4) {
                                   return alert('Enter a valid ticket code');
                                }
                                setView('processing');
                                // simulate verification delay
                                setTimeout(() => setView('success'), 1200);
                             }}
                             style={{ width:'100%', background:'#fff', color:'#000', padding:'14px', borderRadius:16, fontWeight:900, cursor:'pointer', boxShadow:'0 18px 48px rgba(0,0,0,0.18)' }}
                          >
                             Verify Ticket
                          </button>
                       </div>
                    </div>
                 </div>
              )}

            </div>
            
            <div className="h-1.5 w-32 bg-white/10 rounded-full mx-auto mb-4 shrink-0 relative z-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalPreview;
