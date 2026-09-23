import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { translations, Language } from '../constants/translations';
import { showAppAlert } from '../utils/alert';

interface ReferralCardProps {
  referralLink: string;
  referralReward: number;
  language: Language;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({
  referralLink,
  referralReward,
  language
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const t = translations[language];

  const handleCopy = async () => {
    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(referralLink);
      } else {
        await Clipboard.setStringAsync(referralLink);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReferNow = () => {
    handleCopy();
    showAppAlert(
      t.referNow,
      `Referral link copied to clipboard!\n\nShare with friends to earn ₹${referralReward} for every signup:\n${referralLink}`
    );
  };

  const youEarnText = t.youEarn.replace('{amount}', String(referralReward));

  return (
    <View style={styles.card}>
      {/* Top Header Row with Title & Refer Now Button on Right */}
      <View style={styles.topHeaderRow}>
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <Ionicons name="megaphone-outline" size={18} color="#007A78" />
          </View>
          <Text style={styles.title}>{t.referAndEarn}</Text>
        </View>

        <TouchableOpacity
          style={styles.referNowButton}
          onPress={handleReferNow}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Refer Now"
        >
          <Text style={styles.referNowText}>{t.referNow}</Text>
        </TouchableOpacity>
      </View>

      {/* Link Input & Copy Button Row */}
      <View style={styles.linkContainer}>
        <View style={styles.linkInputBox}>
          <Text style={styles.linkText} numberOfLines={1}>
            {referralLink}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.copyButton, copied && styles.copyButtonSuccess]}
          onPress={handleCopy}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Copy Referral Link"
        >
          <Ionicons
            name={copied ? 'checkmark' : 'copy-outline'}
            size={13}
            color={copied ? '#059669' : '#007A78'}
          />
          <Text style={[styles.copyButtonText, copied && styles.copyButtonTextSuccess]}>
            {copied ? t.copied : t.copyLink}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Caption Text: You earn ₹10 for every signup */}
      <Text style={styles.captionText}>{youEarnText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EDFAF6',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C6EBE4'
  },
  topHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1F2EB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    flexShrink: 1
  },
  referNowButton: {
    backgroundColor: '#007A78',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8
  },
  referNowText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  linkInputBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6EBE4',
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  linkText: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6EBE4'
  },
  copyButtonSuccess: {
    backgroundColor: '#D1FAE5',
    borderColor: '#A7F3D0'
  },
  copyButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007A78'
  },
  copyButtonTextSuccess: {
    color: '#059669'
  },
  captionText: {
    fontSize: 11,
    color: '#007A78',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'right'
  }
});
