import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { translations, Language } from '../constants/translations';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownTimerProps {
  deadline: string;
  language: Language;
  onTimerEnd?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  deadline,
  language,
  onTimerEnd
}) => {
  const t = translations[language];
  const { days, hours, minutes, seconds, isFinished } = useCountdown(deadline, onTimerEnd);

  const formattedDays = String(days).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <View style={styles.banner}>
      {/* Left: Hourglass & Label */}
      <View style={styles.leftRow}>
        <Ionicons name="hourglass-outline" size={16} color="#007A78" />
        <Text style={styles.label}>{t.registrationClosesIn}</Text>
      </View>

      {/* Center: Dynamic Ticking Countdown */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {isFinished
            ? '00d : 00h : 00m : 00s'
            : `${formattedDays}d : ${formattedHours}h : ${formattedMinutes}m : ${formattedSeconds}s`}
        </Text>
      </View>

      {/* Right: Hurry up! */}
      <View style={styles.rightRow}>
        <Ionicons name="stopwatch-outline" size={16} color="#007A78" />
        <Text style={styles.hurryText}>{t.hurryUp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAF6F5',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4ECE9'
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B'
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  timerText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007A78',
    letterSpacing: 0.3,
    fontVariant: ['tabular-nums'],
    fontFamily: Platform.OS === 'web' ? 'system-ui, -apple-system, sans-serif' : undefined
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  hurryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007A78'
  }
});
