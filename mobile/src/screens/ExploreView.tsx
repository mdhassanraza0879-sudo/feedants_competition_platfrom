import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ListRenderItemInfo
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Language } from '../constants/translations';
import { ALL_1000_SONGS, SongCompetition } from '../data/songsCatalog';

interface ExploreViewProps {
  language: Language;
  onNavigateToCompetition: () => void;
}

const CATEGORIES = [
  'All',
  'Classical Dance',
  'Kathak',
  'Bollywood',
  'Bharatanatyam',
  'Folk Dance',
  'Sufi & Devotional'
];

export const ExploreView: React.FC<ExploreViewProps> = ({ language, onNavigateToCompetition }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFeeFilter, setSelectedFeeFilter] = useState<string>('All');

  // Filter 1000 songs efficiently
  const filteredSongs = useMemo(() => {
    let result = ALL_1000_SONGS;

    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (selectedFeeFilter === 'Under ₹50') {
      result = result.filter(item => item.entryFee < 50);
    } else if (selectedFeeFilter === '₹50 - ₹100') {
      result = result.filter(item => item.entryFee >= 50 && item.entryFee <= 100);
    } else if (selectedFeeFilter === '₹100+') {
      result = result.filter(item => item.entryFee > 100);
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        item =>
          item.songTitle.toLowerCase().includes(q) ||
          item.artistOrAlbum.toLowerCase().includes(q) ||
          item.judge.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          `₹${item.entryFee}`.includes(q) ||
          item.entryFee.toString().includes(q)
      );
    }

    return result;
  }, [selectedCategory, selectedFeeFilter, searchQuery]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Title & Subtitle */}
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title}>Explore Songs & Contests</Text>
          <Text style={styles.subtitle}>
            {filteredSongs.length} of 1,000 competitions available with entry fees
          </Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>1,000 Songs</Text>
        </View>
      </View>

      {/* Highlights Banner */}
      <View style={styles.bannerCard}>
        <Ionicons name="musical-notes" size={24} color="#007A78" />
        <View style={styles.bannerTextCol}>
          <Text style={styles.bannerTitle}>Feedants All-India Song Arena</Text>
          <Text style={styles.bannerSub}>
            Participate in 1000+ classical & contemporary tracks. Entry fees start from ₹29!
          </Text>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by song name, movie, judge, or fee (e.g. 99)..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.textMuted}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Fee Filter Chips */}
      <View style={styles.feeFilterRow}>
        <Text style={styles.filterLabel}>Entry Fee:</Text>
        {['All', 'Under ₹50', '₹50 - ₹100', '₹100+'].map((fee) => (
          <TouchableOpacity
            key={fee}
            style={[styles.feeChip, selectedFeeFilter === fee && styles.feeChipActive]}
            onPress={() => setSelectedFeeFilter(fee)}
            activeOpacity={0.7}
          >
            <Text style={[styles.feeChipText, selectedFeeFilter === fee && styles.feeChipTextActive]}>
              {fee}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category Pills */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}
        renderItem={({ item: cat }) => (
          <TouchableOpacity
            style={[styles.catPill, selectedCategory === cat && styles.catPillActive]}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<SongCompetition>) => {
      const isUrgent = item.status === 'Closing Soon';
      const isFilling = item.status === 'Filling Fast';

      return (
        <TouchableOpacity
          style={styles.card}
          onPress={onNavigateToCompetition}
          activeOpacity={0.88}
        >
          {/* Card Left Image */}
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.playIconOverlay}>
              <Ionicons name="play" size={14} color="#FFFFFF" />
            </View>
          </View>

          {/* Card Body */}
          <View style={styles.cardBody}>
            {/* Badges Row */}
            <View style={styles.cardBadgeRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  isUrgent && styles.statusBadgeUrgent,
                  isFilling && styles.statusBadgeFilling
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    isUrgent && styles.statusTextUrgent,
                    isFilling && styles.statusTextFilling
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            {/* Song Title & Album */}
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.songTitle}
            </Text>
            <Text style={styles.cardMeta} numberOfLines={1}>
              🎵 {item.artistOrAlbum} • Judge: {item.judge}
            </Text>

            {/* Spots & Duration */}
            <View style={styles.spotsRow}>
              <Ionicons name="people-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.spotsText}>
                {item.spotsLeft} / {item.spotsTotal} spots left • {item.duration}
              </Text>
            </View>

            {/* Card Footer: Prize Pool & Entry Fee */}
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.footerLabel}>Prize Pool</Text>
                <Text style={styles.prizeText}>₹ {item.prizePool.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.feeBox}>
                <Text style={styles.feeLabel}>Entry Fee</Text>
                <Text style={styles.feeValue}>₹ {item.entryFee}</Text>
              </View>
              <View style={styles.joinBtn}>
                <Text style={styles.joinBtnText}>Join</Text>
                <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [onNavigateToCompetition]
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={filteredSongs}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      initialNumToRender={15}
      maxToRenderPerBatch={15}
      windowSize={7}
      removeClippedSubviews={true}
      getItemLayout={(_, index) => ({
        length: 140,
        offset: 140 * index,
        index
      })}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={40} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>No songs found</Text>
          <Text style={styles.emptySub}>Try searching for another song title or resetting filters.</Text>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedFeeFilter('All');
            }}
          >
            <Text style={styles.resetBtnText}>Reset All Filters</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
    gap: 12
  },
  headerContainer: {
    marginBottom: 4
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2
  },
  countBadge: {
    backgroundColor: '#E6F4F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007A7833'
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007A78'
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#CCECE8',
    gap: 12
  },
  bannerTextCol: {
    flex: 1
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#007A78'
  },
  bannerSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 15
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    marginBottom: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    outlineStyle: 'none' as any
  },
  feeFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    flexWrap: 'wrap'
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginRight: 2
  },
  feeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  feeChipActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A'
  },
  feeChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary
  },
  feeChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  categoriesRow: {
    gap: 8,
    paddingBottom: 10
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  catPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary
  },
  catText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary
  },
  catTextActive: {
    color: '#FFFFFF',
    fontWeight: '700'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden',
    height: 128
  },
  imageWrapper: {
    width: 110,
    height: '100%',
    position: 'relative'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E2E8F0'
  },
  playIconOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardBody: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  cardBadgeRow: {
    flexDirection: 'row',
    gap: 6
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.textSecondary
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#059669'
  },
  statusBadgeUrgent: {
    backgroundColor: '#FEE2E2'
  },
  statusTextUrgent: {
    color: '#DC2626'
  },
  statusBadgeFilling: {
    backgroundColor: '#FEF3C7'
  },
  statusTextFilling: {
    color: '#D97706'
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  cardMeta: {
    fontSize: 11,
    color: Colors.textSecondary
  },
  spotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  spotsText: {
    fontSize: 10,
    color: Colors.textMuted
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9'
  },
  footerLabel: {
    fontSize: 9,
    color: Colors.textMuted
  },
  prizeText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary
  },
  feeBox: {
    alignItems: 'center'
  },
  feeLabel: {
    fontSize: 9,
    color: Colors.textMuted
  },
  feeValue: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4
  },
  joinBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary
  },
  emptySub: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center'
  },
  resetBtn: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 8
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12
  }
});
