import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Oops! Something went wrong.</h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '40px', color: 'var(--text-secondary)' }}>
                        The professional kitchen is experiencing a temporary glitch. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '16px 40px',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: '600'
                        }}
                    >
                        Refresh Kitchen
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
