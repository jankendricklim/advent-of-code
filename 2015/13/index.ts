import fp from 'lodash/fp';

const path = new URL("./input.txt", import.meta.url);
const text = Bun.file(path);

const input = await text.text();

const words = input.split('\n').map(fp.words);

const people = fp.flow(
  fp.constant(words),
  fp.map(word => [fp.first(word), (word[2] === 'gain' ? 1 : -1)*(+(word[3] ?? 0)), fp.last(word)])
)(); 

const uniqPeople = fp.uniq(people.map(fp.first)) as string[];

const possibleScenarioes = uniqPeople.reduce((accu, peep) => {
  let totalWeight = 0;

  const combination = uniqPeople.reduce((acc, person, i) => {
    const peopleCombinations = people.filter(([firstPerson]) => firstPerson === fp.last(acc));

    let weight = 0;
    let sitNext = '';


    peopleCombinations.forEach(combination => {
      const [combiPerson, unit, combiSitPerson] = combination as [string, number, string];

      const nextCandidate = people.find(nextCandidatePerson => 
        (nextCandidatePerson[0] === combiSitPerson && 
        nextCandidatePerson[2] === combiPerson &&
        !acc.includes(nextCandidatePerson[0]))
      );

      if(!nextCandidate) return;


      const candidateWeight = +(nextCandidate?.[1] ?? 0) + unit;
      if(candidateWeight > weight) {
        weight = candidateWeight;
        sitNext = `${nextCandidate?.[0]}`;
      }
    });

    totalWeight += weight;
    
    return [...acc, !sitNext ? acc[0] ?? '': sitNext];
  }, [peep] as string[]);

  const lastPerson = fp.flow(
    fp.constant(people),
    fp.filter(person => {
      return (person[2] === combination[combination.length - 1] && person[0] === combination[combination.length - 2]) || 
      (person[0] === combination[combination.length - 1] && person[2] === combination[combination.length - 2])
    }),
    fp.flatMap(fp.at(1)),
    fp.sum
  )();

  return [...accu, {combination, totalWeight: totalWeight + lastPerson}];
}, [] as Array<{ combination: string[], totalWeight: number }>);


const { combination: bestCombination, totalWeight: bestWeight } = fp.maxBy('totalWeight', possibleScenarioes) ?? { combination: [], totalWeight: 0 };

console.log(`Optimal Seating Arrangement Weight: ${bestWeight}`);

// Part 2

const weightsWithYou = bestCombination.reduce((acc, curr, i) => {
  const weight = fp.flow(
    fp.constant(people),
    fp.filter(person => {
      return (person[2] === curr && person[0] === bestCombination[i+1]) || 
      (person[0] === curr && person[2] === bestCombination[i+1])
    }),
    fp.flatMap(fp.at(1)),
    fp.sum
  )();

  if (weight === 0) return acc;

  return [...acc, bestWeight-weight];

}, [] as number[]);

console.log(`(With You) Optimal Seating Arrangement Weight: ${fp.max(weightsWithYou)}`);
