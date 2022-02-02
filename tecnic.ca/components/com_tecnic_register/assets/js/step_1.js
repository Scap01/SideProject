(function($){
	$(document).ready(function () {
		var form        = $('#register_online_form'),
			btn_next    = form.find('.btn.next'),
			categories  = form.find('.register_categories .category'),
			active      = categories.find('a.active');

		//btn_next.addClass('disabled').prop('disabled', true);
		btn_next.remove();

		if(active.length){
			active.next('input[type=radio]').prop('checked', true);
			//btn_next.removeClass('disabled').prop('disabled', false);
		}

		categories.find('a').click(function(e){
			loader_block_page(true);

			e.stopPropagation();
			e.preventDefault();

			categories.find('a').removeClass('active');
			$(this).addClass('active');

			$(this).next('input[type=radio]').prop('checked', true);
			//btn_next.removeClass('disabled').prop('disabled', false);

			submitFormFix(form);
			//form.submit();

			return false;
		})

		/* btn_next.click(function(e){
			e.stopPropagation();
			e.preventDefault();

			active      = categories.find('a.active');

			if(active.length){
				form.submit();
				return true;
			}
			else{
				btn_next.addClass('disabled').prop('disabled', true);
			}

			return false;
		}) */
	});
})(jQuery);
