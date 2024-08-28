import Vector from '../utils/vector.js';

export class Circle{

    center = new Vector(0,0);
    oldcenter = new Vector(0,0);
    radius;

    color = {r:255, g:170, b:0};

    constructor(center, radius){
        this.center.set(center);
        this.updateOldPosition();
        this.radius = radius;
    }

    updateOldPosition(){
        this.oldcenter.set(this.center);
    } 

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    /**
     * 
     * @param {Vector} m 
     */
    move(m) {
        this.center.add(m);
    }

    /**
     * 
     * @param {Vector} m 
     */
    distance(m) {
        return Vector.distance(m, this.center) - this.radius;
    }

    /**
     * @param {{ r: number; g: number; b: number; }} newColor
     */
    set color(newColor) {
        this.color.r = newColor.r;
        this.color.g = newColor.g;
        this.color.b = newColor.b;
    }

    detect(p_old, p_new, deltaTime) {
        if (!p_old)
            return {isCollide : false};  

        const p_old_corrected = Vector.add(p_old,Vector.direction(this.oldcenter, this.center));

        if (this.distance(p_old_corrected) * this.distance(p_new) > 0)
            return {isCollide : false};

        let point = Vector.center(p_old_corrected, p_new);
        if (this.distance(p_old_corrected) * this.distance(point) < 0){
            const u = Vector.mul(this.radius, Vector.norm(Vector.direction(this.center,point)));
            point.set(Vector.add(this.center, u));
        }
        
        const speed = Vector.mul(1/deltaTime, Vector.direction(this.oldcenter, this.center))
        return {isCollide : true, point : point, norm:Vector.norm(Vector.direction(point, this.center)), speed:speed};
    }
}