(function($){
    $(document).ready(function(){
        $('.banner-container').click(function(e){
            $(this).find(".hidden-container").slideDown();
        })

        $('.banner-container .pref_com_banner_later_btn').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            later();
        })

        $('.banner-container .pref_com_banner_save_btn').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            accept_changes();
        })

        var accept_changes = function(){
            var data = {};

            //Add token
            data[$('.banner-container #ajax_token_banner').attr('name')] = 1;
            data.preferences = [];
            $('.hidden-container input[type="checkbox"]').each(function(){
                var key = $(this).attr("name");
                var value = $(this).is(':checked') ? 1 : 0;
                data.preferences[key] = value;
            })
            var ajax_url = "/index.php?option=com_tecnic_mondossier&task=profile.ajax_savePreferencesCommunications";
            later();
            send_ajax_request(data, ajax_url);
        }

        var send_ajax_request = function(data, ajax_url){
            loader_block_page(true);
            jQuery.post(ajax_url, data, function(data){
				//data = JSON.parse(data);
                //we dont actually do anything here other than remove the loader
				loader_block_page(false);
			});
        }

        var later = function(){
            $('.banner-container').slideUp();
        }
    })
})(jQuery)
