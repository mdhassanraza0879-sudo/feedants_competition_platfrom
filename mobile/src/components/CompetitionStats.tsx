import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { translations, Language } from '../constants/translations';

interface CompetitionStatsProps {
  prizePool: number;
  entryFee: number;
  registeredParticipants: number;
  maxParticipants: number;
  spotsLeft: number;
  language: Language;
}

export const CompetitionStats: React.FC<CompetitionStatsProps> = ({
  prizePool,
  entryFee,
  registeredParticipants,
  maxParticipants,
  spotsLeft,
  language
}) => {
  const t = translations[language];
  const progressRatio = Math.min(1, Math.max(0, registeredParticipants / maxParticipants));

  const spotsLeftText = t.spotsLeft.replace('{count}', String(spotsLeft));
  const bookedText = t.booked
    .replace('{current}', String(registeredParticipants))
    .replace('{max}', String(maxParticipants));

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        {/* Prize Pool */}
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>{t.prizePool}</Text>
          <Text style={styles.prizeValue}>₹ {prizePool.toLocaleString('en-IN')}</Text>
        </View>

        {/* Entry Fee */}
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>{t.entryFee}</Text>
          <Text style={styles.feeValue}>₹ {entryFee.toLocaleString('en-IN')}</Text>
        </View>

        {/* Spots & Progress Bar */}
        <View style={styles.spotsColumn}>
          <View style={styles.spotsHeader}>
            <Ionicons name="people-outline" size={16} color={Colors.primary} />
            <Text style={styles.spotsText}>
              {spotsLeft > 0 ? spotsLeftText : t.registrationFull}
            </Text>
          </View>

          {/* Progress Bar matching screenshot */}
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${Math.max(5, progressRatio * 100)}%` }
              ]}
            />
          </View>

          <Text style={styles.bookedText}>{bookedText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF'
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12
  },
  statColumn: {
    flexShrink: 0
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 4
  },
  prizeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary
  },
  feeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  spotsColumn: {
    flex: 1,
    alignItems: 'flex-end'
  },
  spotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6
  },
  spotsText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary
  },
  progressBarBackground: {
    width: '100%',
    maxWidth: 140,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3
  },
  bookedText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500'
  }
});
