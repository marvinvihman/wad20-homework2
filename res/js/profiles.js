$(document).ready(function () {
    $.getJSON("https://private-anon-afaad5f603-wad20postit.apiary-mock.com/profiles",
        function (data) {
            $.each(data, function (index, value){
                let create = $('<div></div>',{
                    class: 'user-profile'
                })
                create.appendTo('.main-container');
                let image = $('<img />', {
                    class: 'profile-avatar',
                    src: value.avatar
                });
                image.appendTo(create);
                let name = $('<h2></h2>', {
                    class: "profile-name"
                }).text(value.firstname + " " + value.lastname);
                name.appendTo(create);
                let wrapper = $('<div></div>', {
                    class: "follow-button-wrapper"
                });
                wrapper.appendTo(create);
                let follow = $('<button></button>', {
                    class: "follow-button"
                }).text("Follow");
                follow.appendTo(wrapper);
            });
        });
    $(document).on("click", ".follow-button", function(){
        $(this).toggleClass(".follow-button following");
    })
});