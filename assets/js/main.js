var mobile_img_exclude = new Set(["lamp", "drawing"]);

$(window).on("load", function(){
    var lamp_height = $("img#lamp").height();
    var window_height = $(window).height();

    // desktop
    if ($(window).width() > 1024) {
        var dscale_ratio = (0.70 * window_height) / lamp_height // ratio based off of lamp height

        $('img.home').each(function() {
            // scale images down
            var og_height = $(this).height(),
            new_height = Math.round(og_height * dscale_ratio);
            $(this).height(new_height);
            $(this).show()
        });
    }
    // vertical tablet
    else if ($(window).width() > 600) {
        var dscale_ratio = (0.45 * window_height) / lamp_height // ratio based off of lamp height
        $('img.home').each(function() {
            // scale images down
            var og_height = $(this).height(),
            new_height = Math.round(og_height * dscale_ratio);
            $(this).height(new_height);

            $(this).show();
        });

    }
    // mobile
    else if ($(window).width() <= 600) {
        var dscale_ratio = (0.5 * window_height) / lamp_height // ratio based off of lamp height

        $('img.home').each(function() {
            // scale images down
            var og_height = $(this).height(),
            new_height = Math.round(og_height * dscale_ratio);
            $(this).height(new_height);

            if (!mobile_img_exclude.has($(this).attr("id"))) {
                $(this).show();
            }
        });
    }

    // clear loading screen
    $(".loading-screen").addClass("hidden");
});
