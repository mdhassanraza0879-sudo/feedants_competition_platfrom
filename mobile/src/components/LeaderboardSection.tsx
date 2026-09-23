import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Language, translations } from '../constants/translations';
import { showAppAlert } from '../utils/alert';

interface LeaderboardItem {
  rank: number;
  name: string;
  avatar: string;
  danceForm: string;
  score: number;
  votes: number;
  prizeAmount: number;
  isUpiVerified?: boolean;
}

const LEADERBOARD_DATA: LeaderboardItem[] = [
  {
    rank: 1,
    name: 'Riya Shah',
    avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200',
    danceForm: 'Kathak',
    score: 9.9,
    votes: 1420,
    prizeAmount: 550,
    isUpiVerified: true
  },
  {
    rank: 2,
    name: 'Neha Verma',
    avatar: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=200',
    danceForm: 'Odissi',
    score: 9.6,
    votes: 1120,
    prizeAmount: 300,
    isUpiVerified: true
  },
  {
    rank: 3,
    name: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200',
    danceForm: 'Bharatanatyam',
    score: 9.4,
    votes: 980,
    prizeAmount: 240,
    isUpiVerified: true
  },
  {
    rank: 4,
    name: 'Ishita Chouhan',
    avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200',
    danceForm: 'Kathak',
    score: 9.1,
    votes: 840,
    prizeAmount: 200,
    isUpiVerified: true
  },
  {
    rank: 5,
    name: 'Pooja Nair',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    danceForm: 'Mohiniyattam',
    score: 8.9,
    votes: 720,
    prizeAmount: 130,
    isUpiVerified: true
  },
  {
    rank: 6,
    name: 'Siddharth Sen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    danceForm: 'Kathakali',
    score: 8.7,
    votes: 610,
    prizeAmount: 80,
    isUpiVerified: true
  }
];

