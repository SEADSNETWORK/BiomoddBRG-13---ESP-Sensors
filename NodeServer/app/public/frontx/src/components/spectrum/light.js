import {IO_STATE, InteractiveObject} from './interactiveObject'
import {mouseV} from './auxi'
import p5 from "react-p5"
// ===============================
//      L I G H T
// ===============================
// The object that emits a beam of light

// the handle that allows for the rotation of the light
class Handle extends InteractiveObject {
    constructor (location, size, color){
        super(location, size);
        this.color = color;
    }

    draw(p5){
        p5.noStroke();
        p5.fill(this.color);
        p5.circle(this.location.x, this.location.y, this.state===IO_STATE.UNSELECTED?this.size:this.size*1.2);
    }
}


class Segment {
    constructor(p1_x, p1_y, p2_x, p2_y, color, mirror = null, creatorMirror = null){
        this.p1_x = p1_x;
        this.p1_y = p1_y;
        this.p2_x = p2_x;
        this.p2_y = p2_y;
        this.color = color;
        this.mirror = mirror;
        this.creatorMirror = creatorMirror;
    }
}


class Beam {

    constructor(origin, direction, color, mirrors, p5){
        this.origin = origin;
        this.direction = direction;
        this.color = color;
        this.segments = [];
        this.mirrors = mirrors;
        //this.createSegmentZero(p5);
        //this.createSegment(this.direction, this.origin, mirrors, p5);

        // debug: keep track of calculated intersection points
        this.intersectPoints = [];
    }

    setDirection(direction, p5){
        this.direction = direction;
        //this.createSegmentZero(p5);
        //this.segments[0].direction = direction;
    }


    /* New function to cast a beam: 
    takes point of origin and direction
    this function creates a beam and then checks if it reflects off a mirror (another new function);
    on reflection it will create a segment, add it to the array and cast a new beam from the reflection point
    */
    cast(direction, startPoint, p5){
        // draw from point of origin in direction
        const beam = p5.createVector(startPoint).set(direction);
        beam.mult(p5.width);
        beam.add(startPoint);
        
        // check beam for reflection (function)
        let reflectionData = this.reflect(startPoint, beam, direction, p5);
        if(reflectionData!==false) {
            // cut off this beam on the reflection point
            // create segment and add to segments array
            this.segments.push(new Segment(startPoint.x, startPoint.y, reflectionData.x, reflectionData.y, this.color));
            // cast new beam from reflectionpoint
            let reflectionStart = p5.createVector(reflectionData.x, reflectionData.y);
            this.cast(reflectionData.direction, reflectionStart, p5);
        } else {
            // no reflection has been detected
            this.segments.push(new Segment(startPoint.x, startPoint.y, beam.x, beam.y, this.color));
        }
    }



