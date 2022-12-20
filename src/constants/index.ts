import { Position } from '../models/car';

export const mapSize = 2000;
export const roadHeight = 30;
export const cameraPosition = 100;

//Car
export const carWidth = 200;
export const carHeight = carWidth * 0.295;
export const carPosition: Position = {
  x: cameraPosition * 2,
  y: roadHeight / 1.8,
};
export const carSpeed = 100;
export const wheelRadius = carWidth * 0.08;
export const leftWheelPosition: Position = {
  x: carWidth * 0.14,
  y: -wheelRadius / 2,
};
export const rightWheelPosition: Position = {
  x: carWidth * 0.773,
  y: -wheelRadius / 2,
};

//Engine
export const frameRate = 1 / 60;
export const frameDelay = frameRate * 1000;
