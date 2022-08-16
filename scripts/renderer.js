export class Renderer {
	constructor(scale) {

		// Setting the viewport size
		this.cols = 64;
		this.rows = 32;		
		
		// Scale variable to bring the viewport to scale
		this.scale = scale;
		
		// Returns canvas as the first element of string canvas 
		this.canvas = document.querySelector('canvas');

		// Pulling from HTMLCanvasElement.getContext() to create a 2d canvas element
		this.ctx = this.canvas.getContext('2d');
		
		// Canvas sizing
		this.canvas.width = this.cols * this.scale;
		this.canvas.height = this.rows * this.scale;
		
		// The whole display declared in this array
		this.display = new Array(this.cols * this.rows);

	}

	setPixel(x, y) {

		// Some screen space logic, not my favourite but let's stick with it for now
		if (x > this.cols) {
			x -= this.cols;
		} else if (x < 0) {
			x += this.cols;
		}

		if (y > this.rows) {
			y -= this.rows;
		} else if (y < 0) {
			y += this.rows;
		}

		// Location of the current pixel to render
		let pixelLoc = x + (y * this.cols);
		
		// Bitwise operation that toggles pixelLoc from 0 to 1 and vice versa
		this.display[pixelLoc] ^= 1;
		// Erase a pixel if return is ture, leave as-is if false
		return !this.display[pixelLoc];
	}

	clear() {
		// Basically overrides the current array with a new one
		this.display = new Array(this.cols * this.rows);
	}

	render() {
		// Clear the canvas display for every pass of the loop
		// not related to above clear function
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Looping through the entire display array
		for (let i = 0; i < this.cols * this.rows; i++) {
			// X position derived from i
			let x = (i % this.cols) * this.scale;
			// Same with Y
			let y = Math.floor(i / this.cols) * this.scale;

			// Draws a single pixel when this.display[i] == 1
			if (this.display[i]) {
			this.ctx.fillStyle = '#000';

			// Scaling x and y with the scale value
			this.ctx.fillRect(x, y, this.scale, this.scale);
			}
		}
	}

//	testRender() {
//
//    	this.setPixel(0, 0);
//    	this.setPixel(5, 2);
//	}

}

export default Renderer;
