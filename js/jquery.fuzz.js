// jQuery Fuzz
// A simple plugin to add image noise to elements using canvas
// version 1.0, May 3, 2011
// by Chris How Kin Sang
// http://fuzz.chks.me/

(function ($) {

    $.fn.fuzz = function (options) {

        // default settings
        var defaults = {
            color: false,
            sepia: false,
            size: 100,
            opacity: 0.075,
            pixel: 1
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
            var fuzzCanvas = document.getElementById('jquery-fuzz'),
                fuzzContext = fuzzCanvas.getContext('2d'),
                x, y,
                r, g, b,
                a = settings.opacity,
                px = Math.round(settings.pixel);

            // prevent extremely large sizes
            if (settings.size > 500) {
                settings.size = 500;
            }

            // prevent pixels larger than the canvas
            if (px > settings.size) {
                px = settings.size;
            }

            // prevent pixels less than 1px
            if (px < 1) {
                px = 1;
            }

            fuzzCanvas.width = settings.size;
            fuzzCanvas.height = settings.size;

            for (x = 0; x < fuzzCanvas.width; x += px) {

                for (y = 0; y < fuzzCanvas.width; y += px) {

                    r = Math.floor(Math.random() * 255);
                    g = Math.floor(Math.random() * 255);
                    b = Math.floor(Math.random() * 255);

                    if (!settings.color) {
                        fuzzContext.fillStyle = 'rgba(' + r + ', ' + r + ', ' + r + ', ' + a + ')';
                    } else {
                        fuzzContext.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
                    }

                    fuzzContext.fillRect(x, y, px, px);
                }

            }

            // optionally add a sepia tone
            if (settings.sepia) {

                var imgData = fuzzContext.getImageData(0, 0, fuzzCanvas.width, fuzzCanvas.height),
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

                fuzzContext.putImageData(imgData, 0, 0);

            }

            // attach the canvas to each selected element's background image
            this.each(function(){

                // if a background image already exists, just add the noise to the css
                if ($(this).css('backgroundImage')) {

                    var currentBgImg = $(this).css('backgroundImage'),
                            noise = 'url(' + fuzzCanvas.toDataURL('image/png') + ')',
                            newBgImgVar = currentBgImg + ', ' + noise;

                    $(this).css('backgroundImage', newBgImgVar);

                } else {

                    this.style.backgroundImage = 'url(' + fuzzCanvas.toDataURL('image/png') + ')';

                }
            });
            
            $(fuzzCanvas).remove();

        }

        return this;

	}

})(jQuery);