function formatMonthAndYear(value) {
  const dateObj = new Date(value);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: '2-digit',
  }).format(dateObj);
}
function formatDate(value) {
  const dateObj = new Date(value);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
  }).format(dateObj);
}
export { formatDate, formatMonthAndYear };
