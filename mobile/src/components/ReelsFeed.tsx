import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Language, translations } from '../constants/translations';
import { showAppAlert } from '../utils/alert';

interface ReelItem {
  id: string;
  artistName: string;
  artistAvatar: string;
  title: string;
  danceStyle: string;
  ragOrSong: string;
  judgeScore: number;
  initialLikes: number;
  initialVotes: number;
  videoUrl: string;
  thumbnail: string;
}

const REELS_DATA: ReelItem[] = [
  {
    id: 'reel_1',
    artistName: 'Riya Shah',
    artistAvatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200',
    title: 'Kathak Tarana in Drut Teen Taal',
    danceStyle: 'Kathak',
    ragOrSong: 'Raag Yaman • Traditional Taal',
    judgeScore: 9.8,
    initialLikes: 1420,
    initialVotes: 864,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800'
  },
  {
    id: 'reel_2',
    artistName: 'Aarav Mehta',
    artistAvatar: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200',
    title: 'Bharatanatyam Alarippu & Varnam',
    danceStyle: 'Bharatanatyam',
    ragOrSong: 'Raag Nattai • Adi Taalam',
    judgeScore: 9.6,
    initialLikes: 980,
    initialVotes: 612,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800'
  },
  {
    id: 'reel_3',
    artistName: 'Neha Verma',
    artistAvatar: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=200',
    title: 'Odissi Mangalacharan (Ganesh Vandana)',
    danceStyle: 'Odissi',
    ragOrSong: 'Traditional Odissi Ragam',
    judgeScore: 9.4,
    initialLikes: 845,
    initialVotes: 510,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800'
  },
  {
    id: 'reel_4',
    artistName: 'Ishita Chouhan',
    artistAvatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200',
    title: 'Kathak Thumri — Abhinaya Expressive',
    danceStyle: 'Kathak',
    ragOrSong: 'Bhairavi Thumri • Roopak Taal',
    judgeScore: 9.1,
    initialLikes: 670,
    initialVotes: 395,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'
  }
];

interface ReelsFeedProps {
  language: Language;
  onOpenUpload: () => void;
  onPlayVideo?: (videoUrl: string, title: string) => void;
}

