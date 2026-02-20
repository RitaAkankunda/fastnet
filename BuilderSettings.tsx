
import React from 'react';
import { PortalSettings, Package } from '../types';

interface Props {
  settings: PortalSettings;
  setSettings: (s: PortalSettings) => void;
  packages: Package[];
  setPackages: (p: Package[]) => void;
}

const BuilderSettings: React.FC<Props> = ({ settings, setSettings, packages, setPackages }) => {
  const updatePackage = (index: number, field: keyof Package, value: string | number) => {
    const newPkgs = [...packages];
    newPkgs[index] = { ...newPkgs[index], [field]: value };
    setPackages(newPkgs);
  };

  const generateCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${settings.networkName} - Wi-Fi</title>
    <style>
        :root { --p: #facc15; --bg: #0a0a0a; --card: rgba(255,255,255,0.05); }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { font-family: -apple-system, system-ui, sans-serif; background: var(--bg); color: #fff; min-height: 100vh; }
        .container { max-width: 400px; margin: 0 auto; padding: 25px; min-height: 100vh; display: flex; flex-direction: column; }
        
        .header { display: flex; justify-content: space-between; align-items: center; padding: 15px 0 35px; }
        .brand { display: flex; align-items: center; }
        .logo-box { width: 38px; height: 38px; background: linear-gradient(135deg, var(--p), #fbbf24); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: black; font-weight: 900; margin-right: 12px; box-shadow: 0 8px 16px rgba(250,204,21,0.2); }
        .logo-txt { font-weight: 900; font-style: italic; font-size: 16px; letter-spacing: -1px; line-height: 1; }
        .logo-sub { font-size: 7px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
        
        .hero { margin-bottom: 35px; }
        .badge { display: inline-flex; align-items: center; padding: 5px 14px; background: rgba(0,0,0,0.6); border: 1px solid rgba(250,204,21,0.25); border-radius: 20px; font-size: 8px; font-weight: 900; text-transform: uppercase; color: var(--p); letter-spacing: 2px; margin-bottom: 25px; }
        .hero h1 { font-size: 56px; font-weight: 900; font-style: italic; line-height: 0.85; letter-spacing: -3px; margin-bottom: 18px; }
        .hero p { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5); line-height: 1.6; max-width: 220px; }

        .packages { margin-bottom: 30px; }
        .pkg { display: flex; justify-content: space-between; align-items: center; padding: 22px; border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; background: var(--card); margin-bottom: 14px; cursor: pointer; transition: 0.2s cubic-bezier(0.1, 0.7, 0.1, 1); }
        .pkg:active { transform: scale(0.97); background: rgba(255,255,255,0.08); }
        .pkg-info { display: flex; align-items: center; }
        .pkg-meta { border-right: 1px solid rgba(255,255,255,0.1); padding-right: 20px; margin-right: 20px; }
        .pkg-meta-label { font-size: 8px; font-weight: 900; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
        .pkg-meta-val { font-size: 11px; font-weight: 900; color: white; }
        .pkg-price { display: flex; align-items: baseline; }
        .pkg-price-val { font-size: 24px; font-weight: 900; letter-spacing: -1.5px; }
        .pkg-price-curr { font-size: 8px; font-weight: 900; color: rgba(255,255,255,0.3); margin-left: 5px; text-transform: uppercase; letter-spacing: 1px; }
        .pkg-best { background: var(--p); color: black; font-size: 7px; font-weight: 900; text-transform: uppercase; padding: 4px 10px; border-radius: 12px; box-shadow: 0 4px 10px rgba(250,204,21,0.2); }

        .btn { display: block; width: 100%; border: none; padding: 22px; border-radius: 20px; font-size: 12px; font-weight: 900; text-align: center; cursor: pointer; text-transform: uppercase; letter-spacing: 2px; transition: 0.2s; }
        .btn-p { background: var(--p); color: black; box-shadow: 0 12px 24px rgba(250,204,21,0.15); }
        .btn-disabled { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.05); cursor: not-allowed; }
        
        .form-group { margin-bottom: 25px; }
        input { width: 100%; background: black; padding: 22px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); font-size: 22px; font-weight: 900; color: white; outline: none; transition: 0.3s; }
        input:focus { border-color: var(--p); }
        .label { display: block; font-size: 9px; font-weight: 900; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 10px; letter-spacing: 2px; }

        .providers { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
        .provider-btn { background: var(--card); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 18px; text-align: center; cursor: pointer; opacity: 0.5; transition: 0.3s; }
        .provider-btn.selected { opacity: 1; border-color: var(--p); background: rgba(250,204,21,0.08); }
        .provider-btn.airtel.selected { border-color: #ef4444; background: rgba(239,68,68,0.08); }
        .provider-btn .logo-container { height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; padding: 6px; background: white; border-radius: 12px; }
        .provider-btn img { max-height: 100%; max-width: 100%; object-fit: contain; }
        .provider-btn span { display: block; font-size: 8px; font-weight: 900; text-transform: uppercase; color: rgba(255,255,255,0.5); letter-spacing: 1.5px; }

        .footer { margin-top: auto; padding: 25px 0 10px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; }
        .voucher-btn { background: none; border: none; font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 4px; cursor: pointer; width: 100%; padding: 15px; transition: 0.2s; }
        .voucher-btn:hover { color: white; }

        .hidden { display: none; }
        .loader { width: 50px; height: 50px; border: 5px solid rgba(255,255,255,0.05); border-top-color: var(--p); border-radius: 50%; animation: spin 1s linear infinite; margin: 40px auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Hidden Form for MikroTik Auth -->
        <form name="sendin" action="\$(link-login-only)" method="post" style="display:none;">
            <input type="hidden" name="username" />
            <input type="hidden" name="password" value="fastnet" />
            <input type="hidden" name="dst" value="\$(link-orig)" />
            <input type="hidden" name="popup" value="true" />
        </form>

        <!-- View: Package Selection -->
        <div id="v-packages" class="animate-fadeIn">
            <div class="header">
                <div class="brand">
                    <div class="logo-box">⚡</div>
                    <div><div class="logo-txt">${settings.networkName}</div><div class="logo-sub">KAMPALA #1 HOTSPOT</div></div>
                </div>
            </div>
            <div class="hero">
                <div class="badge">Fiber Node • 10Gbps Active</div>
                <h1>FAST<br/><span style="color:var(--p)">NET.</span></h1>
                <p>${settings.tagline}</p>
            </div>
            <div class="packages">
                ${packages.map((p, idx) => `
                <div class="pkg" onclick="selectPkg('${p.name}', ${p.price}, '${p.uptime}')">
                    <div class="pkg-info">
                        <div class="pkg-meta">
                            <div class="pkg-meta-label">${p.name.split(' ')[0]}</div>
                            <div class="pkg-meta-val">${p.uptime.toUpperCase()}</div>
                        </div>
                        <div class="pkg-price">
                            <div class="pkg-price-val">${p.price.toLocaleString()}</div>
                            <div class="pkg-price-curr">${settings.currency}</div>
                        </div>
                    </div>
                    ${idx === 1 ? '<div class="pkg-best">Best Value</div>' : ''}
                </div>`).join('')}
            </div>
            <div class="footer">
                <button class="voucher-btn" onclick="showView('v-voucher')">Using a Voucher?</button>
            </div>
        </div>

        <!-- View: Payment Form -->
        <div id="v-pay" class="hidden animate-fadeIn">
            <button class="label" style="background:none; border:none; color:rgba(255,255,255,0.3); margin-bottom:40px; cursor:pointer;" onclick="location.reload()">← Back to Plans</button>
            <div style="background:var(--card); border: 1px solid rgba(255,255,255,0.1); border-radius:32px; padding:35px; margin-bottom:35px;">
                <div class="label">Plan</div>
                <h2 id="sel-name" style="font-size:32px; font-weight:900; font-style:italic; margin-bottom:10px;">-</h2>
                <div id="sel-price" style="font-size:48px; font-weight:900; color:var(--p);">-</div>
            </div>
            <div class="form-group">
                <div class="label">1. Enter Mobile Number</div>
                <input type="tel" id="phone" placeholder="07XX XXX XXX" oninput="validateForm()">
            </div>
            <div class="label">2. Select Method</div>
            <div class="providers">
                <div id="btn-airtel" class="provider-btn airtel" onclick="setProvider('airtel')">
                    <div class="logo-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtel_logo.png/512px-Airtel_logo.png">
                    </div>
                    <span>Airtel</span>
                </div>
                <div id="btn-mtn" class="provider-btn mtn" onclick="setProvider('mtn')">
                    <div class="logo-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/512px-MTN_Logo.svg.png">
                    </div>
                    <span>MTN Momo</span>
                </div>
            </div>
            <button id="btn-submit" class="btn btn-disabled" onclick="initPay()">Instant Activation</button>
        </div>

        <!-- View: Voucher Form -->
        <div id="v-voucher" class="hidden animate-fadeIn">
            <button class="label" style="background:none; border:none; color:rgba(255,255,255,0.3); margin-bottom:40px; cursor:pointer;" onclick="location.reload()">← Back</button>
            <div style="background:var(--card); border: 1px solid rgba(255,255,255,0.1); border-radius:32px; padding:45px; text-align:center;">
                <div style="font-size:40px; margin-bottom:20px;">🎟️</div>
                <div class="label" style="margin-bottom:25px; color:white;">Voucher Activation</div>
                <form name="login" action="\$(link-login)" method="post">
                    <input type="hidden" name="dst" value="\$(link-orig)" />
                    <input type="hidden" name="popup" value="true" />
                    <div class="form-group">
                        <input type="text" name="username" placeholder="XXXX-XXXX" style="text-align:center; font-family:monospace; margin-bottom:25px; letter-spacing:4px;">
                    </div>
                    <button type="submit" class="btn btn-p">Verify Ticket</button>
                </form>
            </div>
        </div>

        <!-- View: Loading State -->
        <div id="v-loading" class="hidden animate-fadeIn text-center">
            <div style="padding:40px 0;">
                <div class="loader"></div>
                <h3 id="loading-title" style="font-size:28px; font-weight:900; font-style:italic; margin-bottom:15px;">Check Your Phone</h3>
                <p id="loading-desc" style="font-size:13px; color:rgba(255,255,255,0.4); line-height:1.6; padding:0 30px;">We sent a prompt to <span id="disp-phone" style="color:var(--p); font-weight:900;"></span>. Enter your PIN to start browsing.</p>
            </div>
        </div>
    </div>

    <script>
        var selectedProvider = null;
        var backendUrl = "${settings.backendUrl}";
        
        function showView(id) {
            document.querySelectorAll('.animate-fadeIn').forEach(v => v.classList.add('hidden'));
            document.getElementById(id).classList.remove('hidden');
        }
        function setProvider(p) {
            selectedProvider = p;
            document.querySelectorAll('.provider-btn').forEach(b => b.classList.remove('selected'));
            document.getElementById('btn-' + p).classList.add('selected');
            validateForm();
        }
        function validateForm() {
            var phone = document.getElementById('phone').value;
            var btn = document.getElementById('btn-submit');
            if (phone.length >= 10 && selectedProvider) {
                btn.classList.remove('btn-disabled'); btn.classList.add('btn-p');
            } else {
                btn.classList.add('btn-disabled'); btn.classList.remove('btn-p');
            }
        }
        function selectPkg(n, p, u) {
            document.getElementById('sel-name').innerText = n;
            document.getElementById('sel-price').innerText = p.toLocaleString() + ' ${settings.currency}';
            showView('v-pay');
        }
        function initPay() {
            var phone = document.getElementById('phone').value;
            document.getElementById('disp-phone').innerText = phone;
            showView('v-loading');

            if (backendUrl) {
                // REAL CONNECTION: Sending request to your backend
                fetch(backendUrl + '/initiate-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        phone: phone, 
                        provider: selectedProvider, 
                        plan: document.getElementById('sel-name').innerText 
                    })
                })
                .then(r => r.json())
                .then(data => {
                    // Start polling for payment success from backend
                    pollPayment(phone);
                })
                .catch(err => {
                    document.getElementById('loading-title').innerText = "System Error";
                    document.getElementById('loading-desc').innerText = "Connection to payment server failed. Please try again later.";
                });
            } else {
                // DEMO MODE: Auto-submitting after 5 seconds
                setTimeout(function() {
                    var form = document.forms.sendin;
                    form.username.value = phone;
                    form.submit();
                }, 5000);
            }
        }

        function pollPayment(phone) {
            var interval = setInterval(function() {
                fetch(backendUrl + '/check-status?phone=' + phone)
                .then(r => r.json())
                .then(data => {
                    if (data.status === 'SUCCESS') {
                        clearInterval(interval);
                        var form = document.forms.sendin;
                        form.username.value = phone;
                        form.submit();
                    }
                });
            }, 3000);
        }
    <\/script>
</body>
</html>`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    alert('Source code copied to clipboard!');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0">
        
        {/* Left: Configuration Panel */}
        <div className="p-10 border-r border-slate-100 overflow-y-auto max-h-[700px]">
          <h2 className="text-2xl font-black text-slate-800 mb-2">Portal Designer — Customize</h2>
          <p className="text-slate-400 text-sm font-medium mb-8">Tweak your network identity, pricing tiers and backend settings.</p>

          <div className="space-y-8">
            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center">
                <span className="w-4 h-[2px] bg-indigo-600 mr-2"></span>
                Network Identity
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Network Name</label>
                  <input 
                    type="text" 
                    value={settings.networkName} 
                    onChange={e => setSettings({...settings, networkName: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-bold focus:ring-2 ring-indigo-100 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Short Tagline</label>
                  <input 
                    type="text" 
                    value={settings.tagline} 
                    onChange={e => setSettings({...settings, tagline: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-bold focus:ring-2 ring-indigo-100 outline-none transition-all"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center">
                <span className="w-4 h-[2px] bg-indigo-600 mr-2"></span>
                Backend Connection
              </h3>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Backend API URL</label>
                <input 
                  type="url" 
                  placeholder="https://your-api.com"
                  value={settings.backendUrl} 
                  onChange={e => setSettings({...settings, backendUrl: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-bold focus:ring-2 ring-indigo-100 outline-none transition-all"
                />
                <p className="text-[10px] text-slate-400 font-medium">Leave blank for Simulation Mode.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center">
                <span className="w-4 h-[2px] bg-indigo-600 mr-2"></span>
                Package Pricing
              </h3>
              <div className="space-y-3">
                {packages.map((pkg, idx) => (
                  <div key={pkg.id} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100 group">
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-slate-400 mb-1">{pkg.name}</div>
                      <input 
                        type="number" 
                        value={pkg.price} 
                        onChange={e => updatePackage(idx, 'price', parseInt(e.target.value))}
                        className="bg-transparent font-black text-slate-700 outline-none w-full"
                      />
                    </div>
                    <div className="w-24">
                      <div className="text-[10px] font-bold text-slate-400 mb-1">Duration</div>
                      <input 
                        type="text" 
                        value={pkg.uptime} 
                        onChange={e => updatePackage(idx, 'uptime', e.target.value)}
                        className="bg-transparent font-bold text-slate-500 text-xs outline-none w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right: Code Preview Panel */}
        <div className="bg-slate-900 p-0 flex flex-col relative">
           <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950">
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Compiled: login.html</span>
              </div>
              <button 
                onClick={copyCode}
                className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg border border-white/10 transition-all uppercase tracking-tighter"
              >
                Copy Source
              </button>
           </div>
           <pre className="flex-1 p-8 text-xs font-mono text-indigo-300 overflow-auto leading-relaxed custom-scrollbar">
              {generateCode()}
           </pre>
        </div>
      </div>
    </div>
  );
};

export default BuilderSettings;
