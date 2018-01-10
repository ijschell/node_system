$(document).ready(function(){

    getDataForHome();

})


function getDataForHome(){

    $.ajax({
        url: '/home_data',
        method: 'post',
        success : function(data){
            
            // print config
            $('title').text(data.info.config.title);
            $('meta[name=description]').attr('content', data.info.config.description);
            $('meta[name=keywords]').attr('content', data.info.config.keywords);
            $('meta[name=author]').attr('content', data.info.config.author);

            // print sections
            $(data.info.sections).each(function(k, v){
                $('#sections').append(`
                    <img src="./admin/files/`+v.image+`" />
                    <h3>`+v.title+`</h3>
                    <div>`+v.description+`</div>
                `)
            })

            // print contact data
            $('#contact').html(`
                Nombre: `+data.info.contact.name+`
                Mail: `+data.info.contact.mail+`
                Tel: `+data.info.contact.phone+`
            `)

        }
    })

}
