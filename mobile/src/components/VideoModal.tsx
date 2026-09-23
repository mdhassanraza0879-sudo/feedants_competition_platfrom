import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface VideoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  videoUrl?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title} numberOfLines={1}>{title}</Text>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Video Container */}
          <View style={styles.videoWrapper}>
            {Platform.OS === 'web' ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                  backgroundColor: '#000000',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <View style={styles.fallbackContainer}>
                <Ionicons name="videocam" size={48} color={Colors.primary} />
                <Text style={styles.fallbackText}>Playing Video Stream</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 480,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  headerText: {
    flex: 1,
    marginRight: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2
  },
  closeBtn: {
    padding: 4
  },
  videoWrapper: {
    width: '100%',
    height: 270,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  fallbackText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  }
});
