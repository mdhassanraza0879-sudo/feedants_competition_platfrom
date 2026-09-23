import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { translations, Language } from '../constants/translations';
import { IJudge } from '../types';

interface JudgeCardProps {
  judge: IJudge;
  language: Language;
  onPlayIntro?: () => void;
}

export const JudgeCard: React.FC<JudgeCardProps> = ({ judge, language, onPlayIntro }) => {
  const [imageError, setImageError] = useState(false);
  const t = translations[language];

  return (
    <View style={styles.card}>
      {/* Judge Avatar with fallback */}
      {imageError || !judge.avatarUrl ? (
        <View style={styles.avatarFallback}>
          <Ionicons name="person" size={30} color="#007A78" />
        </View>
      ) : (
        <Image
          source={{ uri: judge.avatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      )}

      {/* Judge Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.judgeLabel}>{t.judge}</Text>
        <Text style={styles.judgeName}>{judge.name || 'Hassan Raza'}</Text>
        <Text style={styles.judgeRole}>{judge.role || 'Professional Kathak Dancer'}</Text>
        <Text style={styles.judgeExperience}>{judge.experience || '12+ Years of Experience'}</Text>
      </View>

      {/* Intro Video Button */}
      <TouchableOpacity
        style={styles.videoButtonContainer}
        onPress={onPlayIntro}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Play Judge Intro Video"
      >
        <View style={styles.playIconCircle}>
          <Ionicons name="play" size={18} color="#007A78" style={{ marginLeft: 2 }} />
        </View>
        <Text style={styles.videoText}>{t.introVideo}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#E2E8F0'
  },
  avatarFallback: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#EAF6F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B2DFDB'
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center'
  },
  judgeLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B'
  },
  judgeRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  judgeExperience: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1
  },
  videoButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8
  },
  playIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF6F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  },
  videoText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B'
  }
});
