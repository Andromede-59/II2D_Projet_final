import { randint } from '../utils/randint.js';

export const randomColor = () => {return {r: randint(0,255),g: randint(0,255),b:randint(0,255)}};