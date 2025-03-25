import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Erreur capturée par ErrorBoundary:", error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Oups! Une erreur est survenue</h1>
            <p className="text-gray-600 mb-6">
              Nous sommes désolés pour ce problème. Vous pouvez essayer de recharger la page.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center mx-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Rafraîchir la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 