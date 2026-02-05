import fp from 'lodash/fp';

// const path = new URL("./sample_input.txt", import.meta.url);
const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const input = await text.text();

const strings = input.split('\n');

let remainingFormulas: string[] = [];
let accumulatedValues: Record<string, number> = {};

// do {
const evaluate = (remainingStrings: string[]) => {
    return remainingStrings.reduce((acc, command) => {
        const [formula, key] = command.split(' -> ');
        let convertedFormula = formula;

        Object.keys(acc).forEach(key => { convertedFormula = convertedFormula?.replace(key, `${fp.get(key, acc)}`)} );
    
        convertedFormula = convertedFormula?.replace('AND', '&')
        .replace('OR', '|')
        .replace('LSHIFT', '<<')
        .replace('RSHIFT', '>>')
        .replace(/\bNOT\s+(\d+)\b/g, "(~$1 & 0xFFFF)");

        try {
            const evaluated = eval(convertedFormula ?? '');

            // console.log(`removing ${command}`, { [key ?? '']: evaluated });
            // remainingFormulas = [...fp.remove(fp.equals(command), remainingFormulas)];
            return { ...acc, [key ?? '']: evaluated };
        } catch {
            // !remainingFormulas.includes(command ?? '') && remainingFormulas.push(command ?? '');
            return { ...acc, [key ?? '']: command };
        }
    }, accumulatedValues)
}
// } while(remainingFormulas.length)

accumulatedValues = { ...evaluate(strings) };

console.log({accumulatedValues, remainingFormulas});

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);


accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas);

accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

remainingFormulas = Object.keys(accumulatedValues).flatMap(key => typeof accumulatedValues[key] === 'string' ? accumulatedValues[key] : []);

console.log(accumulatedValues, remainingFormulas, accumulatedValues['lf']);
// do {
//     accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };
//     console.log({ accumulatedValues, l: remainingFormulas });
// } while (remainingFormulas.length);

// console.log({accumulatedValues, remainingFormulas});

// accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

// console.log({accumulatedValues, remainingFormulas});

// accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

// console.log({accumulatedValues, remainingFormulas});

// accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

// console.log({accumulatedValues, remainingFormulas});

// accumulatedValues = { ...accumulatedValues, ...evaluate(remainingFormulas) };

// console.log({accumulatedValues, remainingFormulas});

// 5139809 too high