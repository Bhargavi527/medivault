:root {
  --primary: #4f46e5;
  --primary-dark: #3730a3;
  --primary-light: #e0e7ff;
  --secondary: #06b6d4;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --dark: #1e293b;
  --gray: #64748b;
  --light-gray: #f1f5f9;
  --white: #ffffff;
  --shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --radius: 12px;
  --radius-sm: 8px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
  background: #f0f4ff;
  color: var(--dark);
  line-height: 1.6;
}

.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Auth Pages */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
}

.auth-logo {
  text-align: center;
  margin-bottom: 32px;
}

.auth-logo h1 {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-logo p { color: var(--gray); margin-top: 4px; font-size: 0.9rem; }

.form-group { margin-bottom: 18px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 6px;
}

input, select, textarea {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  transition: border-color 0.2s;
  background: white;
  color: var(--dark);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  width: 100%;
  justify-content: center;
  padding: 14px;
}

.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(79,70,229,0.4); }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

.btn-secondary {
  background: var(--light-gray);
  color: var(--dark);
}
.btn-secondary:hover { background: #e2e8f0; }

.btn-danger { background: var(--danger); color: white; }
.btn-danger:hover { background: #dc2626; }

.btn-success { background: var(--success); color: white; }
.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}
.btn-outline:hover { background: var(--primary-light); }

.role-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;
}

.role-tab {
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  background: white;
}

.role-tab.active {
  border-color: var(--primary);
  background: var(--primary-light);
  color: var(--primary);
}

.role-tab h3 { font-size: 0.95rem; margin-bottom: 4px; }
.role-tab p { font-size: 0.75rem; color: var(--gray); }

.auth-link { text-align: center; margin-top: 20px; font-size: 0.9rem; color: var(--gray); }
.auth-link a { color: var(--primary); font-weight: 600; text-decoration: none; }
.auth-link a:hover { text-decoration: underline; }

/* Dashboard Layout */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.sidebar-header h2 {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-user {
  padding: 16px 20px;
  background: rgba(255,255,255,0.05);
  margin: 12px;
  border-radius: var(--radius-sm);
}

.sidebar-user .name { font-weight: 600; font-size: 0.95rem; }
.sidebar-user .role-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  background: rgba(79,70,229,0.3);
  color: #a5b4fc;
  margin-top: 4px;
}

.sidebar-nav { flex: 1; padding: 12px; }
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  margin-bottom: 4px;
}

.nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
.nav-item.active { background: rgba(79,70,229,0.4); color: white; }
.nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.main-content {
  margin-left: 260px;
  flex: 1;
  padding: 24px;
  min-height: 100vh;
  background: #f0f4ff;
}

/* Cards */
.card {
  background: white;
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--dark);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.blue { background: #e0e7ff; color: var(--primary); }
.stat-icon.green { background: #d1fae5; color: var(--success); }
.stat-icon.yellow { background: #fef3c7; color: var(--warning); }
.stat-icon.red { background: #fee2e2; color: var(--danger); }
.stat-icon.purple { background: #f3e8ff; color: #9333ea; }

.stat-info h4 { font-size: 1.5rem; font-weight: 700; }
.stat-info p { font-size: 0.8rem; color: var(--gray); }

/* Records */
.record-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
  transition: all 0.2s;
}

.record-card:hover { border-color: var(--primary); background: #fafbff; }

.record-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--primary-light);
  color: var(--primary);
}

.record-body { flex: 1; }
.record-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
.record-meta { font-size: 0.8rem; color: var(--gray); }
.record-type-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  background: var(--primary-light);
  color: var(--primary);
  margin-right: 8px;
}

/* AI Chatbot */
.chatbot-container {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8fafc;
  border-radius: var(--radius-sm);
  border: 1px solid #e2e8f0;
}

.chat-msg {
  display: flex;
  gap: 10px;
  max-width: 85%;
}

.chat-msg.user { align-self: flex-end; flex-direction: row-reverse; }
.chat-msg.ai { align-self: flex-start; }

.chat-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.chat-avatar.ai { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
.chat-avatar.user { background: var(--primary); color: white; }

.chat-bubble {
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 0.88rem;
  line-height: 1.5;
  max-width: 100%;
  word-break: break-word;
}

.chat-msg.user .chat-bubble {
  background: var(--primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.chat-msg.ai .chat-bubble {
  background: white;
  color: var(--dark);
  border: 1px solid #e2e8f0;
  border-bottom-left-radius: 4px;
}

.chat-input-area {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.chat-input-area input {
  flex: 1;
  border-radius: 24px;
  padding: 10px 18px;
}

.chat-input-area button {
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.chat-input-area button:hover { background: var(--primary-dark); transform: scale(1.05); }
.chat-input-area button:disabled { opacity: 0.6; cursor: not-allowed; }

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 0;
}

.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gray);
  animation: typingBounce 1.2s infinite;
}

.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

/* QR */
.qr-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.qr-wrapper img {
  border-radius: 12px;
  border: 3px solid var(--primary-light);
  box-shadow: var(--shadow-lg);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal {
  background: white;
  border-radius: var(--radius);
  padding: 28px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.modal-header h3 { font-size: 1.2rem; font-weight: 700; }
.modal-close { background: none; border: none; cursor: pointer; color: var(--gray); padding: 4px; border-radius: 6px; }
.modal-close:hover { background: var(--light-gray); color: var(--dark); }

/* AI Summary Banner */
.ai-summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: var(--radius);
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.ai-summary-card::before {
  content: '🤖';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  opacity: 0.2;
}

.ai-summary-card h4 { font-weight: 700; margin-bottom: 8px; font-size: 1rem; }
.ai-summary-card p { font-size: 0.88rem; opacity: 0.9; line-height: 1.6; }

/* Responsive */
@media (max-width: 768px) {
  .sidebar { transform: translateX(-260px); }
  .main-content { margin-left: 0; }
  .form-row { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in { animation: fadeIn 0.3s ease; }

.page-header {
  margin-bottom: 24px;
}

.page-header h2 { font-size: 1.6rem; font-weight: 700; color: var(--dark); }
.page-header p { color: var(--gray); margin-top: 4px; }

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--gray);
}

.empty-state svg { width: 48px; height: 48px; margin-bottom: 16px; opacity: 0.4; }
.empty-state h4 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
.empty-state p { font-size: 0.85rem; }

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ai-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
}
