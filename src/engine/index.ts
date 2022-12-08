// import { frameRate } from '../constants';

// let ball1 = {
//     position: { x: 0, y: 275 },
//     velocity: { x: 0, y: 0 },
//     mass: 0.1, //kg
//     radius: wheelRadius / 2, // 1px = 1cm
//     restitution: -0.7,
//   };

// var Cd = 0.47; // is the "coefficient of drag", which is influenced by the shape of the object (and a little bit by its material)
// var rho = 1.22; // (kg / m^3) density of the fluid the ball is in
// var A = (Math.PI * ball1.radius * ball1.radius) / 10000; // (m^2) frontal area or frontal projection of the object
// var ag = 9.81; //m / s^2

// export const loop = function (moving) {
//   const ball = JSON.parse(JSON.stringify(moving.value));

//   // Do physics
//   // Drag force: Fd = -1/2 * Cd * A * rho * v * v

//   //Aerodynamic Drag
//   var Fx =
//     (-0.5 *
//       Cd *
//       A *
//       rho *
//       ball.velocity.x *
//       ball.velocity.x *
//       ball.velocity.x) /
//     Math.abs(ball.velocity.x);
//   var Fy =
//     (-0.5 *
//       Cd *
//       A *
//       rho *
//       ball.velocity.y *
//       ball.velocity.y *
//       ball.velocity.y) /
//     Math.abs(ball.velocity.y);

//   Fx = isNaN(Fx) ? 0 : Fx;
//   Fy = isNaN(Fy) ? 0 : Fy;

//   // Calculate acceleration ( F = ma )
//   var ax = Fx / ball.mass;
//   var ay = ag + Fy / ball.mass;
//   // Integrate to get velocity
//   ball.velocity.x += ax * frameRate;
//   ball.velocity.y += ay * frameRate;

//   // Integrate to get position
//   ball.position.x += ball.velocity.x * frameRate * 100;
//   ball.position.y += ball.velocity.y * frameRate * 100;

//   // Handle collisions
//   if (ball.position.y > 330 - ball.radius) {
//     //console.log('collisions1');
//     ball.velocity.y *= ball.restitution;
//     ball.position.y = 330 - ball.radius;
//   }
//   if (ball.position.x > 500 - ball.radius) {
//     //console.log('collisions2');
//     ball.velocity.x *= ball.restitution;
//     ball.position.x = 500 - ball.radius;
//   }
//   if (ball.position.x < ball.radius) {
//     //console.log('collisions3');
//     ball.velocity.x *= ball.restitution;
//     ball.position.x = ball.radius;
//   }

//   moving.value = ball;
// };

//https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
