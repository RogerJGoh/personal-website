$(function () { // wait for document ready
    for(i=0;i<2;i++){ //loop through each scene/block
        var scrollController = new ScrollMagic.Controller();
        var bounceController = new ScrollMagic.Controller();
        var staticLength = $("#staticLength"+i).outerHeight()  //bottom line of the header block/left column
        var scrollLength = $("#scrollLength"+i).outerHeight()  //bottom line of the information block/right column
        var scrollDuration = scrollLength-staticLength      //distance between the two, scroll space
        
        //if screen is small, the header/column fills the width of the page therefore does not require scrolling
        //if scrollDuration is negative, that means the header is longer than the information passage thus also does not require scrolling
        if ($(window).innerWidth() < $(window).innerHeight()  ||  scrollDuration<0) {
        scrollController.enabled(false);
        } else {
        scrollController.enabled(true);
        }
        
        //make space for signature animation if overlapping with navbar
        if(collision($('#signature'), $('#intronavbar')) || collision($('#aboutMeSection'), $('#intronavbar'))){
        var introNavBar = document.getElementById("intronavbar");
        introNavBar.style.display="none";  //allows drawing space for signature on mobile
        }
        if(collision($('#signature'), $('#copyright')) || collision($('#aboutMeSection'), $('#copyright'))){
        var copyright = document.getElementById("copyright");
        copyright.style.display="none";  //allows drawing space for signature on mobile
        }
        
        //build content sections scenes
        var scene = new ScrollMagic.Scene({offset: staticLength-1, triggerHook: "onEnter", triggerElement: "#section"+i, duration: scrollDuration})
                .setPin("#pin"+i)
                // .addIndicators({name: ` (duration: ${scrollDuration})`}) //debugging indicator
                // .addIndicators({name: "scroll"}) //simple indicator
                .addTo(scrollController);
        for(j=0;j<6;j++){
        new ScrollMagic.Scene({offset: staticLength-1, triggerHook: "onEnter", triggerElement: "#section"+i, duration: scrollDuration})
        .setClassToggle("#bouncy"+j,"bounce") //bounces anything with bouncy id
        .addTo(bounceController);
        }

        //prevents multiple premature triggers during manual resizing
        $(window).resize(function() {
        if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 500);
        });
        
        var oldWinWidth = $(window).width();  //for mobile phones that resize slightly on scroll (eg. browser navbar)
        //refresh page on resize to reinit pins
        $(window).on("resizeEnd", function() {
        var newWinWidth = $(window).width();
        if(newWinWidth!=oldWinWidth){
            location.reload();
        }
        });
    }
});