/**
 *  Copyright (c) 2023
 *  @Version    : 1.0.0
 *  @Repository : https://github.com/salarizadi/blurCTX
 *  @Author     : https://salarizadi.github.io
 *
 * $.blob({
 *     url: "http://localhost/image.png",
 *     progress: percent => {
 *         console.log("percent", percent)
 *     },
 *     loader : xhr => {
 *         console.log("loading", xhr)
 *     },
 *     success: result => {
 *         console.log("Success : ", result)
 *     },
 *     error: xhr => {
 *         console.log("Error : ", xhr)
 *     }
 * })
 */

(function ($, window) {

    $.blob = function ( options ) {
        if ( typeof options !== "object" )
            throw "$.blob: Options variable not a object";

        if ( typeof options.url === "undefined" )
            throw "$.blob: url not undefined";

        options = $.extend(true, {
            progress: percent => {},
            loader  : xhr     => {},
            success : result  => {},
            error   : xhr     => {}
        }, options);

        return $.ajax({
            url        : options.url,
            xhrFields  : {responseType: 'blob'},
            xhr        : ( ) => {
                let xhr      = new window.XMLHttpRequest();
                let percent  = 0;

                xhr.addEventListener("progress", function ( event ) {
                    if ( percent >= 100 )
                        return false;

                    let total;
                    if (event.lengthComputable)
                        total = event.total
                    else
                        total = 63403

                    let position = event.loaded || event.position;
                    percent = Math.ceil(position / total * 100);
                    percent = percent > 100 ? 100 : percent;

                    options.progress(percent);
                }, false)

                return xhr;
            },
            beforeSend : options.loader,
            success    : result => options.success((window.URL || window.webkitURL).createObjectURL(result)),
            error      : xhr    => options.error(xhr)
        });
    }

})(jQuery, window);