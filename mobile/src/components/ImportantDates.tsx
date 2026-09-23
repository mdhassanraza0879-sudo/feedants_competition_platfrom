import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { translations, Language } from '../constants/translations';

interface ImportantDatesProps {
  registrationDeadline: string;
  submissionStart: string;
  submissionEnd: string;
  resultDate: string;
  language: Language;
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = String(d.getFullYear()).slice(-2);

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeFormatted = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    return {
      date: `${day} ${month} ${year}`,
      time: timeFormatted
    };
  } catch (e) {
    return { date: dateStr, time: '' };
  }
};

export const ImportantDates: React.FC<ImportantDatesProps> = ({
  registrationDeadline,
  submissionStart,
  submissionEnd,
  resultDate,
  language
}) => {
  const t = translations[language];

  const regDeadlineFmt = formatDate(registrationDeadline);
  const subStartFmt = formatDate(submissionStart);
  const subEndFmt = formatDate(submissionEnd);
  const resultDateFmt = formatDate(resultDate);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.importantDates}</Text>

      <View style={styles.gridCard}>
        {/* Top Row */}
        <View style={styles.row}>
          {/* Register Before */}
          <View style={[styles.gridCell, styles.cellRightBorder]}>
            <Ionicons name="calendar-outline" size={24} color={Colors.primary} style={styles.icon} />
            <View style={styles.cellContent}>
              <Text style={styles.cellLabel}>{t.registerBefore}</Text>
              <Text style={styles.cellDate}>{regDeadlineFmt.date}</Text>
              <Text style={styles.cellTime}>{regDeadlineFmt.time}</Text>
            </View>
          </View>

          {/* Submission Starts */}
          <View style={styles.gridCell}>
            <Ionicons name="paper-plane-outline" size={24} color={Colors.primary} style={styles.icon} />
            <View style={styles.cellContent}>
              <Text style={styles.cellLabel}>{t.submissionStarts}</Text>
              <Text style={styles.cellDate}>{subStartFmt.date}</Text>
              <Text style={styles.cellTime}>{subStartFmt.time}</Text>
            </View>
          </View>
        </View>

        {/* Horizontal Divider */}
        <View style={styles.horizontalDivider} />

        {/* Bottom Row */}
        <View style={styles.row}>
          {/* Submission Ends */}
          <View style={[styles.gridCell, styles.cellRightBorder]}>
            <Ionicons name="cloud-upload-outline" size={24} color={Colors.primary} style={styles.icon} />
            <View style={styles.cellContent}>
              <Text style={styles.cellLabel}>{t.submissionEnds}</Text>
              <Text style={styles.cellDate}>{subEndFmt.date}</Text>
              <Text style={styles.cellTime}>{subEndFmt.time}</Text>
            </View>
          </View>

          {/* Result Date */}
          <View style={styles.gridCell}>
            <Ionicons name="trophy-outline" size={24} color={Colors.primary} style={styles.icon} />
            <View style={styles.cellContent}>
              <Text style={styles.cellLabel}>{t.resultDate}</Text>
              <Text style={styles.cellDate}>{resultDateFmt.date}</Text>
              <Text style={styles.cellTime}>{resultDateFmt.time}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 10
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    overflow: 'hidden'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#F1F5F9'
  },
  gridCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14
  },
  cellRightBorder: {
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9'
  },
  icon: {
    marginRight: 10,
    marginTop: 2
  },
  cellContent: {
    flex: 1
  },
  cellLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2
  },
  cellDate: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary
  },
  cellTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 1
  }
});
