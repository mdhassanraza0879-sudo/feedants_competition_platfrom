import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { CompetitionDetailsScreen } from './src/screens/CompetitionDetailsScreen';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🔥 Error caught by ErrorBoundary in App.tsx:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.title}>Application Error</Text>
          <Text style={errorStyles.message}>
            {this.state.error?.message || 'An unexpected error occurred while rendering.'}
          </Text>
          <ScrollView style={errorStyles.stackContainer}>
            <Text style={errorStyles.stackText}>
              {this.state.error?.stack || JSON.stringify(this.state.error)}
            </Text>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: 10
  },
  message: {
    fontSize: 14,
    color: '#991B1B',
    textAlign: 'center',
    marginBottom: 16
  },
  stackContainer: {
    maxHeight: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    width: '100%'
  },
  stackText: {
    fontSize: 12,
    color: '#7F1D1D',
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined
  }
});

export default function App() {
  console.log('📱 Feedants App component mounting...');

  return (
    <ErrorBoundary>
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}
        style={styles.provider}
      >
        <View style={styles.desktopContainer}>
          <View style={styles.phoneFrame}>
            <CompetitionDetailsScreen />
          </View>
        </View>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F1F5F9'
  },
  desktopContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9'
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    height: '100%',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#E2E8F0'
  }
});
