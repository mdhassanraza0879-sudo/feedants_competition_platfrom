import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { translations, Language } from '../constants/translations';
import { IReview } from '../types';

interface ReviewsSectionProps {
  reviews: IReview[];
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, language }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const t = translations[language];

  return (
    <View style={styles.container}>
      {/* Clickable Card matching reference screenshot */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Hear From Our Users"
      >
        <View style={styles.iconCircle}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#1E293B" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{t.hearFromUsers}</Text>
          <Text style={styles.subtitle}>{t.seeWhatParticipantsSay}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
      </TouchableOpacity>

      {/* Ad Here Banner */}
      <View style={styles.adBanner}>
        <Ionicons name="megaphone-outline" size={15} color="#94A3B8" />
        <Text style={styles.adText}>{t.adHere}</Text>
      </View>

      {/* Reviews Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.hearFromUsers}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close reviews"
              >
                <Ionicons name="close" size={22} color="#1E293B" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.reviewsList}>
              {reviews.map((rev, index) => (
                <View key={rev._id || index} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Image
                      source={{ uri: rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }}
                      style={styles.reviewerAvatar}
                    />
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>{rev.userName}</Text>
                      <View style={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Ionicons
                            key={star}
                            name={star <= rev.rating ? 'star' : 'star-outline'}
                            size={14}
                            color="#F59E0B"
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{rev.comment}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 6
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B'
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2
  },
  adBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 4,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  adText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B'
  },
  closeButton: {
    padding: 4
  },
  reviewsList: {
    gap: 12,
    paddingBottom: 20
  },
  reviewCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
  },
  reviewerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E2E8F0'
  },
  reviewerInfo: {
    flex: 1
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B'
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2
  },
  reviewComment: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18
  }
});
