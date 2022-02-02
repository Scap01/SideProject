window.addEventListener('load',function(){
    var $ = jQuery;
    $(document).ready(function(){
        //we are trully ready and have jQuery on $
        $(".carrieres-blue-bloc-bottom .moduletable .inner_container").click(function(e){
            var new_address = $(this).find("a").attr("href");
            window.location.assign(new_address);
        })
    })
})
