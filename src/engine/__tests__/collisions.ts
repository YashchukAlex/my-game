import { carWidth, mapSize } from '../../constants';
import { checkCollisions } from '../collisions';

it('Collision checking with left wall', () => {
  expect(checkCollisions({ x: 0, y: 0 })).toBe(true);
  expect(checkCollisions({ x: carWidth / 2, y: 0 })).toBe(true);
  expect(checkCollisions({ x: carWidth, y: 0 })).toBe(false);
});

it('Collision checking with right wall', () => {
  expect(checkCollisions({ x: mapSize, y: 0 })).toBe(true);
  expect(checkCollisions({ x: mapSize - carWidth / 2, y: 0 })).toBe(true);
  expect(checkCollisions({ x: mapSize - carWidth, y: 0 })).toBe(false);
});
