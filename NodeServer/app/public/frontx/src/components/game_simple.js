import React from "react";
import Sketch from "react-p5";

	
export default ({socket, resolution, world}) => {
	
	let segmentWidth;
	let selection1;

	socket.on("/gameUpdateWorld", (gameWorld)=>{
		world = gameWorld;
	})

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
		segmentWidth = toWorld(p5, 1);
	};

	const toWorld 	= (p5, v)=>p5.width/resolution*v;
	const fromWorld	= (p5, v)=>Math.floor(v/p5.width*resolution);
	const mouseToGridNumber = (p5)=>[ fromWorld(p5, p5.mouseX) , fromWorld(p5, p5.mouseY)];
	const mouseToGrid = (p5)=>mouseToGridNumber(p5).map(r=>r*segmentWidth);
	
	const operateOnWorld = (p5, op)=>{
		world.forEach((x, xi)=>{
			x.forEach((y, yi)=>{
				const [tx, ty] = [toWorld(p5, xi), toWorld(p5, yi)];
				op(xi, yi, tx, ty, y);
			})
		})
	}

	const draw = (p5) => {
		p5.background("white");
		

		p5.noStroke();
		
		// draw world;
		operateOnWorld(p5, (xi, yi, tx, ty, val)=>{
			if (selection1 && xi == selection1[0] && yi == selection1[1] ){
				p5.fill("blue");
			} else {
				p5.fill(val);
			}
			p5.rect(tx, ty, segmentWidth, segmentWidth);
		})
		

		p5.noFill();
		p5.stroke(0);
		p5.strokeWeight(2);

		//  draw border and grid
		p5.rect(1, 1, p5.width-2, p5.height-2)
		for (let x = 0; x < resolution; x++) {
			const tx = toWorld(p5, x);
			p5.line(tx, 0, tx, p5.height);
			p5.line(0, tx, p5.width, tx);
		}

		// current mouse
		p5.fill("red");
		const [tx, ty] = mouseToGrid(p5)
		p5.rect(tx, ty, segmentWidth, segmentWidth);
	};

	const mousePressed = (p5)=>{
		if (selection1){
			console.log("push new move");
			socket.emit("/gameMove", [selection1, mouseToGridNumber(p5)]);
			selection1 = undefined;
		} else {
			selection1 = mouseToGridNumber(p5);
		}
	}

	return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
};
