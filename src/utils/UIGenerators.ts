import Tree1 from '../assets/tree-1.svg';
import Tree2 from '../assets/tree-2.svg';
import Tree3 from '../assets/tree-3.svg';
import Tree4 from '../assets/tree-4.svg';
import Tree5 from '../assets/tree-5.svg';
import Tree6 from '../assets/tree-6.svg';
import Tree7 from '../assets/tree-7.svg';
import Tree8 from '../assets/tree-8.svg';
import Tree9 from '../assets/tree-9.svg';

const trees = [Tree1, Tree2, Tree3, Tree4, Tree5, Tree6, Tree7, Tree8, Tree9];

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
    a += 80;
  }
  return area;
};
