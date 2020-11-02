const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function formatDate(date) {
  const d = new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

export function toISODate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
