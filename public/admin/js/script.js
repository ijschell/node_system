$(document).ready(function(){

    activeTinymce();

    convertStringToHtml();

})

$(document).on('click', '#contentSections .actions .edit', function(e){

    e.preventDefault();

    $(this).parents('.view_content').hide();
    $(this).parents('.section').children('.editing_content').show();

})


$(document).on('blur', '#perfilSection input[name="pass"]', function(){

    if($(this).val() != $('#perfilSection input[name="pass_confirmation"]').val()){
        $('#perfilSection .msj.error').html('Las contraseñas deben ser iguales.');
    }else {
        $('#perfilSection .msj.error').html('');
    }

})


// jquery validator
$.validate({
    modules : 'security'
})


// Active Tinymce
function activeTinymce(){

    ClassicEditor
        .create( document.querySelector( '#editor' ))
        .catch( error => {
            console.error( error );
        } );

    $('#contentSections .section').each(function(k, v){

        ClassicEditor
            .create( document.querySelector( '#editor_' + k ))
            .catch( error => {
                console.error( error );
            } );

    })

}


function convertStringToHtml(){

    // var markup = '<div><p>text here</p></div>';
    $('#contentSections .section').each(function(k, v){
        var markup = $(v).find('.view_content .content_description').text();
        $(v).find('.view_content .content_description').html(markup);
    })
    // var parser = new DOMParser()
    // var el = parser.parseFromString(markup, "text/xml");

}
