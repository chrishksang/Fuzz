jQuery(document).ready(function () {

// accept arguments for: ids, class, saturation, opacity

// check if the browser supports canvas
function supports_canvas() {
	return !!document.createElement('canvas').getContext;
}
	
	// run the function if it does
	if (supports_canvas()) {
		
		// create a new canvas
		jQuery('<canvas id="bg-noise-generator">').appendTo(jQuery('body')).hide();
		var canvasBg = document.getElementById('bg-noise-generator'),
			footer = document.getElementById('footer'),
			bgCtx = canvasBg.getContext('2d'),
			x, y,
			r, g, b,
			a = .033;
		
			canvasBg.width = 150;
			canvasBg.height = 150;
			
			for (x = 0; x < canvasBg.width; x++) {
				
				for (y = 0; y < canvasBg.width; y++) {
				
					r = Math.floor(Math.random() * 255);
					g = Math.floor(Math.random() * 255);
					b = Math.floor(Math.random() * 255);
					
					bgCtx.fillStyle = 'rgba(' + r + ', ' + r + ', ' + r + ', ' + a + ')';
					bgCtx.fillRect(x, y, 1, 1);
				}
				
			}
		
		document.body.style.backgroundImage = 'url(' + canvasBg.toDataURL('image/png') + ')';
		footer.style.backgroundImage = 'url(' + canvasBg.toDataURL('image/png') + ')';

	}
		
});