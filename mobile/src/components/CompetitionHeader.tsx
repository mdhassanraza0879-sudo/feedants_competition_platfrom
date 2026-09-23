import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { translations, Language } from '../constants/translations';
import { CompetitionStatus } from '../types';

interface CompetitionHeaderProps {
  title: string;
  category: string;
  type: string;
  certificateProvided: boolean;
  isRegistered: boolean;
  status: CompetitionStatus;
  language: Language;
}

export const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({
  title,
  category,
  type,
  certificateProvided,
  isRegistered,
  status,
  language
}) => {
  const t = translations[language];

  return (
    <View style={styles.container}>
      {/* Title & Status Badge Row */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {title}
        </Text>

        {isRegistered ? (
          <View style={styles.registeredBadge}>
            <Ionicons name="checkmark-circle" size={15} color="#007A78" />
            <Text style={styles.registeredBadgeText}>{t.registered}</Text>
          </View>
        ) : status === 'REGISTRATION_FULL' ? (
          <View style={styles.fullBadge}>
            <Text style={styles.fullBadgeText}>{t.registrationFull}</Text>
          </View>
        ) : status === 'REGISTRATION_CLOSED' ? (
          <View style={styles.closedBadge}>
            <Text style={styles.closedBadgeText}>{t.registrationClosed}</Text>
          </View>
        ) : null}
      </View>

      {/* Badges Row matching screenshot */}
      <View style={styles.badgesRow}>
        {/* Solid Teal Category Pill */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>

        {/* Multi-Win Gray Pill */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{type}</Text>
        </View>

        {/* Certificate Pill with Trophy */}
        {certificateProvided && (
          <View style={styles.certificateRow}>
            <Ionicons name="trophy-outline" size={15} color="#007A78" />
            <Text style={styles.certificateText}>{t.winnersGetCertificate}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  title: {
    flex: 1,
    fontSize: 21,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 26,
    letterSpacing: -0.3
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EAF6F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B2DFDB'
  },
  registeredBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007A78'
  },
  fullBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  fullBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444'
  },
  closedBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  closedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B'
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10
  },
  categoryBadge: {
    backgroundColor: '#007A78',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  typeBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569'
  },
  certificateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  certificateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007A78'
  }
});
