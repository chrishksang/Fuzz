// jQuery Fuzz
// A simple plugin to add image noise to elements using canvas
// version 1.0, May 3, 2011
// by Chris How Kin Sang
// http://fuzz.chks.me/

(function ($) {

    $.fn.fuzz = function(options) {

        // default settings
        var defaults = {
            color: false,
            sepia: false,
            size: 100,
            opacity: 0.075
            },
        settings = $.extend({}, defaults, options);

    
        // check if the browser supports canvas
        function supports_canvas() {
            return !!document.createElement('canvas').getContext;
        }

        // run the function if it does
        if (supports_canvas()) {

            // create a new canvas
            $('<canvas id="jquery-fuzz">').appendTo($('body')).hide();
            var canvasBg = document.getElementById('jquery-fuzz'),
                bgCtx = canvasBg.getContext('2d'),
                x, y,
                r, g, b,
                a = settings.opacity;

            // prevent extremely large sizes
            if (settings.size > 500) {
                settings.size = 500;
            }

            canvasBg.width = settings.size;
            canvasBg.height = settings.size;

            for (x = 0; x < canvasBg.width; x++) {

                for (y = 0; y < canvasBg.width; y++) {

                    r = Math.floor(Math.random() * 255);
                    g = Math.floor(Math.random() * 255);
                    b = Math.floor(Math.random() * 255);

                    if (!settings.color) {
                        bgCtx.fillStyle = 'rgba(' + r + ', ' + r + ', ' + r + ', ' + a + ')';
                    } else {
                        bgCtx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
                    }

                    bgCtx.fillRect(x, y, 1, 1);
                }

            }

            // optionally add a sepia tone
            if (settings.sepia) {

                var imgData = bgCtx.getImageData(0, 0, canvasBg.width, canvasBg.height),
				pxData = imgData.data, // put in an array to easily iterate over it
				pxLength = pxData.length;

                    for (var i = 0; i < pxLength; i+=4) {
                        var r = pxData[i],
                            g = pxData[i + 1],
                            b = pxData[i + 2],
                            sR = r * .393 + g * .769 + b * .189,
                            sG = r * .349 + g * .686 + b * .168,
                            sB = r * .272 + g * .534 + b * .131;

                        pxData[i] = sR;
                        pxData[i + 1] = sG;
                        pxData[i + 2] = sB;

                    }

                imgData.data = pxData; // now we need to put the array back in the object

                bgCtx.putImageData(imgData, 0, 0);

            }

            // attach the canvas to each selected element's background image
            this.each(function(){

                // if a background image already exists, just add the noise to the css
                if ($(this).css('backgroundImage')) {

                    var currentBgImg = $(this).css('backgroundImage'),
                            noise = 'url(' + canvasBg.toDataURL('image/png') + ')',
                            newBgImgVar = currentBgImg + ', ' + noise;

                    $(this).css('backgroundImage', newBgImgVar);

                } else {

                    this.style.backgroundImage = 'url(' + canvasBg.toDataURL('image/png') + ')';

                }
            });
            
            $(canvasBg).remove();

        }

        return this;

	}

})(jQuery);