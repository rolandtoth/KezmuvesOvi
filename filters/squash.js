/**
 * Make a search index string by removing duplicated words
 * and removing less useful, common short words
 *
 * @param {String} text
 */
export default function(text) {
  let content = String(text);

  // remove all html elements
  let re = /(<.+?>)/gi;
  let plain = content.replace(re, '');
  re = /(&.+?;)/gi;
  plain = plain.replace(re, '');

  // remove duplicated words
  let words = plain.split(' ');
  let deduped = [...(new Set(words))];
  let dedupedStr = deduped.join(' ');

  // remove short and less meaningful words
  let result = dedupedStr.replace(/\b(\.|\,|the|a|an|and|am|all|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi, '');
  //remove newlines, and punctuation
  result = result.replace(/\.|\,|\?|-|—|\n/g, '');
  //remove repeated spaces
  result = result.replace(/[ ]{2,}/g, ' ');

  return result;
}
