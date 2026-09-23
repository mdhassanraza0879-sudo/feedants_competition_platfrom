import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { translations, Language } from '../constants/translations';
import { IJudgingParameter } from '../types';

interface CompetitionTabsProps {
  about: string;
  judgingParameters: IJudgingParameter[];
  rules: string[];
  eligibility: string[];
  language: Language;
}

type TabKey = 'ABOUT' | 'JUDGING' | 'RULES';

export const CompetitionTabs: React.FC<CompetitionTabsProps> = ({
  about,
  judgingParameters,
  rules,
  eligibility,
  language
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('ABOUT');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const t = translations[language];

  return (
    <View style={styles.container}>
      {/* Tabs Header with clean bottom border */}
      <View style={styles.tabsHeader}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'ABOUT' && styles.tabButtonActive]}
          onPress={() => setActiveTab('ABOUT')}
          activeOpacity={0.7}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'ABOUT' }}
        >
          <Text
            style={[styles.tabText, activeTab === 'ABOUT' && styles.tabTextActive]}
          >
            {t.aboutCompetition}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'JUDGING' && styles.tabButtonActive]}
          onPress={() => setActiveTab('JUDGING')}
          activeOpacity={0.7}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'JUDGING' }}
        >
          <Text
            style={[styles.tabText, activeTab === 'JUDGING' && styles.tabTextActive]}
          >
            {t.judgingParameters}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'RULES' && styles.tabButtonActive]}
          onPress={() => setActiveTab('RULES')}
          activeOpacity={0.7}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'RULES' }}
        >
          <Text
            style={[styles.tabText, activeTab === 'RULES' && styles.tabTextActive]}
          >
            {t.rulesAndEligibility}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {activeTab === 'ABOUT' && (
          <View>
            <Text
              style={styles.aboutText}
              numberOfLines={isExpanded ? undefined : 3}
            >
              {about}
            </Text>

            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => setIsExpanded(!isExpanded)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={isExpanded ? 'View less' : 'View more'}
            >
              <Text style={styles.viewMoreText}>
                {isExpanded ? t.viewLess : t.viewMore}
              </Text>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={16}
                color="#007A78"
              />
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'JUDGING' && (
          <View style={styles.parametersContainer}>
            {judgingParameters.map((param, index) => (
              <View key={index} style={styles.parameterItem}>
                <View style={styles.paramHeader}>
                  <Text style={styles.paramTitle}>{param.parameter}</Text>
                  <View style={styles.weightageBadge}>
                    <Text style={styles.weightageText}>{param.weightage}%</Text>
                  </View>
                </View>
                {param.description && (
                  <Text style={styles.paramDescription}>{param.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {activeTab === 'RULES' && (
          <View style={styles.rulesContainer}>
            <Text style={styles.subSectionTitle}>Rules</Text>
            {rules.map((rule, index) => (
              <View key={index} style={styles.bulletRow}>
                <Ionicons name="checkmark-circle" size={16} color="#007A78" style={{ marginTop: 2 }} />
                <Text style={styles.bulletText}>{rule}</Text>
              </View>
            ))}

            {eligibility && eligibility.length > 0 && (
              <>
                <Text style={[styles.subSectionTitle, { marginTop: 14 }]}>Eligibility</Text>
                {eligibility.map((item, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <Ionicons name="ellipse" size={8} color="#007A78" style={{ marginTop: 6, marginHorizontal: 4 }} />
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 8
  },
  tabsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
    marginBottom: -1.5
  },
  tabButtonActive: {
    borderBottomColor: '#007A78'
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center'
  },
  tabTextActive: {
    color: '#007A78',
    fontWeight: '800'
  },
  contentContainer: {
    paddingTop: 14,
    paddingBottom: 6
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#334155'
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 10,
    paddingVertical: 6
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#007A78'
  },
  parametersContainer: {
    gap: 10
  },
  parameterItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8ECF0'
  },
  paramHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paramTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1
  },
  weightageBadge: {
    backgroundColor: '#EAF6F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  weightageText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#007A78'
  },
  paramDescription: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18
  },
  rulesContainer: {
    gap: 8
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    lineHeight: 20
  }
});
