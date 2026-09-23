import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { showAppAlert } from '../utils/alert';

interface CreateModalProps {
  visible: boolean;
  onClose: () => void;
  onOpenUpload: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  visible,
  onClose,
  onOpenUpload
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create / Submit</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Action 1: Upload Submission */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => {
              onClose();
              onOpenUpload();
            }}
            activeOpacity={0.85}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="cloud-upload" size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Upload Performance Submission</Text>
              <Text style={styles.actionDesc}>Submit your dance video entry for judging and evaluation.</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>

          {/* Action 2: Host a Competition */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => {
              onClose();
              showAppAlert(
                'Host a Competition',
                'Organizer portal is in early access. Contact partnerships@feedants.com to host your classical or modern dance event!'
              );
            }}
            activeOpacity={0.85}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="trophy" size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Host a Competition</Text>
              <Text style={styles.actionDesc}>Create your own tournament, invite artists, and set judging criteria.</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 14
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  closeBtn: {
    padding: 4
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionInfo: {
    flex: 1,
    gap: 2
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  actionDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16
  }
});
