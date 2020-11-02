export default function savedArticles(length) {
  let lastPart;
  switch (length) {
    case 1: {
      lastPart = 'сохранённая статья';
      break;
    }
    case 2: {
      lastPart = 'сохранённые статьи';
      break;
    }
    default: {
      lastPart = 'сохранённых статей';
      break;
    }
  }
  return lastPart;
}
