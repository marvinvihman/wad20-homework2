
$(document).ready(function () {
    fetchProfile()
        .then((data) => {
            let image = data.avatar;
            let avatar = $('<img />', {
                class: 'avatar',
                src: image,
                alt: 'Me'
            });
            avatar.appendTo('.avatar-container');



            let menu = $('<div></div>', {
                class: 'dropdown'
            });
            menu.hide();

            let info = $('<p></p>', {
                class: "dropdown-item"
            }).text(data.firstname + " " + data.lastname);
            info.appendTo(menu);

            let mail = $('<p></p>', {
                class: "dropdown-item"
            }).text(data["email"]);
            mail.appendTo(menu);

            let browse = $('<a></a>',{
                href: "browse.html",
                class: "dropdown-item"
            }).text("Browse");
            browse.appendTo(menu);

            $('<br>').appendTo(menu);

            let logout = $('<a></a>',{
                href: "login.html",
                class: "dropdown-item"
            }).text("Log Out");
            logout.appendTo(menu);

            menu.appendTo('.avatar-container');
        })

    $(document).on("click", ".avatar", function(){
        $('.dropdown').toggle();
    })
});


function fetchProfile() {
    return $.getJSON({
        url: "https://private-anon-afaad5f603-wad20postit.apiary-mock.com/users/1",
        success: function(response) {
            return response;
        },
        error: function () {
            console.log("Failed to aqcuire data.")
        }
    });
}