function validateWebToCcForm(form) {
    
    webToCcDisplayError(form, false);
    var validatedRequired = validateWebToCcRequired(form);
    var validatedEmail = validateWebToCcEmail(form);
    var validatedCheck = validateWebToCcChecked(form);
    var validatedAtLeastOneCheck = validateWebToCcAtLeastOneChecked(form);
    
    var validated = validatedRequired && validatedEmail && validatedCheck && validatedAtLeastOneCheck;
    webToCcDisplayError(form, !validated);
    
    return validated;
}

function validateWebToCcRequired(form) {
    var validated = true;
    form.find('input[class~=required], select[class~=required], textarea[class~=required]').each(function (index, element) {
        var method = 'removeClass';
        if (jQuery(element).val() === null || jQuery(element).val().trim() === '') {
            method = 'addClass';
            validated = false;
        }
        jQuery(element)[method]('error');
        form.find('label[for=' + (jQuery(element).attr('id') || jQuery(element).attr('name')) + ']')[method]('error');
    });
    
    return validated;
}

function validateWebToCcEmail(form) {
    var validated = true;
    var filterEmail = /^([a-zA-Z0-9_\.\-\+]+)\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    form.find('input[class~=mail]').each(function (index, element) {
        if (element.type === "text" || element.type === "email") {
            var method = 'removeClass';
            var value = jQuery(element).val().trim();
            jQuery(element).val(value);
            
            if ((value === "" && jQuery(element).hasClass("required")) || !filterEmail.test(value)) {
                method = 'addClass';
                validated = false;
            }
            
            jQuery(element)[method]('error');
            form.find("label[for=" + element.name + "]")[method]("error");
        }
    });
    
    form.find("input[class~=confirm_email]").each(function (index, element) {
        var name = element.name;
        var relatedField = jQuery(element).attr('rel');
        var nameEmail = form.find(relatedField).attr("name");
        var method = null;
        if (jQuery(element).attr("value").trim() !== form.find(relatedField).attr("value").trim()) {
            method = 'addClass';
            validated = false;
        } else {
            if (nameEmail.trim() !== "" && jQuery(element).attr("value").trim() === form.find(relatedField).attr("value").trim()) {
                method = 'removeClass';
            }
        }
        
        if (method) {
            jQuery(element)[method]("error");
            form.find("label[for=" + name + "]")[method]("error");
            form.find("label[for=" + nameEmail + "]")[method]("error");
        }
    });
    
    return validated;
}

function validateWebToCcChecked(form) {
    var index = 0;
    var fields = null;
    var groups = new Array();
    
    fields = form.find('input[class~=check_required]');
    fields.each(function (index, element) {
        if (element.type === "checkbox" || element.type === "radio") {
            if (groups.indexOf(element.name) === -1) {
                groups[index++] = jQuery(element);
            }
        }
    });
    
    var tmpResult = null;
    var result = true;
    if (groups.length > 0) {
        groups.forEach(function (group, index) {
            tmpResult = false;
            form.find("input[name=" + group[index].name + "]").each(function (indexgroup, element) {
                if (element.checked) {
                    tmpResult = true;
                }
            });
            form.find("label[for=" + group[index].name + "]").each(function (indexgroup, elementLabel) {
                if (!tmpResult) {
                    jQuery(elementLabel).addClass("error");
                } else {
                    jQuery(elementLabel).removeClass("error");
                }
            });
            result &= tmpResult;
        });
    }
    
    return result;
}

function validateWebToCcAtLeastOneChecked(form) {
    var fields = null;
    var result = true;
    var fieldname = null;
    var fieldnameOneChecked;
    
    var fieldstoCheck = form.find('input[class~=check_onechecked]');
    if (fieldstoCheck.length > 0) {
        result = false;
        fields = form.find('input[class~=check_onechecked]:checked');
        fields.each(function (index, element) {
            if (jQuery(element).attr("type") === "checkbox" || jQuery(element).attr("type") === "radio") {
                fieldname = jQuery(element).attr("name");
                
                form.find("input[name=" + fieldname + "]").each(function (index, elem) {
                    if (!result) {
                        var fieldsOneChecked = form.find('input[class~=check_onechecked]');
                        fieldsOneChecked.each(function (index, elementOneChecked) {
                            if (elementOneChecked.attr("type") === "checkbox" || elementOneChecked.attr("type") === "radio") {
                                fieldnameOneChecked = elementOneChecked.attr("name");
                                jQuery("label[for=" + fieldnameOneChecked + "]", form).each(function (index, elementOneCheckedLabel) {
                                    elementOneCheckedLabel.removeClass("error");
                                    result = true;
                                });
                            }
                        });
                    }
                });
            }
        });
        
        if (!result) {
            var fieldsOneChecked = form.find('input[class~=check_onechecked]');
            fieldsOneChecked.each(function (index, elementOneChecked) {
                if (elementOneChecked.attr("type") === "checkbox" || elementOneChecked.attr("type") === "radio") {
                    fieldnameOneChecked = elementOneChecked.attr("name");
                    jQuery("label[for=" + fieldnameOneChecked + "]", form).each(function (index, elementOneCheckedLabel) {
                        elementOneCheckedLabel.addClass("error");
                    });
                }
            });
        }
    }
    
    return result;
}

function webToCcGetCoordinates(formId, elementId) {
    if (jQuery(formId) && jQuery(elementId)) {
        var backH = jQuery(formId).getStyle('height').toInt();
        var backW = jQuery(formId).getStyle('width').toInt();
        
        var loadT = ((backH - jQuery(elementId).getStyle('height').toInt()) / 2).round();
        var loadL = ((backW - jQuery(elementId).getStyle('width').toInt()) / 2).round();
        
        return {backHeight: backH, backWidth: backW, loadTop: loadT, loadLeft: loadL};
    }
}

function webToCcDisplayError(form, displayError) {
    var errorRequired = form.closest('div.webToCcForm').find('span[class~=webToCcErrorRequired]');
    if (errorRequired.length) {
        if (displayError) {
            errorRequired.css('display', 'block');
        } else {
            errorRequired.css('display', 'none');
        }
    }
}

/**
 * Afficher le div de chargement
 */
function webToCcDisplayLoadingBox(div) {
    if (div) {
        // On crée les divs
        var backgroundBox = new Element('div', {
            'id': 'webToCcBackgroundBox'
        });
        var loadingBox = new Element('div', {
            'id': 'webToCcLoadingBox'
        });
        
        // On les insert dans le DOM
        loadingBox.inject(backgroundBox);
        backgroundBox.inject(div, 'top');
        
        var coordinates = webToCcGetCoordinates(div.get('id'), 'webToCcLoadingBox');
        
        var form = div.getElement('form');
        form.setStyle('display', 'none');
        
        backgroundBox.setStyles({
            'display': 'block',
            'width': coordinates.backWidth + 'px',
            'height': coordinates.backHeight + 'px'
        });
        loadingBox.setStyles({
            'display': 'block',
            'top': coordinates.loadTop + 'px',
            'left': coordinates.loadLeft + 'px'
        });
    }
}

/**
 * Détruit le div de chargement
 */
function webToCcHideLoadingBox(formId) {
    if (jQuery(formId)) {
        var div = jQuery(formId).getElement('div[class=webToCcBackgroundBox]');
        
        if (div) {
            div.dispose();
        }
    }
}
