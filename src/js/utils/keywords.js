export function getOrderedKeywordsByUsage(cards) {
  const keywords = cards.reduce((result, card) => {
    /* eslint-disable-next-line no-param-reassign */
    result[card.keyword] = (result[card.keyword] || 0) + 1;
    return result;
  }, {});

  return Object.keys(keywords)
    .map((keyword) => ({ keyword, hitCount: keywords[keyword] }))
    .sort((a, b) => b.hitCount - a.hitCount);
}

export function formatKeywords(keywords) {
  if (keywords.length > 3) {
    return `${keywords.slice(0, 2).map(({ keyword }) => `<span class="summary__keyword"">${keyword}</span>`).join(', ')} и <span class="summary__keyword"">ещё ${keywords.length - 2}-м другим</span>`;
  }

  let formattedKeywords = keywords.map(({ keyword }) => `<span class="summary__keyword"">${keyword}</span>`);
  if (formattedKeywords.length > 1) {
    formattedKeywords[formattedKeywords.length - 2] = `${formattedKeywords[formattedKeywords.length - 2]} и ${formattedKeywords[formattedKeywords.length - 1]}`;
    formattedKeywords = formattedKeywords.slice(0, -1);
  }
  return formattedKeywords.join(', ');
}
