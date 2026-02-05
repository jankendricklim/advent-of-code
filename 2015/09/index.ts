/**--- Day 9: All in a Single Night ---
Every year, Santa manages to deliver all of his presents in a single night.

This year, however, he has some new locations to visit; his elves have provided him the distances between every pair of locations. He can start and end at any two (different) locations he wants, but he must visit each location exactly once. What is the shortest distance he can travel to achieve this?

For example, given the following distances:

London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
The possible routes are therefore:

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982
The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.

What is the distance of the shortest route? 
[
    ['London', 'Dublin', 464];
    ['Dublin', 'London', 464];
    ['London', 'Belfast', 518];
    ['Belfast', 'London', 518];
    ['Dublin', 'Belfast', 141];
    ['Belfast', 'Dublin', 141];
]

const [currSource, currDestination, currCost] = sample;
- find array where nextSource = currDestination & currSource =!= nextDestination
- get nextCost and add to currCost
- repeat until nextDestination is null
*/

import fp from 'lodash/fp';

// const path = new URL("./sample_input.txt", import.meta.url);
const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const input = await text.text();

const strings = input.split('\n');

const paths: [string, string, number][] = strings.flatMap(path => {
    const [currSource, currDestination, currCost] = path.split(' to ').flatMap(paths => paths.split(' = '));
    
    return [[currSource ?? '', currDestination ?? '', +(currCost ?? 0)], [currDestination ?? '', currSource ?? '', +(currCost ?? 0)]];
});

const findNextDestinationCost = (currSource: string, currDestination: string, totalCost: number = 0, visited: string[] = []) => {
    const possiblePaths = paths.filter(([source, destination]) => (source === currDestination && !visited.includes(destination)));
    
    if(!possiblePaths.length) return {totalCost, visited};

    return possiblePaths.flatMap(possiblePath => {
        const [nextSource, nextDestination, nextCost] = possiblePath;

        return findNextDestinationCost(nextSource, nextDestination, nextCost + totalCost, [...visited, nextSource]);
    });
}

console.log(fp.maxBy('totalCost', paths.flatMap(path => findNextDestinationCost(path[0], path[1], path[2], [path[0]]))));

// 217 too high