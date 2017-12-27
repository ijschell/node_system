$(document).on('click', '#contentSections .actions .edit', function(e){

    e.preventDefault();

    $(this).parents('.view_content').hide();
    $(this).parents('.section').children('.editing_content').show();

})


$(document).on('blur', '#perfilSection input[name="pass"]', function(){

    if($(this).val() != $('#perfilSection input[name="pass_confirmation"]').val()){
        $('#perfilSection .msj.error').html('Las contraseñas no son deben ser iguales.');
    }else {
        $('#perfilSection .msj.error').html('');
    }

})


// jquery validator
$.validate({
    modules : 'security'
})
