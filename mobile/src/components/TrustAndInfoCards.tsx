import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { translations, Language } from '../constants/translations';

interface TrustAndInfoCardsProps {
  language: Language;
  onOpenPrizeInfo?: () => void;
  onOpenRefundInfo?: () => void;
}

export const TrustAndInfoCards: React.FC<TrustAndInfoCardsProps> = ({
  language,
  onOpenPrizeInfo,
  onOpenRefundInfo
}) => {
  const t = translations[language];

  return (
    <View style={styles.container}>
      {/* Unified Card matching screenshot */}
      <View style={styles.card}>
        {/* Top: Prize Money Info Row */}
        <TouchableOpacity
          style={styles.prizeVideoRow}
          onPress={onOpenPrizeInfo}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={t.howReceivePrize}
        >
          <View style={styles.playIconContainer}>
            <Ionicons name="play" size={18} color="#007A78" style={{ marginLeft: 2 }} />
          </View>
          <View style={styles.prizeVideoTextContainer}>
            <Text style={styles.prizeVideoTitle}>{t.howReceivePrize}</Text>
            <Text style={styles.prizeVideoSubtitle}>{t.watchVideoToKnow}</Text>
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom: 2 Columns (Refund Policy & Secure Payments) */}
        <View style={styles.bottomRow}>
          {/* Left Column: Refund Policy */}
          <TouchableOpacity
            style={styles.trustColumn}
            onPress={onOpenRefundInfo}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={t.refundPolicy}
          >
            <Ionicons name="shield-checkmark-outline" size={18} color="#007A78" />
            <Text style={styles.trustText}>{t.refundPolicy}</Text>
          </TouchableOpacity>

          {/* Right Column: Secure Payments powered by Razorpay */}
          <View style={styles.trustColumn}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#007A78" />
            <View style={styles.razorpayRow}>
              <Text style={styles.trustTextSecondary}>{t.securePayments}</Text>
              <Text style={styles.razorpayBrand}> Razorpay</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 8
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1
  },
  prizeVideoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 12
  },
  playIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF6F5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  prizeVideoTextContainer: {
    flex: 1
  },
  prizeVideoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B'
  },
  prizeVideoSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9'
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    gap: 8
  },
  trustColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  trustText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155'
  },
  trustTextSecondary: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500'
  },
  razorpayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  razorpayBrand: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0C2340',
    fontStyle: 'italic'
  }
});
