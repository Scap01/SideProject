window.addEventListener('load',function(){
    var $ = jQuery;
    $(document).ready(function(){
        //we are trully ready and have jQuery on $
        recalculate_avantages_bloc_height();
    })
})

jQuery( window ).resize(function() {
    recalculate_avantages_bloc_height();
})

var recalculate_avantages_bloc_height = function(){
    var $ = jQuery;
	var avantage_2_page = $(".item-page").hasClass("avantages-2") ? true : false;
    $('.avantages_module_single').each(function(){
        var height_blocs = avantage_2_page ? 488 : 373;
        var current_wight = $(this).outerWidth();
        var width_to_height_ratio = avantage_2_page ? 409/488 : 409/373;
        var new_height = current_wight/width_to_height_ratio;
        if(avantage_2_page){
            new_height = new_height < 490.0 ? 490 : new_height;
        }
        $(this).css({
            'height'    : new_height
        })
    })
};
