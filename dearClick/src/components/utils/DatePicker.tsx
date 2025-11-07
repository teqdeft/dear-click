// components/BirthdayPicker.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  /** Expected format: "15 Mar 1995" – can be empty string */
  value: string;
  /** Called with the new formatted string whenever the user picks a date */
  onChange: (dateString: string) => void;
  /** Optional label above the input */
  label?: string;
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/** Parse "15 Mar 1995" → Date object */
const parseDate = (str: string): Date => {
  if (!str) return new Date(); // today – will be overwritten by placeholder

  const parts = str.trim().split(' ');
  if (parts.length !== 3) return new Date();

  const day = parseInt(parts[0], 10);
  const monthIdx = MONTHS.indexOf(parts[1] as any);
  const year = parseInt(parts[2], 10);

  if (Number.isNaN(day) || monthIdx === -1 || Number.isNaN(year)) {
    return new Date();
  }

  return new Date(year, monthIdx, day);
};

/** Format Date → "15 Mar 1995" */
const formatDate = (d: Date): string => {
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function BirthdayPicker({
  value,
  onChange,
  label = 'Birthday',
}: Props) {
  const [show, setShow] = useState(false);
  const [internalDate, setInternalDate] = useState<Date>(() =>
    parseDate(value),
  );

  // Keep internal picker in sync when the API value changes
  useEffect(() => {
    setInternalDate(parseDate(value));
  }, [value]);

  const handleChange = (event: any, selected?: Date) => {
    const newDate = selected ?? internalDate;
    setShow(Platform.OS === 'ios'); // stay open on iOS
    setInternalDate(newDate);
    onChange(formatDate(newDate));
  };

  const displayText = value ? value : 'Select birthday';

  return (
    <View style={styles.container}>
      <Text style={styles.LAbel}>{label}</Text>

      {/* Clickable field */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShow(true)}
        activeOpacity={0.7}
      >
        <Text style={value ? styles.inputText : styles.placeholder}>
          {displayText}
        </Text>
      </TouchableOpacity>

      {/* Date picker */}
      {show && (
        <DateTimePicker
          value={internalDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  LAbel: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 56,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  inputText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  placeholder: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
});
