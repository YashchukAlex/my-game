import Tree1 from '../assets/tree-1.svg';
import Tree2 from '../assets/tree-2.svg';
import Tree3 from '../assets/tree-3.svg';

const trees = [Tree1, Tree2, Tree3];

interface IBackground {
  x: number;
  y: number;
  Icon: any;
  width: number;
  height: number;
}

function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export const generateRoad = () => {};

export const generateBackground = (mapSize: number): Array<IBackground> => {
  const area: Array<IBackground> = [];
  const chanceUIItem = 90;

  for (let a = 0; a < mapSize; ) {
    if (getRandomArbitrary(0, 100) <= chanceUIItem) {
      area.push({
        x: a,
        y: 0,
        Icon: trees[parseInt(getRandomArbitrary(0, trees.length))],
        width: 150,
        height: 300,
      });
    }
    a += 100;
  }
  return area;
};
