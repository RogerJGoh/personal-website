function pathPrepare ($el) {
    var lineLength = $el[0].getTotalLength();
    $el.css("stroke-dasharray", lineLength);
    $el.css("stroke-dashoffset", lineLength);
}

// init controller
var signatureController = new ScrollMagic.Controller();

//build tween
var tween = new TimelineMax()

for(var i=1; i<=7; i++){
var $stroke = $("polyline#svg_"+i);
pathPrepare($stroke); //prepare SVG
switch(i) {
    case 5:   //g,e,r
    tween.add(TweenMax.to($stroke, 0.6, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw stroke
    break;
    case 6:   //\
    tween.add(TweenMax.to($stroke, 0.3, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw stroke
    break;
    case 7:   //time between animation and scrolling
    tween.add(TweenMax.to($stroke, 0.2, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw stroke
    break;
    default:  //r,o
    tween.add(TweenMax.to($stroke, 0.2, {strokeDashoffset: 0, ease:Linear.easeNone})) 
}
}

// change color during the whole thing
tween.add(TweenMax.to("polyline", 2, {stroke: "rgb(170, 207, 176)", ease:Linear.easeNone}), 0);			

// build scene
var scene = new ScrollMagic.Scene({triggerHook: "onLeave", triggerElement: "#svgTrigger", duration: 700, tweenChanges: true})
        .setTween(tween)
        // .addIndicators({name: "animation"}) // add indicators (requires plugin)
        .setPin("#introWrapper")
        .addTo(signatureController);