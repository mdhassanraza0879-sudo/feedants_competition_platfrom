import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { translations, Language } from '../constants/translations';
import { CompetitionStatus } from '../types';

interface BottomActionBarProps {
  isRegistered: boolean;
  status: CompetitionStatus;
  entryFee: number;
  spotsLeft: number;
  language: Language;
  onRegisterPress: () => void;
  onUploadPress: () => void;
  isLoading?: boolean;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  isRegistered,
  status,
  entryFee,
  spotsLeft,
  language,
  onRegisterPress,
  onUploadPress,
  isLoading = false
}) => {
  const t = translations[language];

  // Registered state: Shows "Upload Submission" with "Registered" caption underneath
  if (isRegistered) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onUploadPress}
          activeOpacity={0.85}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Upload Submission"
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.buttonMainText}>{t.uploadSubmission}</Text>
              <Text style={styles.buttonSubText}>{t.registered}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  // Not registered but spots are full
  if (status === 'REGISTRATION_FULL' || spotsLeft <= 0) {
    return (
      <View style={styles.container}>
        <View style={[styles.actionButton, styles.disabledButton]}>
          <Text style={styles.buttonMainText}>{t.registrationFull}</Text>
          <Text style={styles.buttonSubText}>0 spots left</Text>
        </View>
      </View>
    );
  }

  // Not registered but registration closed / completed
  if (status === 'REGISTRATION_CLOSED' || status === 'COMPLETED') {
    return (
      <View style={styles.container}>
        <View style={[styles.actionButton, styles.disabledButton]}>
          <Text style={styles.buttonMainText}>
            {status === 'COMPLETED' ? t.viewResults : t.registrationClosed}
          </Text>
        </View>
      </View>
    );
  }

  // Active registration open
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onRegisterPress}
        activeOpacity={0.85}
        disabled={isLoading}
        accessibilityRole="button"
        accessibilityLabel={`Register Now for ₹${entryFee}`}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <Text style={styles.buttonMainText}>
              {t.registerNow} - ₹{entryFee}
            </Text>
            <Text style={styles.buttonSubText}>
              {spotsLeft} spots left
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  actionButton: {
    backgroundColor: '#007A78',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer' as any,
    shadowColor: '#007A78',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0
  },
  buttonMainText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2
  },
  buttonSubText: {
    fontSize: 11,
    color: '#D1FAE5',
    fontWeight: '600',
    marginTop: 2
  }
});
