import Vector from '../utils/vector.js';

const ZONE_A = 0;
const ZONE_LINE = 1;
const ZONE_B = 2;

export class Segment{
    a = new Vector(0,0);
    b = new Vector(0,0);
    olda = new Vector(0,0);
    oldb= new Vector(0,0);

    color = {r:255, g:170, b:0};

    constructor(a, b) {
        this.a.set(a);
        this.b.set(b);
        this.updateOldPosition();
        this.selected = [];
    }

    updateOldPosition(){
        this.olda.set(this.a);
        this.oldb.set(this.b);
    } 

    draw(ctx) {

        ctx.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;

        ctx.beginPath();
        ctx.moveTo(this.a.x,this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }

    /**
     * 
     * @param {Vector} m 
     */
    move(m){
        this.selected.forEach(point => point.add(m));
    }

    findZone(m) {
        const directionMA = Vector.direction(m, this.a);
        const directionMB = Vector.direction(m, this.b);
        const directionAB = Vector.direction(this.a, this.b);

        if(Vector.dot(directionMA, directionAB) > 0)
            return ZONE_A;
        if(Vector.dot(directionMB, directionAB) < 0)
            return ZONE_B;
        else
            return ZONE_LINE;
    }

    /**
     * 
     * @param {Vector} m 
     */
    distance(m, change = true) {
        if(change)
            this.selected = [];
    
        switch(this.findZone(m)){
            case ZONE_A:
                if (change)
                    this.selected = [this.a];
                return Vector.distance(this.a, m);

            case ZONE_B:
                if (change)
                    this.selected = [this.b];
                return Vector.distance(this.b, m);

            case ZONE_LINE:
                if (change) 
                    this.selected = [this.a,this.b];
                const directionMA = Vector.direction(m, this.a);
                const directionAB = Vector.direction(this.a, this.b);
                return Vector.dot(directionMA,Vector.norm(Vector.normal(directionAB)));

        }
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
        if(!p_old) 
            return {isCollide : false}; 

        let add;
        if(this.selected.length === 2){ // ZONE_LINE
            add = Vector.direction(this.olda, this.a);
        } else {
            add = Vector.direction(Vector.center(this.olda, this.oldb), Vector.center(this.a, this.b));
        }

        const p_old_corrected = Vector.add(p_old, add);
        if (this.findZone(p_old_corrected) != this.findZone(p_new) || this.distance(p_old_corrected, false) * this.distance(p_new, false) > 0)
            return {isCollide : false};
        
        const point = Vector.mul(0.5,Vector.add(p_old_corrected,p_new));

        const speed = Vector.mul(1/deltaTime, add);
        return {isCollide : true, point: point, norm:Vector.norm(Vector.normal(Vector.direction(this.a, this.b))), speed : speed};
    }
}