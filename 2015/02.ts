const path = new URL("./sample_input.txt", import.meta.url);
const text = Bun.file(path);

const commands = await text.text();

const commandList = commands.split('');

let position: number[] = [];
commandList.reduce((acc, command, index) => { 
    if (acc < 0) position.push(index);

    if (command === '(') return acc += 1;

    return acc -= 1;
}, 0);

console.log({ position: position[0] });