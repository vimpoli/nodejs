// import sqrNum from "./calc.js";
import numSquared, { cubeNum as cube, areaOfCircle } from "./calc.js";

const num = 20;
const squaredNum = numSquared(num);
const cubedNum = cube(num);
const area = areaOfCircle(num);

console.log(squaredNum);
console.log(cubedNum);
console.log(area);


