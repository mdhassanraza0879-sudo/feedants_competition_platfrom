import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { translations, Language } from '../constants/translations';

interface BottomNavProps {
  language: Language;
  activeTab?: string;
  onTabPress?: (tab: string) => void;
  userAvatar?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  language,
  activeTab = 'Competitions',
  onTabPress,
  userAvatar
}) => {
  const t = translations[language];

  return (
    <View style={styles.navBar}>
      {/* Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress && onTabPress('Home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="home-outline"
          size={22}
          color={activeTab === 'Home' ? '#007A78' : '#64748B'}
        />
        <Text
          style={[
            styles.navLabel,
            activeTab === 'Home' && styles.navLabelActive
          ]}
        >
          {t.home}
        </Text>
      </TouchableOpacity>

      {/* Explore */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress && onTabPress('Explore')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="search-outline"
          size={22}
          color={activeTab === 'Explore' ? '#007A78' : '#64748B'}
        />
        <Text
          style={[
            styles.navLabel,
            activeTab === 'Explore' && styles.navLabelActive
          ]}
        >
          {t.explore}
        </Text>
      </TouchableOpacity>

      {/* Center (+) Action Button */}
      <TouchableOpacity
        style={styles.centerButtonContainer}
        onPress={() => onTabPress && onTabPress('Create')}
        activeOpacity={0.85}
      >
        <View style={styles.centerButton}>
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      {/* Competitions (Active) */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress && onTabPress('Competitions')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="trophy"
          size={22}
          color={activeTab === 'Competitions' ? '#007A78' : '#64748B'}
        />
        <Text
          style={[
            styles.navLabel,
            activeTab === 'Competitions' && styles.navLabelActive
          ]}
        >
          {t.competitions}
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress && onTabPress('Profile')}
        activeOpacity={0.7}
      >
        {userAvatar ? (
          <Image
            source={{ uri: userAvatar }}
            style={[
              styles.avatarImage,
              activeTab === 'Profile' && styles.avatarActive
            ]}
          />
        ) : (
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={activeTab === 'Profile' ? '#007A78' : '#64748B'}
          />
        )}
        <Text
          style={[
            styles.navLabel,
            activeTab === 'Profile' && styles.navLabelActive
          ]}
        >
          {t.profile}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    paddingBottom: 12
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 6,
    cursor: 'pointer' as any
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 3
  },
  navLabelActive: {
    color: '#007A78',
    fontWeight: '800'
  },
  centerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    cursor: 'pointer' as any
  },
  centerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007A78',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  avatarActive: {
    borderWidth: 2,
    borderColor: '#007A78'
  }
});
