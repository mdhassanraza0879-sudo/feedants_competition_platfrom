import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { translations, Language } from '../constants/translations';
import { IReward } from '../types';

interface RewardsSectionProps {
  rewards: IReward[];
  disclaimer: string;
  language: Language;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({
  rewards,
  disclaimer,
  language
}) => {
  const t = translations[language];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Text style={styles.emojiIcon}>🏆</Text>;
      case 2:
        return <Text style={styles.emojiIcon}>🥈</Text>;
      case 3:
        return <Text style={styles.emojiIcon}>🥉</Text>;
      default:
        return <Ionicons name="star-outline" size={17} color="#64748B" />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{t.rewards}</Text>
        <Text style={styles.subtitle}>{t.allPositions}</Text>
      </View>

      {/* Rewards List Card */}
      <View style={styles.rewardsCard}>
        {rewards.map((reward, index) => (
          <View
            key={reward._id || index}
            style={[
              styles.rewardRow,
              index !== rewards.length - 1 && styles.rewardBorderBottom
            ]}
          >
            <View style={styles.rewardLeft}>
              <View style={styles.iconContainer}>
                {getRankIcon(reward.rank)}
              </View>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
            </View>

            <Text style={styles.rewardAmount}>
              ₹ {reward.amount.toLocaleString('en-IN')}
            </Text>
          </View>
        ))}
      </View>

      {/* Disclaimer Banner matching screenshot */}
      <View style={styles.disclaimerBanner}>
        <Ionicons name="information-circle-outline" size={18} color="#007A78" style={{ marginTop: 1 }} />
        <Text style={styles.disclaimerText}>
          <Text style={styles.disclaimerBold}>Disclaimer: </Text>
          {disclaimer || t.disclaimer}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 10
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.2
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500'
  },
  rewardsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  rewardBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emojiIcon: {
    fontSize: 18
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B'
  },
  rewardAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#007A78'
  },
  disclaimerBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EAF6F5',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#D4ECE9'
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    fontWeight: '500'
  },
  disclaimerBold: {
    fontWeight: '700',
    color: '#007A78'
  }
});
