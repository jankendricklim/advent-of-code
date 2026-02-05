/**
 * --- Day 6: Probably a Fire Hazard ---
Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

For example:

turn on 0,0 through 999,999 would turn on (or leave on) every light.
toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
After following the instructions, how many lights are lit?
 */

import fp from 'lodash/fp';

// const path = new URL("./sample_input.txt", import.meta.url);
const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const input = await text.text();

const strings = input.split('\n');

const grid = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => 0)
);

const boolGrid = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => false)
);

strings.map(command => {
    const words = fp.words(command);
    const indexOfThrough = words.indexOf('through');

    const fCoordX = +(words[indexOfThrough - 2] ?? 0);
    const fCoordY = +(words[indexOfThrough - 1] ?? 0);

    const lCoordX = +(words[indexOfThrough + 1] ?? 0);
    const lCoordY = +(words[indexOfThrough + 2] ?? 0);

    const commandWords = words.slice(0, indexOfThrough - 2).join(' ');

    for(let x = fCoordX; x <= lCoordX; x++) {
        for(let y = fCoordY; y <= lCoordY; y++) {

            if (commandWords === 'turn on') {
                grid[x]![y] = (grid[x]![y] ?? 0) + 1;
                boolGrid[x]![y] = true;
            } else if (commandWords === 'turn off') {
                const newValue = (grid[x]![y] ?? 0) - 1

                grid[x]![y] = fp.max([newValue, 0]);
                boolGrid[x]![y] = false;
            } else if (commandWords === 'toggle') {
                grid[x]![y] = (grid[x]![y] ?? 0) + 2;
                boolGrid[x]![y] = !boolGrid[x]![y];
            }
        }
    }
});

const part1 = boolGrid.reduce((count: number, x: boolean[]) => {
    return count+x.filter(y => y).length;
}, 0);

const part2 = grid.reduce((count: number, x: number[]) => {
    return count+fp.sum(x);
}, 0);

console.log(`part 1 ${part1} part 2 ${part2}`);