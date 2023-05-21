import { rest } from 'msw';

let index = 0;

export const handlers = [
  rest.get('/flashcards/:level', (req, res, ctx) => {
    index = index === cards.length - 1 ? 0 : index + 1;
    return res(ctx.json(cards[index]));
  }),
  rest.post('/register', (req, res, ctx) => {
    console.log(req.body);
    return res();
  })
];

const cards = [
  {
    words: 'honest, frank, candid, straightforward',
    kanji: '正直',
    hiragana: 'しょうじき'
  },
  {
    words: 'equality, impartiality, evenness',
    kanji: '平等',
    hiragana: 'びょうどう'
  }
];
