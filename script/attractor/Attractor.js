import Vector from '../utils/vector.js';

export default class Attractor {
    center = null;
    size = null;
    power = null;

    color = {r:0, g:170, b:255};

    constructor(center, size, power) {
        this.center = center.clone();
        this.size = size;
        this.power = power;

        if(power < 0){
            this.color = {r:100, g:50, b:200};
        }
    }

    /**
     * 
     * @param {Vector} m 
     */
    distance(m) {
        return Vector.distance(m, this.center);
    }

    /**
     * 
     * @param {Vector} m 
     */
    move(m) {
        this.center.add(m);
    }

    get force() {
        return {value:this.power, vector: this.center};
    }

    /**
     * @param {{ r: number; g: number; b: number; }} newColor
     */
    set color(newColor) {
        this.color.r = newColor.r;
        this.color.g = newColor.g;
        this.color.b = newColor.b;
    }

    draw(ctx) {
        const sizeSur2 = this.size>>1;
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.rect(this.center.x - sizeSur2, this.center.y - sizeSur2, this.size, this.size);
        ctx.fill();
    }
}