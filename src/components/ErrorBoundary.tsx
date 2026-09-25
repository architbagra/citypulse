import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught CityPulse UI Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#182923] text-[#edf2eb] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-[#ffffff] text-[#181d19] border border-[#c2c8c4] rounded-[0.25rem] p-6 space-y-4 shadow-print-lg">
            <div className="flex items-center space-x-2 text-[#8a2d2d] font-bold uppercase tracking-[0.06em] text-xs">
              <AlertTriangle className="w-5 h-5 text-[#c25e5e]" />
              <span>CityPulse Interface Recoverable Alert</span>
            </div>
            <h2 className="font-serif text-xl font-medium text-[#182923]">
              Rendering Interrupted
            </h2>
            <p className="text-xs text-[#52606f] leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering anomaly occurred in the dashboard view.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full h-10 bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-semibold uppercase tracking-[0.06em] rounded-[0.25rem] flex items-center justify-center space-x-2 transition-all shadow-print"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RELOAD DASHBOARD</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
