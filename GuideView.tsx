
import React from 'react';

const GuideView: React.FC = () => {
  const steps = [
    {
      title: "1. Prepare the Assets",
      content: "Download or copy the generated login.html source code from the 'Login.html Source' tab. Save it as 'login.html' on your computer."
    },
    {
      title: "2. Connect via WinBox",
      content: "Open WinBox and connect to your MikroTik router. Go to the 'Files' menu in the left sidebar."
    },
    {
      title: "3. Upload Files",
      content: "Find the 'hotspot' folder in the Files list. Drag and drop your 'login.html' file into this folder. If a file already exists, replace it."
    },
    {
      title: "4. Configure Hotspot",
      content: "Go to IP > Hotspot > Server Profiles. Double click your active profile and ensure 'HTML Directory' is set to 'hotspot'."
    },
    {
      title: "5. Setup Backend API",
      content: "Since MikroTik cannot process payments directly, you need a small external server (PHP/Python/Node) to listen for payment callbacks from MTN/Airtel and then create the user on the router via API."
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Quick Deployment</h2>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg border-2 border-blue-200">
              {index + 1}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-yellow-50 rounded-2xl border border-yellow-100 flex items-start space-x-4">
        <div className="text-yellow-600 text-2xl">⚠️</div>
        <div>
          <h4 className="font-bold text-yellow-800">Security Reminder</h4>
          <p className="text-sm text-yellow-700">Protect your MikroTik API: use a strong password and restrict access to your backend server IP only.</p>
        </div>
      </div>
    </div>
  );
};

export default GuideView;