    reflect(beamStart, beamEnd, direction, p5){

        let intersectionPoints = [];

        // loop through mirrors
        for(let i=0; i<this.mirrors.length; i++) {
            let mirrorStart = this.mirrors[i].getPoints()[0];
            let mirrorEnd = this.mirrors[i].getPoints()[1];

            //if(this.mirrors[i].id == "mirror_0") console.log("x3: "+ mirrorStart.x + ", y3: "+ mirrorStart.y + " | x4: "+ mirrorEnd.x + ", y4: "+ mirrorEnd.y);

            // find the intersection 
            // see algorithm at https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
            let t = ((mirrorEnd.x - mirrorStart.x) * (beamStart.y - mirrorStart.y) - (mirrorEnd.y - mirrorStart.y) * (beamStart.x - mirrorStart.x)) / ((mirrorEnd.y - mirrorStart.y) * (beamEnd.x - beamStart.x) - (mirrorEnd.x - mirrorStart.x) * (beamEnd.y - beamStart.y));
            let u = ((beamEnd.x - beamStart.x) * (beamStart.y - mirrorStart.y) - (beamEnd.y - beamStart.y) * (beamStart.x - mirrorStart.x)) / ((mirrorEnd.y - mirrorStart.y) * (beamEnd.x - beamStart.x) - (mirrorEnd.x - mirrorStart.x) * (beamEnd.y - beamStart.y));

            // check t & u to see if intersection is found
            if((t>=0 && t<=1) && (u>=0 && u<=1)) {
                // calculate intersectionpoint x & y, and the distance to the startpoint
                let x = beamStart.x + t * (beamEnd.x - beamStart.x);
                let y = beamStart.y + t * (beamEnd.y - beamStart.y);
                let distance = p5.dist(beamStart.x, beamStart.y, x, y);
                // save for later
                intersectionPoints.push({x: x, y: y, distance: distance, mirror: i, direction: 0});
            }
            
        }

        // exit if no points have been found
        if(intersectionPoints.length===0) {
            return false;
        } else {
            let intersectionPoint = {};
            // sort the found intersectionpoints by distance
            if(intersectionPoints.length==1) {
                // check if the one hit has a distance of 0
                // this means it is a beam that has already reflected and does not hit anything else other than the starting mirror
                if(intersectionPoints[0].distance==0) {
                    return false;
                } else {
                    intersectionPoint = intersectionPoints[0];
                }
            }  else {
                // sort if there is more than one reflection point
                intersectionPoints.sort((a,b) => (a.distance > b.distance) ? 1 : -1);

                // check if the first hit has a distance of 0 (hit on the mirror from which a beam starts)
                if(intersectionPoints[0].distance==0) {
                    // skip the hit with distance 0
                    intersectionPoint = intersectionPoints[1];
                } else {
                    intersectionPoint = intersectionPoints[0];
                }
                
            }
            let newDirection = p5.createVector(-direction.x, direction.y);
            intersectionPoint.direction = newDirection;
            this.intersectPoints.push(intersectionPoint);
            
            // calculate angle
            // NOTE: this will have to be redone when the mirrors can rotate.... worries for later
            return intersectionPoint;
        }

    }


    /*
    // old. To be replaced with new createSegment function
    createSegmentZero(p5){
        const p2 = p5.createVector(0, 0).set(this.direction);
        p2.mult(p5.width);
        p2.add(this.origin);
        this.segments = [];
        this.segments[0]= new Segment(this.origin.x, this.origin.y, p2.x, p2.y, this.color);
    }
    // old. New way of creating segments and checking reflections should make this unneccesary
    revert(i, p5){
        console.log("rev");
        //console.log(this.segments);
        //console.log(i);
        //var lastSeg  = this.segments[i];
        //this.segments.splice(i);
        //this.segments = [];
        //this.createSegmentZero(p5);
        //this.segments[this.segments.length] = lastSeg;
        this.segments = [];
        this.createSegmentZero(p5);
    }
    // old. To be replaced with new createSegment() function
    addSegment(p5, i, x, y, angle, color, mirror){
        var lastSeg  = this.segments[i];
        this.segments.splice(i);
        // calc enddddddddd
        //var v = p5.createVector(x, y);
        //var v2 = p5.
        //var v = window.p5.Vector.fromAngle(Math.PI/2, 800);
        //let x2 = v.x;//x+(800 * Math.cos(angle)); //= Math.cos(angle);//
        angle = angle %(2*Math.PI);
        //if (angle < Math.PI){
            angle = Math.PI - angle;

        //} else {
           // angle =  2*Math.PI - angle;
        //}

        angle = angle -Math.PI/2;
        while (angle < 0) {
            angle+=(Math.PI*2);
        }
        let n_ang = 4.7124;
        let x2 = x+(800 * Math.cos(angle )); //= Math.cos(angle);//

        //x2 *=800;
        //x2= x + x2 ;
        //x2 = 800 - x2;
        //let y2 =  v.y;//y+(800 * Math.sin(angle)); // Math.sin(angle) ;//
        let y2 =  y+(800 * Math.sin(angle)); // Math.sin(angle) ;//
        //y2 *=800;
        //y2=y- y2;
        //p5.push();
        //p5.translate(x,y);
        this.segments[this.segments.length] = new Segment( lastSeg.p1_x, lastSeg.p1_y, x, y, color, mirror);
        this.segments[this.segments.length] = new Segment( x, y, x2, y2, color, null, mirror);

    }

    // old draw function: 
    draw(p5){
        p5.noFill();
        for (let i=0; i<this.segments.length; i++){
            p5.stroke(this.segments[i].color);
            p5.line(this.segments[i].p1_x, this.segments[i].p1_y, this.segments[i].p2_x, this.segments[i].p2_y);
        }
    }
    */

