import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Language } from '../constants/translations';
import { ISubmission } from '../types';

import { showAppAlert } from '../utils/alert';

interface SubmissionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, videoUrl: string, description: string) => Promise<void>;
  existingSubmission?: ISubmission | null;
  language: Language;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  visible,
  onClose,
  onSubmit,
  existingSubmission,
  language
}) => {
  const [title, setTitle] = useState(existingSubmission?.title || '');
  const [videoUrl, setVideoUrl] = useState(existingSubmission?.videoUrl || '');
  const [description, setDescription] = useState(existingSubmission?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      showAppAlert('Missing Field', 'Please enter a title for your classical dance submission.');
      return;
    }
    if (!videoUrl.trim()) {
      showAppAlert('Missing Field', 'Please provide a valid video URL (e.g. YouTube, Vimeo, Google Drive).');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(title.trim(), videoUrl.trim(), description.trim());
      onClose();
    } catch (err: any) {
      showAppAlert('Submission Error', err.response?.data?.message || err.message || 'Failed to submit entry');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Text style={styles.title}>
              {existingSubmission ? 'Your Submission' : 'Upload Submission'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {existingSubmission ? (
            <View style={styles.viewMode}>
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-done-circle" size={18} color={Colors.primary} />
                <Text style={styles.statusText}>Status: {existingSubmission.status}</Text>
              </View>

              <Text style={styles.label}>Title</Text>
              <Text style={styles.submittedValue}>{existingSubmission.title}</Text>

              <Text style={styles.label}>Video URL</Text>
              <Text style={styles.submittedUrl}>{existingSubmission.videoUrl}</Text>

              {existingSubmission.description ? (
                <>
                  <Text style={styles.label}>Notes</Text>
                  <Text style={styles.submittedValue}>{existingSubmission.description}</Text>
                </>
              ) : null}

              <Text style={styles.submittedDate}>
                Submitted on {new Date(existingSubmission.submittedAt).toLocaleDateString()}
              </Text>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.inputLabel}>Performance Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Kathak Tarana in Teen Taal"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={Colors.textMuted}
              />

              <Text style={styles.inputLabel}>Video Link (YouTube, Drive, etc.) *</Text>
              <TextInput
                style={styles.input}
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChangeText={setVideoUrl}
                autoCapitalize="none"
                keyboardType="url"
                placeholderTextColor={Colors.textMuted}
              />

              <Text style={styles.inputLabel}>Notes / Performance Details</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Details regarding your composition, costume, or taal..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                placeholderTextColor={Colors.textMuted}
              />

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit}
                disabled={isSubmitting}
                activeOpacity={0.85}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitBtnText}>Submit Entry</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
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
    maxHeight: '85%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  closeButton: {
    padding: 4
  },
  form: {
    gap: 12
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 14,
    color: Colors.textPrimary
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  viewMode: {
    gap: 10
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryLight,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary
  },
  submittedValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary
  },
  submittedUrl: {
    fontSize: 13,
    color: Colors.primary,
    textDecorationLine: 'underline'
  },
  submittedDate: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 8
  }
});
