$(document).ready(function(){

})


$(document).on('click', '#contentSections .section .view_content .actions .remove', function(e){

    e.preventDefault();

    var target = $(this).attr('data-target');

    var image = $(this).parents('.view_content').children('.image').attr('data-name');

    $.ajax({
        url: '/admin/sections',
        method: 'post',
        data: {
            section : 'del',
            target : target,
            image : image
        },
        success : function(){
            window.location = window.location.href
        }
    })

})