interface LeaderboardSectionProps {
  language: Language;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ language }) => {
  const t = translations[language];

  const first = LEADERBOARD_DATA[0];
  const second = LEADERBOARD_DATA[1];
  const third = LEADERBOARD_DATA[2];
  const remaining = LEADERBOARD_DATA.slice(3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerCard}>
        <View style={styles.badgeRow}>
          <Ionicons name="trophy" size={18} color="#F59E0B" />
          <Text style={styles.headerTag}>LIVE LEADERBOARD</Text>
        </View>
        <Text style={styles.headerTitle}>Current Championship Standings</Text>
        <Text style={styles.headerSubtitle}>
          Rankings calculated via Judge Parameter Scores (70%) + Audience Votes (30%).
        </Text>
      </View>

      {/* 3D Top 3 Podium */}
      <View style={styles.podiumContainer}>
        {/* 2nd Place (Left) */}
        <View style={styles.podiumCol}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: second.avatar }} style={styles.avatarSecond} />
            <View style={styles.rankBadgeSilver}>
              <Text style={styles.rankBadgeText}>2</Text>
            </View>
          </View>
          <Text style={styles.podiumName} numberOfLines={1}>{second.name}</Text>
          <Text style={styles.podiumStyle}>{second.danceForm}</Text>
          <View style={styles.prizeBadge}>
            <Text style={styles.prizeText}>₹{second.prizeAmount}</Text>
          </View>
          <View style={[styles.podiumPillar, styles.pillarSecond]}>
            <Text style={styles.pillarScore}>★ {second.score}</Text>
            <Text style={styles.pillarVotes}>{second.votes} votes</Text>
          </View>
        </View>

        {/* 1st Place (Center - Highest) */}
        <View style={[styles.podiumCol, styles.podiumColFirst]}>
          <View style={styles.crownIcon}>
            <Ionicons name="sparkles" size={16} color="#F59E0B" />
          </View>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: first.avatar }} style={styles.avatarFirst} />
            <View style={styles.rankBadgeGold}>
              <Text style={styles.rankBadgeText}>1</Text>
            </View>
          </View>
          <Text style={styles.podiumNameFirst} numberOfLines={1}>{first.name}</Text>
          <Text style={styles.podiumStyle}>{first.danceForm}</Text>
          <View style={[styles.prizeBadge, styles.prizeBadgeGold]}>
            <Text style={styles.prizeTextGold}>₹{first.prizeAmount}</Text>
          </View>
          <View style={[styles.podiumPillar, styles.pillarFirst]}>
            <Text style={styles.pillarScoreGold}>★ {first.score}</Text>
            <Text style={styles.pillarVotes}>{first.votes} votes</Text>
          </View>
        </View>

        {/* 3rd Place (Right) */}
        <View style={styles.podiumCol}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: third.avatar }} style={styles.avatarThird} />
            <View style={styles.rankBadgeBronze}>
              <Text style={styles.rankBadgeText}>3</Text>
            </View>
          </View>
          <Text style={styles.podiumName} numberOfLines={1}>{third.name}</Text>
          <Text style={styles.podiumStyle}>{third.danceForm}</Text>
          <View style={styles.prizeBadge}>
            <Text style={styles.prizeText}>₹{third.prizeAmount}</Text>
          </View>
          <View style={[styles.podiumPillar, styles.pillarThird]}>
            <Text style={styles.pillarScore}>★ {third.score}</Text>
            <Text style={styles.pillarVotes}>{third.votes} votes</Text>
          </View>
        </View>
      </View>

      {/* Ranks 4 to 10 List */}
      <View style={styles.listSection}>
        <Text style={styles.listSectionTitle}>All Qualified Performers</Text>

        {remaining.map((item) => (
          <TouchableOpacity
            key={item.rank}
            style={styles.rankCard}
            onPress={() => {
              showAppAlert(
                `${item.name} (Rank #${item.rank})`,
                `Judge Score: ${item.score}/10\nAudience Votes: ${item.votes}\nPrize Tier: ₹${item.prizeAmount}\nDigital Certificate: Verified`
              );
            }}
            activeOpacity={0.8}
          >
            {/* Rank Number */}
            <View style={styles.rankNumberBox}>
              <Text style={styles.rankNumberText}>#{item.rank}</Text>
            </View>

            {/* Avatar & Details */}
            <Image source={{ uri: item.avatar }} style={styles.itemAvatar} />
            <View style={styles.itemDetails}>
              <View style={styles.itemNameRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.isUpiVerified && (
                  <Ionicons name="checkmark-circle" size={14} color="#00F2FE" />
                )}
              </View>
              <Text style={styles.itemStyle}>{item.danceForm} • {item.votes} votes</Text>
            </View>

            {/* Score & Prize */}
            <View style={styles.itemRight}>
              <Text style={styles.itemScore}>★ {item.score}</Text>
              <Text style={styles.itemPrize}>₹{item.prizeAmount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16'
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16
  },
  headerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    gap: 6
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  headerTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F59E0B',
    letterSpacing: 1
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 20,
    paddingBottom: 8
  },
  podiumCol: {
    flex: 1,
    alignItems: 'center'
  },
  podiumColFirst: {
    marginBottom: 0
  },
  crownIcon: {
    marginBottom: 2
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 6
  },
  avatarFirst: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: '#F59E0B'
  },
  avatarSecond: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#94A3B8'
  },
  avatarThird: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#D97706'
  },
  rankBadgeGold: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#090D16'
  },
  rankBadgeSilver: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#090D16'
  },
  rankBadgeBronze: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#090D16'
  },
  rankBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#090D16'
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  podiumNameFirst: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F59E0B'
  },
  podiumStyle: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 4
  },
  prizeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6
  },
  prizeBadgeGold: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: '#F59E0B'
  },
  prizeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  prizeTextGold: {
    fontSize: 12,
    fontWeight: '900',
    color: '#F59E0B'
  },
  podiumPillar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 12,
    gap: 2
  },
  pillarFirst: {
    height: 110,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderTopWidth: 2,
    borderColor: '#F59E0B'
  },
  pillarSecond: {
    height: 80,
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
    borderTopWidth: 2,
    borderColor: '#94A3B8'
  },
  pillarThird: {
    height: 60,
    backgroundColor: 'rgba(217, 119, 6, 0.12)',
    borderTopWidth: 2,
    borderColor: '#D97706'
  },
  pillarScore: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  pillarScoreGold: {
    fontSize: 14,
    fontWeight: '900',
    color: '#F59E0B'
  },
  pillarVotes: {
    fontSize: 9,
    color: '#94A3B8'
  },
  listSection: {
    gap: 10
  },
  listSectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 6
  },
  rankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12
  },
  rankNumberBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rankNumberText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8'
  },
  itemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  itemDetails: {
    flex: 1,
    gap: 2
  },
  itemNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  itemStyle: {
    fontSize: 11,
    color: '#94A3B8'
  },
  itemRight: {
    alignItems: 'flex-end',
    gap: 2
  },
  itemScore: {
    fontSize: 13,
    fontWeight: '800',
    color: '#F59E0B'
  },
  itemPrize: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981'
  }
});
