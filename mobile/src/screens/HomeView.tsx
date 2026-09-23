import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Language } from '../constants/translations';

interface HomeViewProps {
  language: Language;
  onNavigateToCompetition: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ language, onNavigateToCompetition }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Welcome Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTag}>FEATURED STAGE</Text>
          <Text style={styles.heroTitle}>Showcase Your Classical Dance Talent</Text>
          <Text style={styles.heroSubtitle}>Join Feedants competitions, win cash prizes, and get certified by top industry judges.</Text>
          <TouchableOpacity style={styles.heroBtn} onPress={onNavigateToCompetition} activeOpacity={0.85}>
            <Text style={styles.heroBtnText}>View Classical Dance</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats Banner */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>₹ 50,000+</Text>
          <Text style={styles.statLabel}>Prizes Won</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>1,200+</Text>
          <Text style={styles.statLabel}>Artists</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>100%</Text>
          <Text style={styles.statLabel}>Verified Judges</Text>
        </View>
      </View>

      {/* Featured Competitions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Competitions</Text>
          <TouchableOpacity onPress={onNavigateToCompetition}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Competition Card */}
        <TouchableOpacity style={styles.compCard} onPress={onNavigateToCompetition} activeOpacity={0.9}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600' }}
            style={styles.compImage}
          />
          <View style={styles.compBody}>
            <View style={styles.badgeRow}>
              <View style={styles.pillBadge}><Text style={styles.pillText}>Dance</Text></View>
              <View style={styles.liveBadge}><Text style={styles.liveText}>● REGISTRATION OPEN</Text></View>
            </View>
            <Text style={styles.compTitle}>Feedants Classical Dance</Text>
            <Text style={styles.compJudge}>Judge: Hassan Raza (Kathak Dancer)</Text>
            <View style={styles.compFooter}>
              <View>
                <Text style={styles.footerLabel}>Prize Pool</Text>
                <Text style={styles.footerValue}>₹ 1,500</Text>
              </View>
              <View>
                <Text style={styles.footerLabel}>Entry Fee</Text>
                <Text style={styles.footerFee}>₹ 99</Text>
              </View>
              <View style={styles.joinBtn}>
                <Text style={styles.joinBtnText}>Explore</Text>
                <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  content: {
    padding: 16,
    paddingBottom: 40
  },
  heroBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16
  },
  heroTextContainer: {
    gap: 8
  },
  heroTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A7F3D0',
    letterSpacing: 1
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 26
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#D1FAE5',
    lineHeight: 18
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    marginTop: 6
  },
  heroBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    alignItems: 'center'
  },
  statNum: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2
  },
  section: {
    gap: 12
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary
  },
  compCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden'
  },
  compImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#E2E8F0'
  },
  compBody: {
    padding: 14,
    gap: 6
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  pillBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary
  },
  liveBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669'
  },
  compTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  compJudge: {
    fontSize: 12,
    color: Colors.textSecondary
  },
  compFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  footerLabel: {
    fontSize: 10,
    color: Colors.textSecondary
  },
  footerValue: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary
  },
  footerFee: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8
  },
  joinBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});
