import Vector from "../../utils/vector.js";

const THRESHOLD = 20;

const SELECTEDCOLOR = {r:255, g:20, b:0};

export class SelectableManager{
    selectables = [];
    selected = null;

    defaultColor = null;
    
    add(selectable) {
        this.selectables.push(selectable);
    }

    /**
     * 
     * @param {Vector} m 
     */
    select(m) {

        const closer = {dist:Infinity, selectable:null};

        this.deSelect();

        this.selectables.forEach(selectable => {
            const distance = Math.abs(selectable.distance(m));
            if(distance < closer.dist && distance < THRESHOLD){
                closer.dist = distance;
                closer.selectable = selectable;
            }
        });
        
        if(closer.selectable){
            this.defaultColor = closer.selectable.color;
            closer.selectable.color = SELECTEDCOLOR;
        }

        this.selected = closer.selectable;
    }

    deSelect() {
        if(this.selected){
            this.selected.color = this.defaultColor;
            this.defaultColor = null;
            this.selected = null;
        }
    }


    /**
     * 
     * @param {Vector} m 
     */
    move(m) {
        if(this.selected)
            this.selected.move(m);
    }
}