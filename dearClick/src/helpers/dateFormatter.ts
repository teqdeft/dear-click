import moment from 'moment';

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '-'; // handle null/undefined/empty

  const formatted = moment(dateString, moment.ISO_8601, true).isValid()
    ? moment(dateString).format('DD-MM-YYYY') : '--';

  return formatted;
};
