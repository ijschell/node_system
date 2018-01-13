$(document).ready(function(){

    getDataForHome();

})


function getDataForHome(){

    $.ajax({
        url: '/home_data',
        method: 'post',
        success : function(data){
            console.log(data);

            // print config
            $('title').text(data.info.config.title);
            $('meta[name=description]').attr('content', data.info.config.description);
            $('meta[name=keywords]').attr('content', data.info.config.keywords);
            $('meta[name=author]').attr('content', data.info.config.author);

            // print section1 data
            $('#section1 .image').css('background-image', 'url(/admin/files/'+data.info.sections[0].image+')');
            $('#section1 h3').html(data.info.sections[0].title);
            $('#section1 p').html(data.info.sections[0].description);

            // print section2 data
            $('#section2 .image').css('background-image', 'url(/admin/files/'+data.info.sections[1].image+')');
            $('#section2 h3').html(data.info.sections[1].title);
            $('#section2 p').html(data.info.sections[1].description);

            // print contact data
            $('#contact').html(`
                Nombre: `+data.info.contact.name+`
                Mail: `+data.info.contact.mail+`
                Tel: `+data.info.contact.phone+`
            `)

        }
    })

}
