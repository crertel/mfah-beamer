(function(window){
    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       The hue
     * @param   Number  s       The saturation
     * @param   Number  l       The lightness
     * @return  Array           The RGB representation
     *
     * Found at http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
     */
    function hslToRgb(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [r * 255, g * 255, b * 255];
    }

    function hslToCss( h, s, l, a ){
        var rgb = hslToRgb(h,s,l).map( Math.floor );
        rgb.push(a);
        return "rgba("+ rgb.join(',') + ')';
    }

    function loadImage( path ){
        return new Promise(function(resolve, reject){
            var tmpImage = new Image();
            tmpImage.src = path;
            tmpImage.onload = function _loadedImage() {
                resolve(tmpImage);
            };
            tmpImage.onerror = function _erroredImage() {
                reject('unable to load image ' + path);
            }
        });
    }

    window.slides = window.slides || {};
    window.slides.utils = window.slides.utils || {
        hslToRgb: hslToRgb,
        hslToCss: hslToCss,
        loadImage: loadImage
    };
})(window);