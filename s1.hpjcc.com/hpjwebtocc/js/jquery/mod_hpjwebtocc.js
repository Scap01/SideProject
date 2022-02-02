var webToCcFormWrapper = null;

if (typeof jQuery.fn.live == 'undefined' || !(jQuery.isFunction(jQuery.fn.live))) {
    jQuery.fn.extend({
        live: function (event, callback) {
            if (this.selector) {
                jQuery(document).on(event, this.selector, callback);
            }
        }
    });
}

jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();

var sendWebToCcForm = function (form) {
    if (typeof form === 'undefined') {
        form = jQuery('div.webToCcForm form');
    }
    var wrapper = form.closest('div.webToCcForm'),
        confirmWrapper = wrapper.find('.webToCcConfirmation'),
        validated = validateWebToCcForm(form);
    
    confirmWrapper.css('display', 'none');
    
    if (!validated) {
        return false;
    }
    
    var type = wrapper.children('div.webToCcType').text().trim(),
        requestedUrl = form.attr('action'),
        serializedData = form.serialize() + '&js=1',
        returnF = form.find('input[name="returnurl"]').val();
    
    if (jQuery.browser.msie && window.XDomainRequest) {
        var xdr = new XDomainRequest();
        if (xdr) {
            if (requestedUrl.indexOf('?') >= 0) {
                requestedUrl += '&' + serializedData;
            } else {
                requestedUrl += '?' + serializedData;
            }
            xdr.open("GET", requestedUrl);
            xdr.onload = function () {
                if (xdr.responseText === 'true') {
                    if (typeof wrapper !== 'undefined') {
                        wrapper.find("span.webToCcConfirmation").css('display', 'block');
                    } else {
                        confirmWrapper.css('display', 'block');
                    }
                    if (type === 'xhr') {
                        if (form.find('.g-recaptcha-response').length > 0 && form.find('.g-recaptcha-response').val() !== "") {
                            grecaptcha.reset();
                        }
                    } else {
                        window.location.href = returnF;
                    }
                } else {
                    webToCcDisplayError(form, true);
                }
            };
            xdr.onerror = function () {
            };
            xdr.send();
        }
    } else {
        jQuery.ajax({
            type: "POST",
            async: "true",
            crossDomain: true,
            url: requestedUrl,
            data: serializedData,
            dataType: "html",
            success: function (data, responseText) {
                if (data === 'true') {
                    if (typeof wrapper !== 'undefined') {
                        wrapper.find("span.webToCcConfirmation").css('display', 'block');
                    } else {
                        confirmWrapper.css('display', 'block');
                    }
                    if (type === 'xhr') {
                        if (form.find('.g-recaptcha-response').length > 0 && form.find('.g-recaptcha-response').val() !== "") {
                            grecaptcha.reset();
                        }
                    } else {
                        window.location.href = returnF;
                    }
                } else {
                    webToCcDisplayError(form, true);
                }
            }
        });
    }
};

jQuery(document).ready(function () {
    if (webToCcFormWrapper) {
        return null;
    }
    webToCcFormWrapper = jQuery('div.webToCcForm');
    if (!webToCcFormWrapper.length) {
        return null;
    }
    var button = jQuery('div.webToCcForm input[type=button], div.webToCcForm input[type=submit], div.webToCcForm button[type=submit]');
    if (!button.length) {
        return null;
    }
    
    webToCcFormWrapper.each(function (index, elemWrapper) {
        var wrapper = jQuery(elemWrapper),
            form = wrapper.find('form'),
            returnF = form.find('input[name="returnurl"]');
        
        if (returnF.length) {
            var redirectUrl = '',
                id = wrapper.find('.webToCcId').text().trim();
            
            if (jQuery.trim(returnF.val()) !== '' && jQuery.trim(returnF.val()) !== 'http://') {
                redirectUrl = returnF.val();
            } else {
                redirectUrl = window.location.href;
            }
            if (redirectUrl.indexOf('?') >= 0) {
                redirectUrl += '&cft=icpt-scs-' + id;
            } else {
                redirectUrl += '?cft=icpt-scs-' + id;
            }
            returnF.val(redirectUrl);
        }
        
        var method = false,
            button = form.find('input[type=button], input[type=submit], button[type=submit]');
        if (typeof button.on === "function") {
            method = 'on';
        } else if (typeof button.live === "function") {
            method = 'live';
        }
        
        if (method) {
            form.find('input:text, textarea').each(function (index, element) {
                var initialValue = jQuery(element).val();
                jQuery(element)[method]('focus', function () {
                    if (jQuery(element).val() === initialValue) {
                        jQuery(element).val('');
                    }
                });
                
                jQuery(element)[method]('blur', function () {
                    if (jQuery(element).val().trim() === '') {
                        jQuery(element).val(initialValue);
                    }
                });
            });
            
            button[method]('click', function (event) {
                if (form.find('.g-recaptcha').length === 0 || form.find('.g-recaptcha-response').val() !== "") {
                    event.stopPropagation();
                    event.preventDefault();
                    sendWebToCcForm(form);
                }
            });
        }
    });
});