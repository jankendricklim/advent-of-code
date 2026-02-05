import fp from 'lodash/fp';

// const path = new URL("./sample_input.txt", import.meta.url);
const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const input = await text.text();

const strings = input.split('\n');

const vowel = 'aeiou';
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const vowels = vowel.split('');
const letters = alphabet.split('');

const getLetterPairs = (letters: string[], remainingLetters: string[]) => {
    if (!remainingLetters.length) return letters;

    if (remainingLetters.length < 2) return [...letters, remainingLetters.join('')];

    const [firstLetter, secondLetter, ...letterTail] = remainingLetters;
    return getLetterPairs([...letters, `${firstLetter}${secondLetter ? secondLetter : ''}`], [secondLetter ?? '', ...letterTail]); 
}

const getLetterNeighbors = (letters: string[], remainingLetters: string[]) => {
    if (remainingLetters.length < 3) return letters

    const [firstLetter, secondLetter, thirdLetter, ...letterTail] = remainingLetters;

    if (firstLetter === thirdLetter) return getLetterNeighbors([...letters, `${firstLetter}${secondLetter}${thirdLetter}`], [secondLetter ?? '', thirdLetter ?? '', ...letterTail]);

    return getLetterNeighbors(letters, [secondLetter ?? '', thirdLetter ?? '', ...letterTail]);
}

const stringSatisfiedLength = strings.filter(stringg => {
    const pairs = getLetterPairs([], stringg.split(''));
    const neighbors = getLetterNeighbors([], stringg.split(''));
    
    const satisfiesPairCondition = pairs.some(pair => {
        if (pair.length < 2) return;

        const firstTwin = stringg.indexOf(pair);
        const secondTwin = stringg.lastIndexOf(pair);

        if (firstTwin === secondTwin || firstTwin + 1 === secondTwin) return;

        console.log({firstTwin, secondTwin, pair, neighbors});
        return true;
    });

    const satisfiesSandwichCondition = neighbors.length;

    return satisfiesPairCondition && !!satisfiesSandwichCondition;
}).length;

console.log(stringSatisfiedLength);