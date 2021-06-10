// ===============================
//      A U X
// ===============================
export const getPointOnCircle = (p5, centrum, offset, division, section)=>{
    let angle = ((2 * Math.PI) / division) * section;
    let pos = p5.createVector(Math.cos(angle), Math.sin(angle));
    pos.mult(offset);
    pos.add(centrum);
    return pos;
}



function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
    var l2 = dist2(v, w);
    if (l2 == 0) return dist2(p, v);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, { x: v.x + t * (w.x - v.x),
        y: v.y + t * (w.y - v.y) });
}
export const distToSegment = (p, v, w) =>{ return Math.sqrt(distToSegmentSquared(p, v, w)); }




const eps = 0.0000001;
const between = (a, b, c) => a - eps <= b && b <= c + eps;

export const segment_intersection = (x1, y1, x2,y2, x3, y3, x4, y4) => {


    var x = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4)) /
        ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));

    var y = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4)) /
        ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));

    if(
        (isNaN(x) || isNaN(y)) ||
        (x1>=x2 && !between(x2, x, x1) || !between(x1, x, x2)) ||
        (y1>=y2 && !between(y2, y, y1) || !between(y1, y, y2)) ||
        (x3>=x4 && !between(x4, x, x3) || !between(x3, x, x4)) ||
        (y3>=y4 && !between(y4, y, y3) || !between(y3, y, y4))
    ) {
        return false;
    }

    return true; //{x: x, y: y};

};



export const mouseV = (p5)=>p5.createVector(p5.mouseX, p5.mouseY);