$(function(){ 
    'use strict';
    //adjust Slider Height

    var winh=$(window).height(), 
        upperH =$('.upper-bar').innerHeight(),
        navH =$('.navbar').innerHeight();
    $('.slider, .caroussel-inner .carousel-item').height(winh -(upperH +navH)); 

}); 
$(function(){ 
    'use strict';
    //adjust Slider Height

    var winh=$(window).height(), 
        upperH =$('.upper-bar').innerHeight(),
        navH =$('.navbar').innerHeight();
        services= $('.title').innerHeight();
        cards= $('.cards').innerHeight();
    $('.cards_1').height(winh -(upperH +navH +services+cards)); 

}); 