export const ReelsFeed: React.FC<ReelsFeedProps> = ({ language, onOpenUpload, onPlayVideo }) => {
  const t = translations[language];
  const [likes, setLikes] = useState<{ [id: string]: { count: number; userLiked: boolean } }>(
    REELS_DATA.reduce((acc, item) => ({ ...acc, [item.id]: { count: item.initialLikes, userLiked: false } }), {})
  );
  const [votes, setVotes] = useState<{ [id: string]: { count: number; userVoted: boolean } }>(
    REELS_DATA.reduce((acc, item) => ({ ...acc, [item.id]: { count: item.initialVotes, userVoted: false } }), {})
  );

  const toggleLike = (id: string) => {
    setLikes((prev) => {
      const current = prev[id] || { count: 0, userLiked: false };
      return {
        ...prev,
        [id]: {
          count: current.userLiked ? current.count - 1 : current.count + 1,
          userLiked: !current.userLiked
        }
      };
    });
  };

  const castVote = (item: ReelItem) => {
    const current = votes[item.id] || { count: item.initialVotes, userVoted: false };
    if (current.userVoted) {
      showAppAlert(t.voted, `You have already cast your vote for ${item.artistName}!`);
      return;
    }

    setVotes((prev) => ({
      ...prev,
      [item.id]: {
        count: current.count + 1,
        userVoted: true
      }
    }));

    showAppAlert(
      'Vote Confirmed! 🗳️',
      `Your live vote for ${item.artistName} in the Feedants Classical Dance Competition has been recorded.`
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Stage Header */}
      <View style={styles.topStageBanner}>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>STAGE REELS</Text>
        </View>
        <Text style={styles.stageTitle}>Contestant Performances</Text>
        <Text style={styles.stageSubtitle}>Swipe through entries • Vote for your favorite artist</Text>
      </View>

      {REELS_DATA.map((reel) => {
        const itemLikes = likes[reel.id] || { count: reel.initialLikes, userLiked: false };
        const itemVotes = votes[reel.id] || { count: reel.initialVotes, userVoted: false };

        return (
          <View key={reel.id} style={styles.reelCard}>
            {/* Video Container */}
            <View style={styles.mediaContainer}>
              <Image source={{ uri: reel.thumbnail }} style={styles.reelImage} />

              {/* Play Button Overlay */}
              <TouchableOpacity
                style={styles.playCenterButton}
                onPress={() => onPlayVideo && onPlayVideo(reel.videoUrl, `${reel.artistName} — ${reel.title}`)}
                activeOpacity={0.85}
              >
                <View style={styles.playPulseCircle}>
                  <Ionicons name="play" size={28} color="#FFFFFF" style={{ marginLeft: 3 }} />
                </View>
                <Text style={styles.playText}>Watch Performance</Text>
              </TouchableOpacity>

              {/* Dark Gradient Overlay for Readability */}
              <View style={styles.gradientOverlay} pointerEvents="none" />

              {/* Right Floating Actions */}
              <View style={styles.rightActions}>
                {/* Judge Score Badge */}
                <View style={styles.judgeBadge}>
                  <Text style={styles.judgeStar}>★</Text>
                  <Text style={styles.judgeScoreNum}>{reel.judgeScore}</Text>
                  <Text style={styles.judgeLabel}>Judge</Text>
                </View>

                {/* Like Button */}
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => toggleLike(reel.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconCircle, itemLikes.userLiked && styles.likedCircle]}>
                    <Ionicons
                      name={itemLikes.userLiked ? 'heart' : 'heart-outline'}
                      size={26}
                      color={itemLikes.userLiked ? '#FF3B30' : '#FFFFFF'}
                    />
                  </View>
                  <Text style={styles.actionCount}>{itemLikes.count}</Text>
                </TouchableOpacity>

                {/* Vote Button */}
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => castVote(reel)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconCircle, itemVotes.userVoted && styles.votedCircle]}>
                    <Ionicons
                      name={itemVotes.userVoted ? 'checkmark-circle' : 'trophy-outline'}
                      size={24}
                      color={itemVotes.userVoted ? '#10B981' : '#00F2FE'}
                    />
                  </View>
                  <Text style={styles.actionCount}>{itemVotes.count} votes</Text>
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {
                    showAppAlert(
                      t.sharePerformance,
                      `Share ${reel.artistName}'s performance with friends to get them more votes!`
                    );
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconCircle}>
                    <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.actionCount}>Share</Text>
                </TouchableOpacity>
              </View>

              {/* Bottom Details Overlay */}
              <View style={styles.bottomDetails}>
                {/* Artist Row */}
                <View style={styles.artistRow}>
                  <Image source={{ uri: reel.artistAvatar }} style={styles.artistAvatar} />
                  <View>
                    <View style={styles.nameRow}>
                      <Text style={styles.artistName}>{reel.artistName}</Text>
                      <Ionicons name="checkmark-circle" size={16} color="#00F2FE" />
                    </View>
                    <Text style={styles.danceStyleTag}>{reel.danceStyle} Solo</Text>
                  </View>
                </View>

                {/* Title */}
                <Text style={styles.performanceTitle} numberOfLines={2}>
                  {reel.title}
                </Text>

                {/* Track Info */}
                <View style={styles.audioRow}>
                  <Ionicons name="musical-notes" size={14} color="#A7F3D0" />
                  <Text style={styles.audioText} numberOfLines={1}>
                    {reel.ragOrSong}
                  </Text>
                </View>

                {/* Quick Vote Pill */}
                <TouchableOpacity
                  style={[styles.votePill, itemVotes.userVoted && styles.votePillActive]}
                  onPress={() => castVote(reel)}
                  activeOpacity={0.85}
                >
                  <Ionicons
                    name={itemVotes.userVoted ? 'checkmark' : 'thumbs-up'}
                    size={16}
                    color="#FFFFFF"
                  />
                  <Text style={styles.votePillText}>
                    {itemVotes.userVoted ? t.voted : `${t.vote} for ${reel.artistName.split(' ')[0]}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16'
  },
  scrollContent: {
    padding: 12,
    gap: 16,
    paddingBottom: 30
  },
  topStageBanner: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 4
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444'
  },
  liveText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EF4444',
    letterSpacing: 1
  },
  stageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  stageSubtitle: {
    fontSize: 12,
    color: '#94A3B8'
  },
  reelCard: {
    width: '100%',
    height: 540,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  mediaContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  reelImage: {
    width: '100%',
    height: '100%'
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)'
  },
  rightActions: {
    position: 'absolute',
    right: 14,
    bottom: 80,
    alignItems: 'center',
    gap: 16,
    zIndex: 10
  },
  judgeBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F59E0B',
    marginBottom: 4
  },
  judgeStar: {
    fontSize: 12,
    color: '#F59E0B'
  },
  judgeScoreNum: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  judgeLabel: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '700'
  },
  actionBtn: {
    alignItems: 'center',
    gap: 4
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  likedCircle: {
    borderColor: '#FF3B30',
    backgroundColor: 'rgba(255, 59, 48, 0.2)'
  },
  votedCircle: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.2)'
  },
  actionCount: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  bottomDetails: {
    position: 'absolute',
    left: 14,
    right: 80,
    bottom: 16,
    gap: 8,
    zIndex: 10
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  artistAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#00F2FE'
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  artistName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  danceStyleTag: {
    fontSize: 11,
    color: '#A7F3D0',
    fontWeight: '600'
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  audioText: {
    fontSize: 11,
    color: '#E2E8F0',
    fontWeight: '500'
  },
  votePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#00F2FE'
  },
  votePillActive: {
    backgroundColor: '#059669',
    borderColor: '#10B981'
  },
  votePillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  playCenterButton: {
    position: 'absolute',
    top: '36%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 5,
    cursor: 'pointer' as any
  },
  playPulseCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 122, 120, 0.85)',
    borderWidth: 2,
    borderColor: '#00F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00F2FE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8
  },
  playText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  }
});
