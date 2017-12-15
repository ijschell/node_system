$(document).ready(function(){

})


$(document).on('click', '#contentSections .actions .remove', function(e){
    e.preventDefault();
    var target = $(this).attr('data-target');
    var image = $(this).parents('.id_' + target).children('img').attr('data-name');
    console.log(image);
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
