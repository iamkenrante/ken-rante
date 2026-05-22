import { useState } from 'react';
import { isAuthValid } from './authUtils';
import { AuthModal } from './AuthGate';

export function ProtectedContent({ children }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthValid());

  const handleSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="locked-content-message">
          <p>🔒 This content is restricted</p>
          <button
            type="button"
            className="unlock-btn"
            onClick={() => setShowAuthModal(true)}
          >
            Enter Authentication Key
          </button>
        </div>

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleSuccess}
          />
        )}
      </>
    );
  }

  return children;
}
