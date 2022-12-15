export interface ICar {
  position: Position;
  speed: number;
  wheels: Array<IWheel>;
}

export interface IWheel {
  rotation: number;
  position: Position;
}

export type Position = {
  x: number;
  y: number;
};
