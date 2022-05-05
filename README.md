# Wordle Practice
An endless game to practice your Wordle skills. Only allows guesses that are official answers, this game can be pretty tough even without hard mode. Built with React and Sass.

[**Click here to try it out!**](https://royerwebdesign.com/projects/wordle-practice/)

## How To Run

Clone the repository and run the following commands:

```bash
$> cd wordle-practice
$> npm install
$> npm run start
```

Your browser should open to http://localhost:3000 after building is complete.

## Strict mode

This game runs on a sort of "strict" mode where the only allowable guesses are the words found in the answer key. If you wish to implement an easier game, simply switch the verification in `/src/lib/words.js` from WORDS imported from `/src/constants/wordlist.js` to VALID_GUESSES imported from `/src/constants/valid_words.js`. Feel free to add a setting that can switch between the two and your pull request will be reviewed and merged if working.