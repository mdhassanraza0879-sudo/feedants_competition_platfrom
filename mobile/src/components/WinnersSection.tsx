import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { translations, Language } from '../constants/translations';
import { IWinner } from '../types';

interface WinnersSectionProps {
  winners: IWinner[];
  language: Language;
  onSelectWinner?: (winner: IWinner) => void;
}

export const WinnersSection: React.FC<WinnersSectionProps> = ({
  winners,
  language,
  onSelectWinner
}) => {
  const t = translations[language];

  if (!winners || winners.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.previousWinners}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {winners.map((winner, index) => (
          <TouchableOpacity
            key={winner._id || winner.userName || index}
            style={styles.winnerCard}
            onPress={() => onSelectWinner && onSelectWinner(winner)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`${winner.userName}, ${winner.position}`}
          >
            {/* Top Video Thumbnail with Play Overlay */}
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: winner.videoThumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <View style={styles.playButtonOverlay}>
                <View style={styles.playIconInner}>
                  <Ionicons name="play" size={14} color="#007A78" style={{ marginLeft: 2 }} />
                </View>
              </View>
            </View>

            {/* Bottom Info: Name & Position */}
            <View style={styles.infoContainer}>
              <Text style={styles.winnerName} numberOfLines={1}>
                {winner.userName}
              </Text>
              <Text
                style={[
                  styles.winnerPosition,
                  winner.position.includes('1st')
                    ? styles.positionFirst
                    : styles.positionOther
                ]}
                numberOfLines={1}
              >
                {winner.position}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    paddingHorizontal: 16,
    marginBottom: 12,
    letterSpacing: -0.2
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12
  },
  winnerCard: {
    width: 104,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: 94,
    backgroundColor: '#E2E8F0'
  },
  thumbnail: {
    width: '100%',
    height: '100%'
  },
  playButtonOverlay: {
    position: 'absolute',
    bottom: 6,
    right: 6
  },
  playIconInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  winnerName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B'
  },
  winnerPosition: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2
  },
  positionFirst: {
    color: '#007A78'
  },
  positionOther: {
    color: '#007A78'
  }
});
