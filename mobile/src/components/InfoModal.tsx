import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string[];
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  onClose,
  title,
  content,
  iconName = 'information-circle'
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
            <View style={styles.iconCircle}>
              <Ionicons name={iconName} size={22} color={Colors.primary} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {content.map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.primary} style={{ marginTop: 2 }} />
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.okBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.okBtnText}>Understood</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 440,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  closeBtn: {
    padding: 4
  },
  body: {
    gap: 12,
    marginBottom: 20
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10
  },
  pointText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 18
  },
  okBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  okBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF'
  }
});
