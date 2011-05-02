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