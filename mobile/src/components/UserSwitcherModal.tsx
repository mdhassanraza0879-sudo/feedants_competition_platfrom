import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { IUser } from '../types';

interface UserSwitcherModalProps {
  visible: boolean;
  onClose: () => void;
  users: IUser[];
  currentUserId: string;
  onSelectUser: (user: IUser) => void;
  onResetDatabase: () => void;
}

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({
  visible,
  onClose,
  users,
  currentUserId,
  onSelectUser,
  onResetDatabase
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Evaluator / User Switcher</Text>
              <Text style={styles.subtitle}>
                Test both Registered & Unregistered states easily
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.usersList}>
            {users.map((user) => {
              const isSelected = user._id === currentUserId;
              return (
                <TouchableOpacity
                  key={user._id}
                  style={[
                    styles.userItem,
                    isSelected && styles.userItemSelected
                  ]}
                  onPress={() => {
                    onSelectUser(user);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={isSelected ? Colors.primary : Colors.textMuted}
                  />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                  {user.name.includes('Priya') && (
                    <View style={styles.badgePreRegistered}>
                      <Text style={styles.badgeText}>Pre-Registered</Text>
                    </View>
                  )}
                  {user.name.includes('Rahul') && (
                    <View style={styles.badgeUnregistered}>
                      <Text style={styles.badgeTextUnregistered}>Not Registered</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              onResetDatabase();
              onClose();
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={16} color={Colors.primary} />
            <Text style={styles.resetBtnText}>Re-seed / Reset Database</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 420,
    padding: 20,
    maxHeight: '80%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
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
  usersList: {
    maxHeight: 240
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
    gap: 12
  },
  userItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary
  },
  userEmail: {
    fontSize: 12,
    color: Colors.textSecondary
  },
  badgePreRegistered: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669'
  },
  badgeUnregistered: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  badgeTextUnregistered: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F1F5F9'
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary
  }
});
