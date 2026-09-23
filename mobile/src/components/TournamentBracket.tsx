import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Language, translations } from '../constants/translations';
import { showAppAlert } from '../utils/alert';

interface Contestant {
  id: string;
  name: string;
  avatar: string;
  style: string;
  votes: number;
  score: number;
}

interface MatchBattle {
  id: string;
  round: 'QUARTER' | 'SEMI' | 'FINAL';
  matchTitle: string;
  contestant1: Contestant;
  contestant2: Contestant;
  winnerId?: string;
}

const BRACKET_DATA: MatchBattle[] = [
  // Quarterfinals
  {
    id: 'qf_1',
    round: 'QUARTER',
    matchTitle: 'Quarterfinal 1 • Classical Beats',
    contestant1: {
      id: 'c1',
      name: 'Riya Shah',
      avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200',
      style: 'Kathak',
      votes: 420,
      score: 9.8
    },
    contestant2: {
      id: 'c2',
      name: 'Pooja Nair',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      style: 'Mohiniyattam',
      votes: 310,
      score: 8.9
    },
    winnerId: 'c1'
  },
  {
    id: 'qf_2',
    round: 'QUARTER',
    matchTitle: 'Quarterfinal 2 • Rhythm Clash',
    contestant1: {
      id: 'c3',
      name: 'Aarav Mehta',
      avatar: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200',
      style: 'Bharatanatyam',
      votes: 380,
      score: 9.6
    },
    contestant2: {
      id: 'c4',
      name: 'Siddharth Sen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      style: 'Kathakali',
      votes: 290,
      score: 8.7
    },
    winnerId: 'c3'
  },
  {
    id: 'qf_3',
    round: 'QUARTER',
    matchTitle: 'Quarterfinal 3 • Grace & Mudra',
    contestant1: {
      id: 'c5',
      name: 'Neha Verma',
      avatar: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=200',
      style: 'Odissi',
      votes: 350,
      score: 9.4
    },
    contestant2: {
      id: 'c6',
      name: 'Ananya Roy',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      style: 'Manipuri',
      votes: 280,
      score: 8.8
    },
    winnerId: 'c5'
  },
  {
    id: 'qf_4',
    round: 'QUARTER',
    matchTitle: 'Quarterfinal 4 • Taalam Showdown',
    contestant1: {
      id: 'c7',
      name: 'Ishita Chouhan',
      avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200',
      style: 'Kathak',
      votes: 310,
      score: 9.1
    },
    contestant2: {
      id: 'c8',
      name: 'Tanvi Joshi',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
      style: 'Kuchipudi',
      votes: 275,
      score: 8.6
    },
    winnerId: 'c7'
  },

  // Semifinals
  {
    id: 'sf_1',
    round: 'SEMI',
    matchTitle: 'Semifinal 1 • Kathak vs Bharatanatyam',
    contestant1: {
      id: 'c1',
      name: 'Riya Shah',
      avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200',
      style: 'Kathak',
      votes: 560,
      score: 9.8
    },
    contestant2: {
      id: 'c3',
      name: 'Aarav Mehta',
      avatar: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200',
      style: 'Bharatanatyam',
      votes: 520,
      score: 9.6
    },
    winnerId: 'c1'
  },
  {
    id: 'sf_2',
    round: 'SEMI',
    matchTitle: 'Semifinal 2 • Odissi vs Kathak',
    contestant1: {
      id: 'c5',
      name: 'Neha Verma',
      avatar: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=200',
      style: 'Odissi',
      votes: 490,
      score: 9.4
    },
    contestant2: {
      id: 'c7',
      name: 'Ishita Chouhan',
      avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200',
      style: 'Kathak',
      votes: 410,
      score: 9.1
    },
    winnerId: 'c5'
  },

  // Grand Finale
  {
    id: 'fn_1',
    round: 'FINAL',
    matchTitle: '🏆 Grand Championship Battle',
    contestant1: {
      id: 'c1',
      name: 'Riya Shah',
      avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200',
      style: 'Kathak (Taal Dhamar)',
      votes: 890,
      score: 9.9
    },
    contestant2: {
      id: 'c5',
      name: 'Neha Verma',
      avatar: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=200',
      style: 'Odissi (Pallavi)',
      votes: 780,
      score: 9.5
    },
    winnerId: 'c1'
  }
];

interface TournamentBracketProps {
  language: Language;
  onOpenVideo?: (videoUrl: string, title: string) => void;
}

