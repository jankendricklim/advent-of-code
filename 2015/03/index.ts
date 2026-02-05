import fp from 'lodash/fp';

const path = new URL("./input.txt", import.meta.url);
// const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const readText = await text.text();

const houses: Record<string, number> = {'0,0': 1};

const getDirection = (direction: string, { x, y }: Record<'x'|'y', number>): Record<'x'|'y', number> => {
    switch(direction) {
        case '^':
            return { x, y: y += 1};
        case 'v':
            return { x, y: y -= 1};
        case '>':
            return { x: x += 1, y};
        case '<':
            return { x: x -= 1, y };
        default:
            return { x, y }
    }
}

const recordMovement = (movements: string[]) => {
    const [firstDirection, ...remainingDirections] = movements;
    const initialPosition = getDirection(firstDirection ?? '', { x: 0, y: 0});

    remainingDirections.reduce(({ x, y }, direction) => {
        const currentHouse = `${x},${y}`;
        if(!houses[currentHouse]) {
            houses[currentHouse] = 0;
        }

        houses[currentHouse] += 1;

        return getDirection(direction, { x, y });
    }, { x: initialPosition.x, y: initialPosition.y});
}

const commands = readText.split('');

const santaMovements = commands.filter((_, index) => index % 2);
const robotMovements = commands.filter((_, index) => !(index % 2));

recordMovement(santaMovements);
recordMovement(robotMovements);

fp.flow(
    fp.constant(houses),
    fp.toPairs,
    fp.filter(([, count]) => count >= 1),
    arr => arr.length,
    fp.tap(console.log)
)();