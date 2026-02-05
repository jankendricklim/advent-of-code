import fp from 'lodash/fp';

const path = new URL("./sample_input.txt", import.meta.url);
const text = Bun.file(path);

const readText = await text.text();
const dimensions = readText.split('\n');

const totals = dimensions.reduce(({ total, ribbon }, dimension) => {
    const { l, w, h} = fp.flow(fp.constant(dimension), fp.split('x'), fp.map(Number), fp.zip(['l', 'w', 'h']), fp.fromPairs)();

    return { 
        total: total + (2*l*w) + (2*w*h) + (2*h*l) + fp.min([l*w, w*h, h*l]), 
        ribbon: ribbon + l*w*h + fp.min([(2*l)+(2*w), (2*w)+(2*h), (2*h)+(2*l)])
    };
}, { total: 0, ribbon: 0})

console.log({ totals });