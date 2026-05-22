import { useState } from 'react';
import { isAuthValid, setAuth, clearAuth, getAuthExpirationTime, validateKey } from './authUtils';

export function AuthModal({ onClose, onSuccess }) {
  const [keyInput, setKeyInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleKeySubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedKey = keyInput.trim();

    if (!trimmedKey) {
      setErrorMessage('Please enter an authentication key.');
      return;
    }

    if (!validateKey(trimmedKey)) {
      setErrorMessage('Invalid authentication key. Please try again.');
      setKeyInput('');
      return;
    }

    setAuth(trimmedKey);
    setKeyInput('');
    onSuccess();
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-gate-modal">
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close authentication modal"
        >
          ✕
        </button>

        <div className="auth-content">
          <h2>🔐 Restricted Content</h2>
          <p>
            This section requires an authentication key to view professional experience,
            certifications, and featured projects.
          </p>

          <form onSubmit={handleKeySubmit} className="auth-form">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Enter authentication key"
              className="auth-input"
              autoFocus
            />

            {errorMessage && (
              <p className="auth-error">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
            >
              Unlock
            </button>
          </form>

          <p className="auth-hint">
            ℹ️ Keys are valid for 5 days from the time of entry.
          </p>
        </div>
      </div>
    </div>
  );
}

export function AuthStatusBar() {
  const expirationTime = getAuthExpirationTime();

  const handleLogout = () => {
    clearAuth();
    window.location.reload();
  };

  if (!expirationTime) {
    return null;
  }

  return (
    <div className="auth-status-bar">
      <span className="auth-status-text">
        🔓 Access granted until{' '}
        {expirationTime.toLocaleDateString()} at{' '}
        {expirationTime.toLocaleTimeString()}
      </span>

      <button
        type="button"
        onClick={handleLogout}
        className="auth-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}
