import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Language } from '../constants/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onGoBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onGoBack
}) => {
  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (Platform.OS === 'web' && typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Go back */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={22} color="#1E293B" />
        <Text style={styles.backText}>{language === 'ENG' ? 'Go back' : 'वापस जाएं'}</Text>
      </TouchableOpacity>

      {/* Language Selector Pill */}
      <View style={styles.languageToggleContainer}>
        <TouchableOpacity
          style={[
            styles.langPill,
            language === 'ENG' ? styles.langPillActive : styles.langPillInactive
          ]}
          onPress={() => onLanguageChange('ENG')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="English"
        >
          <Text
            style={[
              styles.langText,
              language === 'ENG' ? styles.langTextActive : styles.langTextInactive
            ]}
          >
            ENG
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.langPill,
            language === 'HIN' ? styles.langPillActive : styles.langPillInactive
          ]}
          onPress={() => onLanguageChange('HIN')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Hindi"
        >
          <Text
            style={[
              styles.langText,
              language === 'HIN' ? styles.langTextActive : styles.langTextInactive
            ]}
          >
            हिंदी
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer' as any
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B'
  },
  languageToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  langPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    cursor: 'pointer' as any
  },
  langPillActive: {
    backgroundColor: '#007A78'
  },
  langPillInactive: {
    backgroundColor: 'transparent'
  },
  langText: {
    fontSize: 12,
    fontWeight: '700'
  },
  langTextActive: {
    color: '#FFFFFF'
  },
  langTextInactive: {
    color: '#64748B'
  }
});
