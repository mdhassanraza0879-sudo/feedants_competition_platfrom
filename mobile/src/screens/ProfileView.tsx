import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Language } from '../constants/translations';
import { IUser } from '../types';
import { showAppAlert } from '../utils/alert';

interface ProfileViewProps {
  user: IUser | null;
  isRegistered: boolean;
  language: Language;
  onNavigateToCompetition: () => void;
  onSwitchUser?: (userType: 'REGISTERED' | 'NEW') => void;
  onResetDB?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  isRegistered,
  language,
  onNavigateToCompetition,
  onSwitchUser,
  onResetDB
}) => {
  const [withdrawLoading, setWithdrawLoading] = React.useState(false);

  const handleWithdraw = () => {
    setWithdrawLoading(true);
    setTimeout(() => {
      setWithdrawLoading(false);
      showAppAlert(
        'Withdrawal Information 💳',
        'Current referral balance: ₹ 10.00.\nMinimum withdrawal threshold is ₹ 50.\n\nKeep sharing your referral link with friends to earn ₹10 for every verified signup!'
      );
    }, 350);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Profile Header Card */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri:
              user?.avatarUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
          }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user?.name || 'Priya Patel'}</Text>
          <Text style={styles.email}>{user?.email || 'priya@feedants.com'}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#059669" />
            <Text style={styles.verifiedText}>
              {isRegistered ? 'Registered Participant' : 'Guest / New User'}
            </Text>
          </View>
        </View>
      </View>

      {/* Evaluator / Demo User Switcher Card */}
      <View style={styles.evaluatorCard}>
        <View style={styles.evaluatorHeader}>
          <Ionicons name="swap-horizontal-outline" size={18} color="#007A78" />
          <Text style={styles.evaluatorTitle}>Evaluation &amp; Testing Controls</Text>
        </View>
        <Text style={styles.evaluatorDesc}>
          Toggle user state below to test both the registration flow and the submission flow:
        </Text>

        <View style={styles.evaluatorButtonsRow}>
          <TouchableOpacity
            style={[
              styles.evaluatorBtn,
              isRegistered && styles.evaluatorBtnActive
            ]}
            onPress={() => onSwitchUser && onSwitchUser('REGISTERED')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="checkmark-circle"
              size={15}
              color={isRegistered ? '#FFFFFF' : '#007A78'}
            />
            <Text style={[styles.evaluatorBtnText, isRegistered && styles.evaluatorBtnTextActive]}>
              Registered User
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.evaluatorBtn,
              !isRegistered && styles.evaluatorBtnActive
            ]}
            onPress={() => onSwitchUser && onSwitchUser('NEW')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="person-add"
              size={15}
              color={!isRegistered ? '#FFFFFF' : '#007A78'}
            />
            <Text style={[styles.evaluatorBtnText, !isRegistered && styles.evaluatorBtnTextActive]}>
              New User (Unregistered)
            </Text>
          </TouchableOpacity>
        </View>

        {onResetDB && (
          <TouchableOpacity
            style={styles.resetDbBtn}
            onPress={onResetDB}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh-outline" size={14} color="#64748B" />
            <Text style={styles.resetDbText}>Reset Competition Demo Data</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Wallet & Referral Balance */}
      <View style={styles.walletCard}>
        <View style={styles.walletLeft}>
          <Text style={styles.walletLabel}>Referral Balance</Text>
          <Text style={styles.walletAmount}>₹ 10.00</Text>
        </View>
        <TouchableOpacity
          style={styles.withdrawBtn}
          onPress={handleWithdraw}
          activeOpacity={0.8}
          disabled={withdrawLoading}
        >
          <Text style={styles.withdrawBtnText}>
            {withdrawLoading ? 'Checking...' : 'Withdraw'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Registered Competitions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Competitions</Text>

        <TouchableOpacity
          style={styles.compCard}
          onPress={onNavigateToCompetition}
          activeOpacity={0.85}
        >
          <View style={styles.compIcon}>
            <Ionicons name="trophy-outline" size={24} color="#007A78" />
          </View>
          <View style={styles.compInfo}>
            <Text style={styles.compTitle}>Feedants Classical Dance</Text>
            <Text style={styles.compDate}>Deadline: 10 Aug 26, 11:50 PM</Text>
          </View>
          <View style={isRegistered ? styles.regStatusBadge : styles.notRegStatusBadge}>
            <Text style={isRegistered ? styles.regStatusText : styles.notRegStatusText}>
              {isRegistered ? 'Registered' : 'View / Register'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Account Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.optionsCard}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => showAppAlert('Digital Certificates', 'Certificates are issued after the competition results announcement on 1 Sept 26.')}
          >
            <Ionicons name="ribbon-outline" size={20} color="#007A78" />
            <Text style={styles.optionText}>Certificates &amp; Achievements</Text>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.optionDivider} />

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => showAppAlert('Payment History', 'Payment gateway: Razorpay (Secured).')}
          >
            <Ionicons name="receipt-outline" size={20} color="#007A78" />
            <Text style={styles.optionText}>Transaction History</Text>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.optionDivider} />

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => showAppAlert('Support', 'Contact Feedants Helpdesk at support@feedants.com')}
          >
            <Ionicons name="help-circle-outline" size={20} color="#007A78" />
            <Text style={styles.optionText}>Help &amp; Support</Text>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    gap: 14
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0'
  },
  profileInfo: {
    flex: 1,
    gap: 4
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B'
  },
  email: {
    fontSize: 12,
    color: '#64748B'
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669'
  },
  evaluatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#B2DFDB'
  },
  evaluatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4
  },
  evaluatorTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#007A78'
  },
  evaluatorDesc: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 10,
    lineHeight: 16
  },
  evaluatorButtonsRow: {
    flexDirection: 'row',
    gap: 8
  },
  evaluatorBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },
  evaluatorBtnActive: {
    backgroundColor: '#007A78',
    borderColor: '#007A78'
  },
  evaluatorBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155'
  },
  evaluatorBtnTextActive: {
    color: '#FFFFFF'
  },
  resetDbBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10,
    paddingVertical: 6
  },
  resetDbText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B'
  },
  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EAF6F5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C6EBE4'
  },
  walletLeft: {
    gap: 2
  },
  walletLabel: {
    fontSize: 11,
    color: '#007A78',
    fontWeight: '600'
  },
  walletAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#007A78'
  },
  withdrawBtn: {
    backgroundColor: '#007A78',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8
  },
  withdrawBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  section: {
    gap: 10
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B'
  },
  compCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    gap: 12
  },
  compIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EAF6F5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  compInfo: {
    flex: 1,
    gap: 2
  },
  compTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B'
  },
  compDate: {
    fontSize: 11,
    color: '#64748B'
  },
  regStatusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  regStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669'
  },
  notRegStatusBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  notRegStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007A78'
  },
  optionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden'
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B'
  },
  optionDivider: {
    height: 1,
    backgroundColor: '#F1F5F9'
  }
});
