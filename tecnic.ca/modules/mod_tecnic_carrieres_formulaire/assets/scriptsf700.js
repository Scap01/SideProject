var img_loader = '/components/com_tecnic_mondossier/assets/img/loader.gif';
(function($){
    $(document).ready(function(){
        var loader_block_page = function(add,_class){            
    		_class = _class || 'loader';
    		add = add || false;
    		if(add){
    			var html = '<div class="' +_class+ '" style="z-index:9999;position: absolute;top:0;left:0;right:0;bottom:0;">';
    			html += '<img style="display: block;left: 50%;position: absolute;top: 50%;margin:-32px 0 0-32px;" src="' + img_loader + '" />'
    			html += '</div>';
    			$('#content').append(html)
    		}else{
    			$('#content').find('.' + _class).remove();
    		}
    	};

        $("#carrieres_region").change(function(e){
            var val = $(this).val();
            $(".formulaire_carrieres_school_lists_container").hide();
            if(parseInt(val) > 0 && typeof ecoles_regions_data != "undefined" && ecoles_regions_data.length){
                for(var i = 0; i < ecoles_regions_data.length; i++){
                    if(ecoles_regions_data[i].id_region_administrative == val && typeof ecoles_regions_data[i].ecoles != "undefined" && ecoles_regions_data[i].ecoles.length){
                        $(".formulaire_carrieres_school_lists_container div.formulaire_carrieres_schools_container").html("");
                        var html = "";
                        var ecoles = ecoles_regions_data[i].ecoles;
                        for(var k = 0; k < ecoles.length; k++){
                            html += '<div class="col-sm-6 col-xs-12"><input type="checkbox" name="ecoles_ids[]" value="'+ecoles[k].ecole_global_id+'" id="ecole_id_'+ecoles[k].ecole_global_id+'"><label for="'+ecoles[k].ecole_global_id+'">'+ecoles[k].valeur+'</label></div>';
                        }
                        $(".formulaire_carrieres_school_lists_container div.formulaire_carrieres_schools_container").html(html);
                        $(".formulaire_carrieres_school_lists_container").show();
                        i = 9999;
                    }
                }
            }
        })

        var validate = function(){
            var valid = true;
            //get all fields and validate them,
            loader_block_page(true);
            $(".formulaire_carrieres_form_fields_container input.required").each(function(){
                var val = $(this).val();
                if(val == ""){
                    valid = false;
                    $(this).addClass("error");
                    $(this).parent().parent().find("label").addClass("error");
                }else{
                    $(this).removeClass("error");
                    $(this).parent().parent().find("label").removeClass("error");
                }
            });
            if(!valid){
                loader_block_page(false);
            }
            return valid;
        }

        $(".formulaire_carrieres_form_fields_container input.required").on("blur change keyup",function(){
            $(this).removeClass("error");
            $(this).parent().parent().find("label").removeClass("error");
        })

        $("input[type=submit]").click(function(e){
            var valid = validate();
            if(!valid){
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        })
    })
})(jQuery)
