/**
 * Amstill Roofing — AI Chat Assistant (Demo)
 * Pre-scripted conversational flows with realistic typing delays.
 * No backend required — pure frontend simulation.
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     CONFIGURATION
     ═══════════════════════════════════════════ */
  const CONFIG = {
    botName: 'Amstill Assistant',
    greeting: "Hi there! I'm Amstill's virtual assistant. How can I help you today?",
    typingDelay: { min: 600, max: 1400 },
    messageDelay: 400,
    phone: '(713) 974-1234',
    hours: 'Mon–Sat 7 AM – 7 PM CT',
  };

  /* ═══════════════════════════════════════════
     CONVERSATION FLOWS
     ═══════════════════════════════════════════ */
  const FLOWS = {
    start: {
      options: [
        { label: '🏠 I need a roof repair', value: 'repair' },
        { label: '⛈️ Storm damage — urgent', value: 'storm' },
        { label: '🔍 Get a free inspection', value: 'inspection' },
        { label: '📋 Insurance claim help', value: 'insurance' },
        { label: '💬 Ask a question', value: 'question' },
      ],
    },
    repair: {
      messages: [
        "I'm sorry to hear about the issue! We handle all types of roof repairs — leaks, missing shingles, flashing damage, and more.",
        "Let me connect you with our team so we can get it taken care of quickly.",
      ],
      next: 'collect_name',
    },
    storm: {
      messages: [
        "⚠️ We understand storm damage is stressful — you're in good hands. Amstill has handled thousands of storm damage repairs across Houston.",
        "Is water actively coming into your home right now?",
      ],
      options: [
        { label: 'Yes — water is coming in!', value: 'storm_urgent' },
        { label: 'No — but I see damage', value: 'storm_damage' },
      ],
    },
    storm_urgent: {
      messages: [
        "If water is actively entering your home, please call us directly for emergency service:",
        `📞 ${CONFIG.phone}`,
        "In the meantime, place buckets under the leak and move valuables away from the area. We'll get someone out as soon as possible.",
        "Would you also like us to log your info so a team member follows up?",
      ],
      options: [
        { label: 'Yes, take my info', value: 'collect_name' },
        { label: "I'll call instead", value: 'end_call' },
      ],
    },
    storm_damage: {
      messages: [
        "Got it — we'll want to get an inspector out to assess the damage. Our inspections are completely free, and we work directly with your insurance company.",
        "Let me grab your details so we can schedule a visit.",
      ],
      next: 'collect_name',
    },
    inspection: {
      messages: [
        "Great choice! Our roof inspections are 100% free with no obligation. We'll send a certified inspector to assess your roof's condition and provide a detailed report.",
        "This takes about 30–45 minutes. Let me get your info to schedule it.",
      ],
      next: 'collect_name',
    },
    insurance: {
      messages: [
        "We work with all major insurance carriers and handle the claims process for you — from the initial inspection through final repairs.",
        "As an Owens Corning Platinum Preferred Contractor, our documentation meets the highest standards insurance companies require.",
        "Have you already filed a claim, or would you like us to help you start one?",
      ],
      options: [
        { label: "I've already filed", value: 'insurance_filed' },
        { label: 'Help me start one', value: 'insurance_new' },
      ],
    },
    insurance_filed: {
      messages: [
        "Perfect — we can coordinate directly with your adjuster. We'll schedule a free inspection and prepare the documentation your insurance company needs.",
        "Let me grab your contact info.",
      ],
      next: 'collect_name',
    },
    insurance_new: {
      messages: [
        "No problem — we'll walk you through the entire process. First step is a free inspection so we can document the damage properly before filing.",
        "Let me get your details to set that up.",
      ],
      next: 'collect_name',
    },
    question: {
      messages: ["Of course! What would you like to know?"],
      options: [
        { label: 'How much does a new roof cost?', value: 'q_cost' },
        { label: 'What areas do you serve?', value: 'q_areas' },
        { label: 'How long does a roof last?', value: 'q_lifespan' },
        { label: 'Do you offer financing?', value: 'q_financing' },
      ],
    },
    q_cost: {
      messages: [
        "Roof costs depend on the size of your home, material type, and roof complexity. For a typical Houston home:",
        "• Asphalt shingles: $8,000 – $15,000\n• Metal roofing: $15,000 – $30,000\n• Tile: $20,000 – $40,000",
        "The best way to get an accurate number is our free inspection — no pressure, just an honest assessment.",
      ],
      next: 'offer_inspection',
    },
    q_areas: {
      messages: [
        "We serve the Greater Houston area and Central Texas! Our two locations:",
        "📍 Houston (HQ) — 1430 Campbell Rd, Houston, TX 77079\n📍 Round Rock — 1780 Round Rock Ave, Round Rock, TX 78664",
        "We cover Houston, Katy, Sugar Land, The Woodlands, Cypress, Spring, Pearland, Round Rock, Austin, and surrounding areas.",
      ],
      next: 'offer_inspection',
    },
    q_lifespan: {
      messages: [
        "Great question! It depends on the material and Houston's climate:",
        "• Asphalt (3-tab): 15–20 years\n• Architectural shingles: 25–30 years\n• Metal: 40–70 years\n• Tile/Slate: 50–100 years",
        "Houston's heat, humidity, and storm exposure can accelerate wear. If your roof is 15+ years old, a free inspection can tell you exactly where it stands.",
      ],
      next: 'offer_inspection',
    },
    q_financing: {
      messages: [
        "Yes! We offer flexible financing options to make your roof investment manageable. We work with several lending partners to find the best rate for your situation.",
        "We can go over all the options during your free consultation. Want me to set one up?",
      ],
      options: [
        { label: 'Yes, schedule it', value: 'collect_name' },
        { label: 'Not right now', value: 'end_thanks' },
      ],
    },
    offer_inspection: {
      messages: ["Would you like to schedule a free inspection?"],
      options: [
        { label: 'Yes please!', value: 'collect_name' },
        { label: 'Maybe later', value: 'end_thanks' },
      ],
    },

    /* ── Lead capture sequence ── */
    collect_name: {
      messages: ["What's your name?"],
      input: { placeholder: 'Enter your name...', field: 'name', next: 'collect_phone' },
    },
    collect_phone: {
      messages: ["Thanks, {name}! What's the best phone number to reach you?"],
      input: { placeholder: '(555) 123-4567', field: 'phone', next: 'collect_address' },
    },
    collect_address: {
      messages: ["And what's your street address? (So we know which location to dispatch from)"],
      input: { placeholder: '123 Main St, Houston TX', field: 'address', next: 'confirm' },
    },
    confirm: {
      messages: [
        "✅ Perfect — here's what I have:\n\n📛 {name}\n📞 {phone}\n📍 {address}",
        "A team member will reach out within 2 hours to schedule your appointment. If you need immediate help, call us at " + CONFIG.phone + ".",
        "Thanks for choosing Amstill — 50 years of trusted roofing! 🏠",
      ],
      next: 'end_final',
    },

    /* ── End states ── */
    end_call: {
      messages: [
        `Our team is ready to help: 📞 ${CONFIG.phone}\nHours: ${CONFIG.hours}`,
        "Stay safe, and don't hesitate to reach out!",
      ],
      next: 'end_final',
    },
    end_thanks: {
      messages: [
        "No problem at all! We're here whenever you're ready. You can reach us anytime:",
        `📞 ${CONFIG.phone}\n✉️ info@amstillroofing.com\n🕐 ${CONFIG.hours}`,
        "Have a great day! 👋",
      ],
      next: 'end_final',
    },
    end_final: {
      messages: [],
      options: [{ label: '↩ Start over', value: '_restart' }],
    },
  };

  /* ═══════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════ */
  let isOpen = false;
  let isTyping = false;
  let leadData = {};
  let hasGreeted = false;
  let unreadCount = 0;

  /* ═══════════════════════════════════════════
     BUILD DOM
     ═══════════════════════════════════════════ */
  function injectStyles() {
    const css = document.createElement('style');
    css.textContent = `
/* ── Hide scroll-to-top button (replaced by chatbot) ── */
#scroll-percentage { display: none !important; }

/* ── Chatbot Container ── */
.acb-widget { position: fixed; bottom: 28px; right: 28px; z-index: 99999; font-family: 'Jost', sans-serif; }

/* ── Floating Button ── */
.acb-fab {
  width: 68px; height: 68px; border-radius: 50%; border: none; cursor: pointer;
  background: linear-gradient(135deg, #bc1827 0%, #e63946 100%);
  box-shadow: 0 4px 20px rgba(188,24,39,0.35), 0 0 0 0 rgba(188,24,39,0.25);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  position: relative; overflow: visible;
  animation: acb-pulse 3s ease-in-out infinite;
}
.acb-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(188,24,39,0.45); }
.acb-fab:active { transform: scale(0.95); }
.acb-fab svg { transition: all 0.3s ease; }
.acb-fab .acb-icon-chat { opacity: 1; transform: scale(1) rotate(0); }
.acb-fab .acb-icon-close { position: absolute; opacity: 0; transform: scale(0.5) rotate(-90deg); }
.acb-fab.is-open .acb-icon-chat { opacity: 0; transform: scale(0.5) rotate(90deg); }
.acb-fab.is-open .acb-icon-close { opacity: 1; transform: scale(1) rotate(0); }

@keyframes acb-pulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(188,24,39,0.35), 0 0 0 0 rgba(188,24,39,0.25); }
  50% { box-shadow: 0 4px 20px rgba(188,24,39,0.35), 0 0 0 12px rgba(188,24,39,0); }
}
.acb-fab.is-open { animation: none; }

/* ── Badge ── */
.acb-badge {
  position: absolute; top: -4px; right: -4px;
  width: 22px; height: 22px; border-radius: 50%;
  background: #15181B; color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
  transform: scale(0); transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.acb-badge.has-count { transform: scale(1); }

/* ── Chat Window ── */
.acb-window {
  position: absolute; bottom: 82px; right: 0;
  width: 418px; max-height: 616px; height: 616px;
  background: #fff; border-radius: 20px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
  display: flex; flex-direction: column;
  opacity: 0; visibility: hidden; transform: translateY(16px) scale(0.96);
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
  overflow: hidden;
}
.acb-window.is-open {
  opacity: 1; visibility: visible; transform: translateY(0) scale(1);
}

/* ── Header ── */
.acb-header {
  background: linear-gradient(135deg, #15181B 0%, #1e2328 100%);
  padding: 22px 24px 18px; flex-shrink: 0;
  display: flex; align-items: center; gap: 14px;
  position: relative; overflow: hidden;
}
.acb-header::after {
  content: ''; position: absolute; top: -40%; right: -20%;
  width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(188,24,39,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.acb-avatar {
  width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg, #bc1827, #e63946);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; position: relative; z-index: 1;
}
.acb-avatar svg { width: 22px; height: 22px; }
.acb-header-info { position: relative; z-index: 1; }
.acb-header-name { color: #fff; font-size: 16px; font-weight: 600; letter-spacing: -0.01em; margin: 0; line-height: 1.3; }
.acb-header-status { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
.acb-header-status .acb-dot { width: 7px; height: 7px; border-radius: 50%; background: #10B981; animation: acb-dot-pulse 2s ease infinite; }
.acb-header-status span { color: rgba(255,255,255,0.55); font-size: 12px; font-weight: 400; }
@keyframes acb-dot-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

/* ── Messages Area ── */
.acb-messages {
  flex: 1; overflow-y: auto; padding: 18px 16px 8px;
  display: flex; flex-direction: column; gap: 4px;
  scroll-behavior: smooth;
  background: #FAFAFA;
}
.acb-messages::-webkit-scrollbar { width: 4px; }
.acb-messages::-webkit-scrollbar-track { background: transparent; }
.acb-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

/* ── Message Bubbles ── */
.acb-msg { display: flex; gap: 8px; max-width: 88%; animation: acb-msg-in 0.35s cubic-bezier(0.16,1,0.3,1); }
.acb-msg.is-bot { align-self: flex-start; }
.acb-msg.is-user { align-self: flex-end; flex-direction: row-reverse; }

.acb-msg-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: linear-gradient(135deg, #15181B, #2a2f35);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 2px;
}
.acb-msg-avatar svg { width: 14px; height: 14px; }

.acb-bubble {
  padding: 12px 18px; font-size: 15px; line-height: 1.55;
  color: #1e293b; white-space: pre-wrap; word-break: break-word;
}
.acb-msg.is-bot .acb-bubble {
  background: #fff; border-radius: 4px 16px 16px 16px;
  border: 1px solid #EDEFF2;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.acb-msg.is-user .acb-bubble {
  background: linear-gradient(135deg, #bc1827, #d42030);
  color: #fff; border-radius: 16px 4px 16px 16px;
  box-shadow: 0 2px 8px rgba(188,24,39,0.2);
}
.acb-msg.is-user .acb-msg-avatar { display: none; }

.acb-msg-time {
  font-size: 10px; color: #94a3b8; margin-top: 3px;
  padding-left: 38px;
}
.acb-msg.is-user .acb-msg-time { text-align: right; padding-left: 0; padding-right: 4px; }

@keyframes acb-msg-in {
  0% { opacity: 0; transform: translateY(10px) scale(0.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── Typing Indicator ── */
.acb-typing { display: flex; gap: 8px; align-self: flex-start; max-width: 88%; padding: 0 0 4px; }
.acb-typing-dots {
  background: #fff; border: 1px solid #EDEFF2; border-radius: 4px 16px 16px 16px;
  padding: 14px 20px; display: flex; gap: 5px; align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.acb-typing-dots span {
  width: 7px; height: 7px; border-radius: 50%; background: #bcc5d0;
  animation: acb-bounce 1.2s ease-in-out infinite;
}
.acb-typing-dots span:nth-child(2) { animation-delay: 0.15s; }
.acb-typing-dots span:nth-child(3) { animation-delay: 0.3s; }
@keyframes acb-bounce {
  0%,60%,100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* ── Quick Reply Options ── */
.acb-options {
  display: flex; flex-wrap: wrap; gap: 8px;
  padding: 6px 0 8px 38px;
  animation: acb-msg-in 0.35s cubic-bezier(0.16,1,0.3,1);
}
.acb-opt {
  padding: 10px 18px; font-size: 14px; font-weight: 500;
  font-family: 'Jost', sans-serif;
  background: #fff; color: #15181B;
  border: 1.5px solid #E2E6EB; border-radius: 100px;
  cursor: pointer; transition: all 0.25s ease;
  white-space: nowrap; line-height: 1.3;
}
.acb-opt:hover {
  background: #bc1827; color: #fff; border-color: #bc1827;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(188,24,39,0.25);
}
.acb-opt:active { transform: translateY(0) scale(0.97); }

/* ── Input Area ── */
.acb-input-area {
  padding: 14px 18px 16px; flex-shrink: 0;
  border-top: 1px solid #EDEFF2; background: #fff;
  display: flex; align-items: center; gap: 10px;
}
.acb-input {
  flex: 1; border: 1.5px solid #E2E6EB; border-radius: 100px;
  padding: 11px 20px; font-size: 15px; font-family: 'Jost', sans-serif;
  color: #15181B; background: #FAFAFA;
  outline: none; transition: all 0.25s ease;
}
.acb-input::placeholder { color: #94a3b8; }
.acb-input:focus { border-color: #bc1827; background: #fff; box-shadow: 0 0 0 3px rgba(188,24,39,0.08); }

.acb-send {
  width: 44px; height: 44px; border-radius: 50%; border: none;
  background: linear-gradient(135deg, #bc1827, #e63946);
  color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s ease; flex-shrink: 0;
  opacity: 0.4; pointer-events: none;
}
.acb-send.is-active { opacity: 1; pointer-events: auto; }
.acb-send:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(188,24,39,0.3); }
.acb-send:active { transform: scale(0.95); }
.acb-send svg { width: 18px; height: 18px; }

/* ── Powered By ── */
.acb-powered {
  text-align: center; padding: 6px 0 10px; font-size: 10px;
  color: #b0b8c4; background: #fff; letter-spacing: 0.02em;
}
.acb-powered strong { font-weight: 600; color: #8892a0; }

/* ── Mobile Responsive ── */
@media (max-width: 480px) {
  .acb-widget { bottom: 16px; right: 16px; left: 16px; }
  .acb-fab { width: 62px; height: 62px; }
  .acb-window {
    width: auto; left: 0; right: 0; bottom: 68px;
    max-height: calc(100dvh - 100px); height: calc(100dvh - 100px);
    border-radius: 16px;
  }
  .acb-options { padding-left: 38px; }
}
`;
    document.head.appendChild(css);
  }

  function buildWidget() {
    const widget = document.createElement('div');
    widget.className = 'acb-widget';
    widget.innerHTML = `
      <div class="acb-window" id="acbWindow">
        <div class="acb-header">
          <div class="acb-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div class="acb-header-info">
            <p class="acb-header-name">${CONFIG.botName}</p>
            <div class="acb-header-status">
              <div class="acb-dot"></div>
              <span>Online now</span>
            </div>
          </div>
        </div>
        <div class="acb-messages" id="acbMessages"></div>
        <div class="acb-input-area" id="acbInputArea">
          <input class="acb-input" id="acbInput" type="text" placeholder="Type a message..." autocomplete="off" />
          <button class="acb-send" id="acbSend" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div class="acb-powered">Powered by <strong>AI Assistant</strong></div>
      </div>
      <button class="acb-fab" id="acbFab" aria-label="Open chat">
        <span class="acb-badge" id="acbBadge"></span>
        <svg class="acb-icon-chat" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          <line x1="9" y1="10" x2="9" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/>
        </svg>
        <svg class="acb-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;
    document.body.appendChild(widget);
  }

  /* ═══════════════════════════════════════════
     HELPERS
     ═══════════════════════════════════════════ */
  function $(id) { return document.getElementById(id); }

  function timeStamp() {
    return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  function randomDelay() {
    return CONFIG.typingDelay.min + Math.random() * (CONFIG.typingDelay.max - CONFIG.typingDelay.min);
  }

  function fillTemplate(text) {
    return text.replace(/\{(\w+)\}/g, function (_, key) {
      return leadData[key] || '';
    });
  }

  function scrollToBottom() {
    var el = $('acbMessages');
    requestAnimationFrame(function () { el.scrollTop = el.scrollHeight; });
  }

  /* ═══════════════════════════════════════════
     RENDERING
     ═══════════════════════════════════════════ */
  function addMessage(text, sender) {
    var container = $('acbMessages');
    var wrapper = document.createElement('div');

    // Message bubble
    var msg = document.createElement('div');
    msg.className = 'acb-msg ' + (sender === 'bot' ? 'is-bot' : 'is-user');

    if (sender === 'bot') {
      msg.innerHTML =
        '<div class="acb-msg-avatar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>' +
        '<div class="acb-bubble">' + escapeHtml(fillTemplate(text)) + '</div>';
    } else {
      msg.innerHTML = '<div class="acb-bubble">' + escapeHtml(text) + '</div>';
    }
    wrapper.appendChild(msg);

    // Timestamp
    var time = document.createElement('div');
    time.className = 'acb-msg-time' + (sender === 'user' ? ' is-user' : '');
    time.textContent = timeStamp();
    wrapper.appendChild(time);

    container.appendChild(wrapper);
    scrollToBottom();

    // Unread badge if closed
    if (!isOpen && sender === 'bot') {
      unreadCount++;
      updateBadge();
    }
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showTyping() {
    isTyping = true;
    var container = $('acbMessages');
    var el = document.createElement('div');
    el.className = 'acb-typing';
    el.id = 'acbTypingIndicator';
    el.innerHTML =
      '<div class="acb-msg-avatar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>' +
      '<div class="acb-typing-dots"><span></span><span></span><span></span></div>';
    container.appendChild(el);
    scrollToBottom();
  }

  function hideTyping() {
    isTyping = false;
    var el = $('acbTypingIndicator');
    if (el) el.remove();
  }

  function showOptions(options) {
    var container = $('acbMessages');
    var wrapper = document.createElement('div');
    wrapper.className = 'acb-options';
    wrapper.id = 'acbCurrentOptions';

    options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'acb-opt';
      btn.textContent = opt.label;
      btn.addEventListener('click', function () { handleOption(opt); });
      wrapper.appendChild(btn);
    });

    container.appendChild(wrapper);
    scrollToBottom();
  }

  function clearOptions() {
    var el = $('acbCurrentOptions');
    if (el) el.remove();
  }

  function showInput(config) {
    var input = $('acbInput');
    input.placeholder = config.placeholder;
    input.value = '';
    input.dataset.field = config.field;
    input.dataset.next = config.next;
    input.focus();
  }

  function updateBadge() {
    var badge = $('acbBadge');
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
      badge.classList.add('has-count');
    } else {
      badge.classList.remove('has-count');
    }
  }

  /* ═══════════════════════════════════════════
     FLOW ENGINE
     ═══════════════════════════════════════════ */
  function runFlow(flowId) {
    if (flowId === '_restart') {
      $('acbMessages').innerHTML = '';
      leadData = {};
      hasGreeted = false;
      startConversation();
      return;
    }

    var flow = FLOWS[flowId];
    if (!flow) return;

    var messages = (flow.messages || []).slice();
    var msgIndex = 0;

    function sendNext() {
      if (msgIndex < messages.length) {
        showTyping();
        setTimeout(function () {
          hideTyping();
          addMessage(messages[msgIndex], 'bot');
          msgIndex++;
          setTimeout(sendNext, CONFIG.messageDelay);
        }, randomDelay());
      } else {
        // After all messages, show options or input or advance
        if (flow.options) {
          setTimeout(function () { showOptions(flow.options); }, 300);
        } else if (flow.input) {
          showInput(flow.input);
        } else if (flow.next) {
          setTimeout(function () { runFlow(flow.next); }, 400);
        }
      }
    }

    sendNext();
  }

  function handleOption(opt) {
    clearOptions();
    addMessage(opt.label, 'user');
    setTimeout(function () { runFlow(opt.value); }, 400);
  }

  function handleUserInput(text) {
    if (!text.trim()) return;

    var input = $('acbInput');
    var field = input.dataset.field;
    var next = input.dataset.next;

    addMessage(text, 'user');
    input.value = '';
    $('acbSend').classList.remove('is-active');

    if (field) {
      leadData[field] = text.trim();
      input.dataset.field = '';
      input.dataset.next = '';
      input.placeholder = 'Type a message...';
    }

    if (next) {
      setTimeout(function () { runFlow(next); }, 400);
    }
  }

  function startConversation() {
    if (hasGreeted) return;
    hasGreeted = true;

    showTyping();
    setTimeout(function () {
      hideTyping();
      addMessage(CONFIG.greeting, 'bot');
      setTimeout(function () { showOptions(FLOWS.start.options); }, 400);
    }, randomDelay());
  }

  /* ═══════════════════════════════════════════
     EVENT HANDLERS
     ═══════════════════════════════════════════ */
  function toggle() {
    isOpen = !isOpen;
    $('acbWindow').classList.toggle('is-open', isOpen);
    $('acbFab').classList.toggle('is-open', isOpen);

    if (isOpen) {
      unreadCount = 0;
      updateBadge();
      startConversation();
      // Focus input after animation
      setTimeout(function () { $('acbInput').focus(); }, 400);
    }
  }

  function bindEvents() {
    $('acbFab').addEventListener('click', toggle);

    var input = $('acbInput');
    var sendBtn = $('acbSend');

    input.addEventListener('input', function () {
      sendBtn.classList.toggle('is-active', input.value.trim().length > 0);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && input.value.trim()) {
        e.preventDefault();
        handleUserInput(input.value);
      }
    });

    sendBtn.addEventListener('click', function () {
      if (input.value.trim()) handleUserInput(input.value);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) toggle();
    });
  }

  /* ═══════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════ */
  function init() {
    injectStyles();
    buildWidget();
    bindEvents();

    // Auto-show unread badge after 3 seconds to draw attention
    setTimeout(function () {
      if (!isOpen) {
        unreadCount = 1;
        updateBadge();
      }
    }, 3000);
  }

  // Boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
