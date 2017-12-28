$(document).ready(function(){
    checkAuth();
})


$(document).on('click', '#contentSections .actions .remove', function(e){
    e.preventDefault();
    var target = $(this).attr('data-target');
    var image = $(this).parents('.view_content').children('img').attr('data-name');
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


function checkAuth(token){

    // if($('body').attr('data-token') != ''){
        $.ajax({
            headers: {
                'authorization': 'Bearer ' + token
            },
            url: '/admin/token',
            method: 'post',
            success : function(data){
                console.log(data);
            }
        });
    // }

}