export const TournamentBracket: React.FC<TournamentBracketProps> = ({ language, onOpenVideo }) => {
  const t = translations[language];
  const [activeRound, setActiveRound] = useState<'QUARTER' | 'SEMI' | 'FINAL'>('FINAL');
  const [userVotes, setUserVotes] = useState<{ [matchId: string]: string }>({});
  const [matchVotes, setMatchVotes] = useState<{ [matchId: string]: { c1: number; c2: number } }>(
    BRACKET_DATA.reduce(
      (acc, m) => ({
        ...acc,
        [m.id]: { c1: m.contestant1.votes, c2: m.contestant2.votes }
      }),
      {}
    )
  );

  const handleVote = (matchId: string, contestantId: string, contestantName: string) => {
    if (userVotes[matchId]) {
      showAppAlert('Already Voted', `You have already cast your vote in this battle!`);
      return;
    }

    setUserVotes((prev) => ({ ...prev, [matchId]: contestantId }));
    setMatchVotes((prev) => {
      const match = prev[matchId];
      const targetMatch = BRACKET_DATA.find((m) => m.id === matchId);
      const isC1 = targetMatch?.contestant1.id === contestantId;
      return {
        ...prev,
        [matchId]: {
          c1: isC1 ? match.c1 + 1 : match.c1,
          c2: !isC1 ? match.c2 + 1 : match.c2
        }
      };
    });

    showAppAlert('Vote Counted! ⚔️', `You supported ${contestantName}! The live voting bar has updated.`);
  };

  const filteredMatches = BRACKET_DATA.filter((m) => m.round === activeRound);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerTop}>
          <Ionicons name="git-network-outline" size={20} color="#00F2FE" />
          <Text style={styles.bannerTag}>KNOCKOUT TOURNAMENT ARENA</Text>
        </View>
        <Text style={styles.bannerTitle}>Classical Dance Championship Bracket</Text>
        <Text style={styles.bannerSubtitle}>
          Artists advance through head-to-head battles based on Judge Scores + Audience Live Votes.
        </Text>
      </View>

      {/* Round Switcher Tabs */}
      <View style={styles.roundTabs}>
        <TouchableOpacity
          style={[styles.roundTab, activeRound === 'QUARTER' && styles.roundTabActive]}
          onPress={() => setActiveRound('QUARTER')}
          activeOpacity={0.8}
        >
          <Text style={[styles.roundTabText, activeRound === 'QUARTER' && styles.roundTabTextActive]}>
            Quarterfinals (4)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roundTab, activeRound === 'SEMI' && styles.roundTabActive]}
          onPress={() => setActiveRound('SEMI')}
          activeOpacity={0.8}
        >
          <Text style={[styles.roundTabText, activeRound === 'SEMI' && styles.roundTabTextActive]}>
            Semifinals (2)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roundTab, activeRound === 'FINAL' && styles.roundTabActiveFinal]}
          onPress={() => setActiveRound('FINAL')}
          activeOpacity={0.8}
        >
          <Ionicons name="trophy" size={14} color={activeRound === 'FINAL' ? '#F59E0B' : '#94A3B8'} />
          <Text style={[styles.roundTabText, activeRound === 'FINAL' && styles.roundTabTextActiveFinal]}>
            Grand Finale
          </Text>
        </TouchableOpacity>
      </View>

      {/* Battles List */}
      <View style={styles.battlesList}>
        {filteredMatches.map((match) => {
          const currentVotes = matchVotes[match.id] || {
            c1: match.contestant1.votes,
            c2: match.contestant2.votes
          };
          const totalVotes = currentVotes.c1 + currentVotes.c2;
          const p1 = Math.round((currentVotes.c1 / totalVotes) * 100);
          const p2 = 100 - p1;
          const userVotedId = userVotes[match.id];

          return (
            <View key={match.id} style={styles.matchCard}>
              {/* Match Header */}
              <View style={styles.matchHeader}>
                <Text style={styles.matchTitle}>{match.matchTitle}</Text>
                <View style={styles.liveTag}>
                  <Text style={styles.liveTagText}>LIVE VOTING</Text>
                </View>
              </View>

              {/* Head to Head Area */}
              <View style={styles.h2hRow}>
                {/* Contestant 1 */}
                <View style={[styles.contestantCol, match.winnerId === match.contestant1.id && styles.winnerCol]}>
                  {match.winnerId === match.contestant1.id && (
                    <View style={styles.advancingBadge}>
                      <Ionicons name="star" size={10} color="#F59E0B" />
                      <Text style={styles.advancingText}>ADVANCING</Text>
                    </View>
                  )}
                  <Image source={{ uri: match.contestant1.avatar }} style={styles.cAvatar} />
                  <Text style={styles.cName} numberOfLines={1}>{match.contestant1.name}</Text>
                  <Text style={styles.cStyle}>{match.contestant1.style}</Text>
                  <View style={styles.scorePill}>
                    <Text style={styles.scoreText}>★ {match.contestant1.score}</Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.voteBtn,
                      userVotedId === match.contestant1.id && styles.voteBtnActive
                    ]}
                    onPress={() => handleVote(match.id, match.contestant1.id, match.contestant1.name)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={userVotedId === match.contestant1.id ? 'checkmark-circle' : 'thumbs-up'}
                      size={14}
                      color="#FFFFFF"
                    />
                    <Text style={styles.voteBtnText}>
                      {userVotedId === match.contestant1.id ? 'Voted' : 'Vote'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* VS Badge */}
                <View style={styles.vsContainer}>
                  <View style={styles.vsCircle}>
                    <Text style={styles.vsText}>VS</Text>
                  </View>
                </View>

                {/* Contestant 2 */}
                <View style={[styles.contestantCol, match.winnerId === match.contestant2.id && styles.winnerCol]}>
                  {match.winnerId === match.contestant2.id && (
                    <View style={styles.advancingBadge}>
                      <Ionicons name="star" size={10} color="#F59E0B" />
                      <Text style={styles.advancingText}>ADVANCING</Text>
                    </View>
                  )}
                  <Image source={{ uri: match.contestant2.avatar }} style={styles.cAvatar} />
                  <Text style={styles.cName} numberOfLines={1}>{match.contestant2.name}</Text>
                  <Text style={styles.cStyle}>{match.contestant2.style}</Text>
                  <View style={styles.scorePill}>
                    <Text style={styles.scoreText}>★ {match.contestant2.score}</Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.voteBtn,
                      userVotedId === match.contestant2.id && styles.voteBtnActive
                    ]}
                    onPress={() => handleVote(match.id, match.contestant2.id, match.contestant2.name)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={userVotedId === match.contestant2.id ? 'checkmark-circle' : 'thumbs-up'}
                      size={14}
                      color="#FFFFFF"
                    />
                    <Text style={styles.voteBtnText}>
                      {userVotedId === match.contestant2.id ? 'Voted' : 'Vote'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Live Voting Progress Bar */}
              <View style={styles.voteBarWrapper}>
                <View style={styles.votePercentRow}>
                  <Text style={styles.percentTextLeft}>{p1}% ({currentVotes.c1})</Text>
                  <Text style={styles.percentLabel}>Audience Vote Ratio</Text>
                  <Text style={styles.percentTextRight}>{p2}% ({currentVotes.c2})</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFillLeft, { width: `${p1}%` }]} />
                  <View style={[styles.barFillRight, { width: `${p2}%` }]} />
                </View>
              </View>
            </View>
          );
        })}
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
  banner: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.3)',
    gap: 6
  },
  bannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  bannerTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#00F2FE',
    letterSpacing: 1
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16
  },
  roundTabs: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 4
  },
  roundTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 4
  },
  roundTabActive: {
    backgroundColor: Colors.primary
  },
  roundTabActiveFinal: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: '#F59E0B'
  },
  roundTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8'
  },
  roundTabTextActive: {
    color: '#FFFFFF'
  },
  roundTabTextActiveFinal: {
    color: '#F59E0B',
    fontWeight: '800'
  },
  battlesList: {
    gap: 16
  },
  matchCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    gap: 14
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  matchTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E2E8F0'
  },
  liveTag: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)'
  },
  liveTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#EF4444',
    letterSpacing: 0.5
  },
  h2hRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8
  },
  contestantCol: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 4,
    position: 'relative'
  },
  winnerCol: {
    borderColor: 'rgba(245, 158, 11, 0.5)',
    backgroundColor: 'rgba(245, 158, 11, 0.05)'
  },
  advancingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4
  },
  advancingText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#F59E0B'
  },
  cAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#00F2FE'
  },
  cName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4
  },
  cStyle: {
    fontSize: 11,
    color: '#A7F3D0',
    fontWeight: '500'
  },
  scorePill: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 2
  },
  scoreText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F59E0B'
  },
  voteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    marginTop: 6
  },
  voteBtnActive: {
    backgroundColor: '#059669'
  },
  voteBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  vsContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  vsCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  vsText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#00F2FE'
  },
  voteBarWrapper: {
    gap: 6
  },
  votePercentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  percentTextLeft: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00F2FE'
  },
  percentLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600'
  },
  percentTextRight: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F43F5E'
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  barFillLeft: {
    height: '100%',
    backgroundColor: '#00F2FE'
  },
  barFillRight: {
    height: '100%',
    backgroundColor: '#F43F5E'
  }
});
