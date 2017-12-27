$(document).on('click', '#contentSections .actions .edit', function(e){

    e.preventDefault();

    $(this).parents('.view_content').hide();
    $(this).parents('.section').children('.editing_content').show();

})
