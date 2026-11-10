// Self Rating criteria shown on every talk page, in this order.
// To add a criterion, add an entry here, then use its `key` under `ratings:`
// in a talk's front matter.
// Highest possible score (scores run from 1 to ratingMax)
export const ratingMax = 5;

export const ratingCriteria = [
  {
    key: 'learning',
    name: 'Learning Factor',
    question: 'Did someone in the audience learn something new? (Assessed by someone telling me they did.)',
  },
  {
    key: 'fun',
    name: 'Fun Factor',
    question: 'Did I have fun?',
  },
  {
    key: 'laugh',
    name: 'Laugh Factor',
    question: 'Did the audience laugh and demonstrate engagement throughout?',
  },
] as const;
