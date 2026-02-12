import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>Please refresh the page and try again.</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
