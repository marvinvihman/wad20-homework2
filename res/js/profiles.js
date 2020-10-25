$(document).ready(function () {

    fetchProfiles()
        .then((data) => {
            data.forEach(profile => {
                let profileDiv = createProfileDiv(profile);
                profileDiv.appendTo('.main-container');
            })
        })

    $(document).on("click", ".follow-button", function(){
        $(this).toggleClass(".follow-button following");
    })
});


function createProfileDiv(profile){
    let create = $('<div></div>',{
        class: 'user-profile'
    })
    let image = $('<img />', {
        class: 'profile-avatar',
        src: profile.avatar
    });
    image.appendTo(create);
    let name = $('<h2></h2>', {
        class: "profile-name"
    }).text(profile.firstname + " " + profile.lastname);
    name.appendTo(create);
    let wrapper = $('<div></div>', {
        class: "follow-button-wrapper"
    });
    wrapper.appendTo(create);
    let follow = $('<button></button>', {
        class: "follow-button"
    }).text("Follow");
    follow.appendTo(wrapper);

    return create;
}

function fetchProfiles() {
    return $.getJSON({
            url: "https://private-anon-afaad5f603-wad20postit.apiary-mock.com/profiles",
        success: function(response) {
            return response;
        },
        error: function () {
                console.log("Failed to aqcuire data.")
        }
    });
}