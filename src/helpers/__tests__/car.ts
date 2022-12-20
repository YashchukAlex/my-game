import { CarPedal, ControlMoveCar } from './../../models/carTools';
import { getCarMovingToolsStatus } from '../car';

it('Get car tools status', () => {
  expect(getCarMovingToolsStatus([])).toBe(ControlMoveCar.NOT_USING);
  expect(getCarMovingToolsStatus([CarPedal.GAS])).toBe(
    ControlMoveCar.MOVING_FORWARD,
  );
  expect(getCarMovingToolsStatus([CarPedal.BRAKE])).toBe(
    ControlMoveCar.MOVING_BACK,
  );
  expect(getCarMovingToolsStatus([CarPedal.BRAKE, CarPedal.GAS])).toBe(
    ControlMoveCar.MOVING_BACK,
  );
});
