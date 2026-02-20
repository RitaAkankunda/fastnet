
import React from 'react';

const PaymentInfoView: React.FC = () => {
  const steps = [
    { title: "TRIGGER", icon: "📱", desc: "User enters number & chooses plan. Portal sends data to Backend API." },
    { title: "PAYMENT", icon: "🔐", desc: "Backend triggers MoMo USSD. User enters PIN on phone. Payment confirmed." },
    { title: "PROVISION", icon: "🛰️", desc: "Backend uses MikroTik API to create a User account matching the phone number." },
    { title: "CONNECT", icon: "🚀", desc: "Portal auto-submits login form. User is instantly connected to high-speed fiber." },
  ];

  const backendCode = `// Sample FASTNET Bridge Backend (Node.js)
const express = require('express');
const RosApi = require('routeros-client').RosApi;
const app = express();

app.post('/initiate-payment', async (req, res) => {
  const { phone, plan, provider } = req.body;
  // 1. Call MTN/Airtel API here (use Beyonic/Flutterwave)
  // 2. Wait for successful callback or poll status
  res.json({ status: 'PENDING', message: 'Prompt sent to phone' });
});

app.get('/check-status', async (req, res) => {
  // If payment success detected:
  const conn = new RosApi({ host: 'YOUR_ROUTER_IP', user: 'admin', password: '...' });
  const api = await conn.connect();
  
  // Create Hotspot User
  await api.write('/ip/hotspot/user/add', [
    '=name=' + req.query.phone,
    '=password=fastnet',
    '=profile=FN_PLAN_NAME'
  ]);
  
  res.json({ status: 'SUCCESS' });
});`;

  return (
    <div className="p-10 flex flex-col h-full bg-white overflow-y-auto custom-scrollbar">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 mb-2 leading-tight">Automated Payment Flow<br/><span className="text-indigo-600 italic">Zero-Touch User Journey</span></h2>
        <p className="text-slate-400 font-medium max-w-lg">How FASTNET moves a user from payment prompt to instant network access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {steps.map((step, idx) => (
          <div key={idx} className="relative group">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all" role="group" aria-labelledby={`step-${idx}`}>
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform" aria-hidden>{step.icon}</div>
               <h4 id={`step-${idx}`} className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">{step.title}</h4>
               <p className="text-xs text-slate-500 font-bold leading-relaxed">{step.desc}</p>
            </div>
            {idx < 3 && (
              <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-slate-200 text-xl font-black">→</div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-black text-slate-800 mb-4">Bridge Backend Template</h3>
        <p className="text-sm text-slate-500 mb-4">This script (Node.js) should run on a VPS to bridge your MikroTik router with the Mobile Money APIs.</p>
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl overflow-hidden">
          <pre className="font-mono text-[10px] text-indigo-300 overflow-x-auto">
            {backendCode}
          </pre>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
          <h3 className="text-xl font-black italic tracking-tighter mb-4 text-yellow-400">Technical Prerequisite</h3>
          <p className="text-sm text-white/60 font-medium mb-6 leading-relaxed">
            Your MikroTik router must be reachable from the internet so your Backend API can send commands to it. You have two options:
          </p>
          <div className="space-y-4">
             <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">1</div>
                <p className="text-xs font-bold">Use a Static Public IP on the router and open Port 8728 (API).</p>
             </div>
             <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">2</div>
                <p className="text-xs font-bold">Use the MikroTik "Cloud" feature (DDNS) to find your router if IP is dynamic.</p>
             </div>
          </div>
        </div>

        <div className="border-2 border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-center">
          <h3 className="text-xl font-black text-slate-800 mb-4">Recommended Aggregators</h3>
          <div className="space-y-3">
            {['Beyonic (Best for Uganda)', 'Flutterwave', 'Yo! Payments', 'Direct MoMo Developer Portal'].map(agg => (
              <div key={agg} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                 <span className="text-sm font-bold text-slate-600">{agg}</span>
                 <span className="text-[8px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full uppercase">Compatible</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoView;