    // new draw function: simply calls cast to calculate and draw this beam
    draw(p5) {

        // reset segments
        this.segments = [];
        // debug: points of intersection
        this.intersectPoints = [];
        // cast first beam (this will populate the segments array)
        this.cast(this.direction, this.origin, p5);
        /*
        // debug: show intersect points
        for(let j=0; j<this.intersectPoints.length; j++) {
            p5.fill(255, 0, 0);
            p5.circle(this.intersectPoints[j].x, this.intersectPoints[j].y, 10);
        }
        */
        
        p5.noFill();

        // loop through and draw segments
        for (let i=0; i<this.segments.length; i++){
            p5.stroke(this.segments[i].color);
            p5.line(this.segments[i].p1_x, this.segments[i].p1_y, this.segments[i].p2_x, this.segments[i].p2_y);
        }
    }
}

class Light extends InteractiveObject {
    constructor({color, size, location, controlOffset, strokeWeight}, mirrors, p5){
        super(location, size);
        this.color = color;
        this.controlOffset = controlOffset;
        this.strokeWeight = strokeWeight;

        this.handle = new Handle(p5.createVector(0, 0), 10, this.color);
        this.beam = new Beam(this.location, this.getDirection(p5), color, mirrors, p5);
        const r = ()=>p5.random(-this.handleOffset(), this.handleOffset());
        this.moveHandle(p5, p5.createVector().set(this.location).add(p5.createVector(r(), r())))
        
    }

    draw(p5){
        if (this.handle.state === IO_STATE.DRAGGED){
            this.moveHandle(p5);
        }

        // draw light
        p5.noStroke();
        p5.fill(this.color);
        p5.circle(this.location.x, this.location.y, this.size);
        p5.noFill();
        p5.strokeWeight(this.strokeWeight);
        p5.stroke(this.color);
        p5.circle(this.location.x, this.location.y, this.size + this.controlOffset);

        // draw handle
        this.handle.draw(p5);

        // draw beam
        this.beam.draw(p5);
    }

    handleOffset(){
        return (this.controlOffset+this.size)/2;
    }

    getDirection(p5){
        const direction = p5.createVector(0,0).set(this.location);
        direction.sub(this.handle.location);
        direction.normalize();
        return direction;
    }

    moveHandle(p5, loc){

        if (!loc){
            loc = mouseV(p5);
        } 

        // we move the handle in such a way that it resembles
        // the location of the mouse while dragging;
        const diff = p5.createVector(0,0).set(this.location).sub(loc);
        
        // limit to handleoffset
        diff.normalize();
        diff.mult(-this.handleOffset());

        // add to center
        diff.add(this.location);
        this.handle.location.set(diff);
        this.beam.setDirection(this.getDirection(p5), p5);
    }

    // ---- I/O stuff 
    // passing interactions down to the handle member
    mousePressed(p5){
        super.mousePressed(p5);
        this.handle.mousePressed(p5);
    }

    mouseReleased(p5){
        super.mouseReleased(p5);
        this.handle.mouseReleased(p5);
    }

    mouseDragged(p5){
        super.mouseDragged(p5);
        this.handle.mouseDragged(p5);
    }

    mouseMoved(p5){
        super.mouseMoved(p5);
        this.handle.mouseMoved(p5);
    }    
}

export default Light;