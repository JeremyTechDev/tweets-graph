const parseDate = (dateString: string) => {
  const date = new Date(dateString);

  return {
    date: date.toLocaleDateString('en', {
      dateStyle: 'medium',
    }),
    time: date.toLocaleTimeString('en', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};

export default parseDate;
