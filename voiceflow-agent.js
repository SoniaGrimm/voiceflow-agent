// voiceflow-agent.js
function initVoiceflowWithAgent() {
  // Lire le paramètre de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const agentCode = urlParams.get('agent') || '1';
  
  console.log('Initialisation avec agent:', agentCode);
  
  // Charger Voiceflow
  const script = document.createElement('script');
  script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
  script.type = 'text/javascript';
  script.onload = function() {
    window.voiceflow.chat.load({
      verify: { projectID: '68a6e2cc67f49328386b3766' },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production',
      voice: {
        url: "https://runtime-api.voiceflow.com"
      }
    });
    
    // Attendre et envoyer le code
    setTimeout(() => {
      window.voiceflow.chat.open();
      setTimeout(() => {
        window.voiceflow.chat.interact({
          type: 'text',
          payload: agentCode
        });
      }, 2000);
    }, 3000);
  };
  document.head.appendChild(script);
}

// Lancer au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVoiceflowWithAgent);
} else {
  initVoiceflowWithAgent();
}
