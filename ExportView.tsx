
import React from 'react';

const ExportView: React.FC = () => {
  const portalCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>FASTNET - Connect to Wi-Fi</title>
    <style>
        :root { --p: #1e3a8a; --s: #facc15; --bg: #f8fafc; }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { font-family: -apple-system, system-ui, sans-serif; background: var(--bg); color: #334155; line-height: 1.5; }
        .container { max-width: 400px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 30px 0; }
        .logo { font-size: 38px; font-weight: 900; color: var(--p); letter-spacing: -2px; font-style: italic; }
        .sub-logo { font-size: 10px; font-weight: 700; color: #3b82f6; letter-spacing: 4px; text-transform: uppercase; margin-top: -5px; }
        
        .card { background: white; border-radius: 20px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 20px; border: 1px solid #e2e8f0; }
        .pkg { display: flex; justify-content: space-between; align-items: center; padding: 15px; border: 2px solid #f1f5f9; border-radius: 15px; margin-bottom: 12px; cursor: pointer; transition: 0.2s; }
        .pkg:active { transform: scale(0.98); border-color: var(--s); }
        .pkg-name { font-weight: 700; font-size: 16px; }
        .pkg-time { font-size: 12px; color: #64748b; }
        .pkg-price { background: var(--s); color: var(--p); padding: 5px 12px; border-radius: 20px; font-weight: 800; font-size: 13px; }
        
        .btn { display: block; width: 100%; border: none; padding: 16px; border-radius: 15px; font-size: 16px; font-weight: 700; text-align: center; cursor: pointer; transition: 0.2s; }
        .btn-p { background: var(--p); color: white; box-shadow: 0 10px 15px -3px rgba(30,58,138,0.3); }
        .btn-s { background: var(--s); color: var(--p); }
        
        .form-group { margin-bottom: 15px; }
        .label { display: block; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 5px; color: #94a3b8; }
        input { width: 100%; padding: 14px; border-radius: 12px; border: 2px solid #e2e8f0; font-size: 16px; outline: none; transition: 0.2s; }
        input:focus { border-color: var(--p); }
        
        .hidden { display: none; }
        .error { color: #ef4444; font-size: 12px; margin-top: 10px; text-align: center; font-weight: 600; }
        
        .loading-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.9); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 100; }
        .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid var(--p); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div id="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p style="margin-top: 15px; font-weight: 700; color: var(--p);">Processing Payment...</p>
    </div>

    <div class="container">
        <div class="header">
            <div class="logo">FASTNET</div>
            <div class="sub-logo">High-Speed Wi-Fi</div>
        </div>

        <!-- View 1: Package Selection -->
        <div id="v-packages" class="card">
            <div style="text-align:center; margin-bottom:20px; color:var(--p); font-size:14px; font-weight:600;">Choose an Internet Plan</div>
            <div class="pkg" onclick="selectPkg('Daily Pass', 1000, '24 Hours')">
                <div><div class="pkg-name">Daily Pass</div><div class="pkg-time">24 Hours</div></div>
                <div class="pkg-price">1,000 UGX</div>
            </div>
            <div class="pkg" onclick="selectPkg('3-Day Special', 2500, '72 Hours')">
                <div><div class="pkg-name">3-Day Special</div><div class="pkg-time">72 Hours</div></div>
                <div class="pkg-price">2,500 UGX</div>
            </div>
            <div class="pkg" onclick="selectPkg('Weekly Pass', 6000, '7 Days')">
                <div><div class="pkg-name">Weekly Pass</div><div class="pkg-time">7 Days</div></div>
                <div class="pkg-price">6,000 UGX</div>
            </div>
            <div class="pkg" onclick="selectPkg('Monthly Premium', 25000, '30 Days')">
                <div><div class="pkg-name">Monthly Premium</div><div class="pkg-time">30 Days</div></div>
                <div class="pkg-price">25,000 UGX</div>
            </div>
            <div style="text-align: center; margin-top: 15px;">
                <a href="#" onclick="showVoucher()" style="font-size: 13px; color: #64748b; text-decoration: none;">Use a Voucher Code</a>
            </div>
        </div>

        <!-- View 2: Payment Form -->
        <div id="v-pay" class="card hidden">
            <div style="background: var(--p); color: white; padding: 15px; border-radius: 12px; margin-bottom: 20px;">
                <div style="font-size: 11px; text-transform: uppercase; opacity: 0.7;">Selected Plan</div>
                <div id="sel-name" style="font-weight: 800; font-size: 18px;">Daily Pass</div>
                <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                    <span style="font-size: 12px;">Total:</span>
                    <span id="sel-price" style="font-weight: 900; color: var(--s);">1,000 UGX</span>
                </div>
            </div>

            <div class="form-group">
                <span class="label">Phone Number (MTN/Airtel)</span>
                <input type="tel" id="phone" placeholder="07xx xxx xxx">
            </div>
            
            <button class="btn btn-p" onclick="initPay()">Pay with Mobile Money</button>
            <button class="btn" style="margin-top:10px; color:#94a3b8; font-size:13px;" onclick="location.reload()">Cancel</button>
        </div>

        <!-- View 3: Voucher Login -->
        <div id="v-voucher" class="card hidden">
            <div style="text-align:center; margin-bottom:20px; font-weight:700;">Enter Voucher Code</div>
            <form name="login" action="$(link-login)" method="post">
                <input type="hidden" name="dst" value="$(link-orig)" />
                <input type="hidden" name="popup" value="true" />
                <div class="form-group">
                    <input type="text" name="username" placeholder="Voucher Code" style="text-align:center; font-family:monospace; text-transform:uppercase;">
                    <input type="hidden" name="password" value="FASTNET">
                </div>
                <button type="submit" class="btn btn-s">Connect to Internet</button>
            </form>
            <button class="btn" style="margin-top:10px; color:#94a3b8; font-size:13px;" onclick="location.reload()">Back</button>
        </div>

        <div class="error">$(if error)$(error)$(endif)</div>
    </div>

    <script>
        function selectPkg(name, price, time) {
            document.getElementById('sel-name').innerText = name;
            document.getElementById('sel-price').innerText = price.toLocaleString() + ' UGX';
            document.getElementById('v-packages').classList.add('hidden');
            document.getElementById('v-pay').classList.remove('hidden');
        }
        function showVoucher() {
            document.getElementById('v-packages').classList.add('hidden');
            document.getElementById('v-voucher').classList.remove('hidden');
        }
        function initPay() {
            var phone = document.getElementById('phone').value;
            if (phone.length < 10) { alert('Please enter a valid phone number'); return; }
            document.getElementById('loading').style.display = 'flex';
            
            // NOTE: Replace with your actual Payment API Endpoint
            // Example: fetch('https://your-api.com/pay', { method: 'POST', body: JSON.stringify({phone: phone, pkg: '...' }) })
            
            setTimeout(function() {
                alert('In a real setup, you would now get a PIN prompt on your phone!');
                document.getElementById('loading').style.display = 'none';
            }, 3000);
        }
    </script>
</body>
</html>`;

  const copyCode = () => {
    navigator.clipboard.writeText(portalCode);
    alert('Portal code copied!');
  };

  return (
    <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Portal HTML Source</h2>
                    <p className="text-slate-600 text-sm">Copy this lightweight HTML and save as <span className="font-mono bg-slate-100 px-1 rounded">login.html</span> for your hotspot.</p>
                </div>
        <button 
          onClick={copyCode}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-md active:scale-95"
        >
          Copy All Code
        </button>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none rounded-2xl"></div>
        <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl h-[500px] overflow-auto font-mono text-xs leading-relaxed border-2 border-slate-800">
          {portalCode}
        </pre>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-700 text-xs uppercase mb-2">Lightweight</h4>
            <p className="text-slate-500 text-xs">Only ~6KB of code. Perfect for MikroTik storage.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-700 text-xs uppercase mb-2">Variables Included</h4>
            <p className="text-slate-500 text-xs">Supports $(link-login), $(error), and $(link-orig) tags.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-700 text-xs uppercase mb-2">Responsive</h4>
            <p className="text-slate-500 text-xs">Optimized for low-end mobile devices and browsers.</p>
        </div>
      </div>
    </div>
  );
};

export default ExportView;
