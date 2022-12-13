export class Car {
  position: IPosition;
  speed: number;
  wheel: Wheel;

  constructor(position: IPosition, speed: number, wheel: Wheel) {
    this.position = position;
    this.speed = speed;
    this.wheel = wheel;
  }
}

export class Wheel {
  rotation: number;

  constructor(rotation: number) {
    this.rotation = rotation;
  }
}

interface IPosition {
  x: number;
  y: number;
}
