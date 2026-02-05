
// const path = new URL("./sample_input.txt", import.meta.url);
const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const input = await text.text();


const countDigitsIterative = (input: string): string => {
    let result = '';
    let count = 1;

    for (let i = 1; i <= input.length; i++) {
        if (input[i] === input[i - 1]) {
            count++;
        } else {
            result += count + (input[i - 1] ?? '');
            count = 1;
        }
    }

    return result;
};


let i = 0;
let toldDigit = input.trim();

do {
    toldDigit = countDigitsIterative(toldDigit);
    console.log(i, toldDigit.length);
    i++;
} while (i < 50);