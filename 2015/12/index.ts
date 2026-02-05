import fp from 'lodash/fp';

// const path = new URL("./sample_input.txt", import.meta.url);
const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const input = await text.json();

let count = 0;

const recursive = (input: any) => {
    if (typeof input === 'string') return count;

    if (Array.isArray(input)) {
        return input.flatMap(recursive);
    }

    if (fp.isPlainObject(input)) {
        if(fp.values(input).includes('red')) return 0;

        return fp.flow(
            fp.constant(input),
            fp.values,
            fp.flatMap(recursive)
        )();
    }

    return input;
}

console.log(fp.sum(recursive(input)));