let posts = [];

$(function () {

    loadPosts()
        .then(function (response) {
            for (let post of response) {
                posts.push(new Post(post.id, post.author, post.createTime, post.text, post.media, post.likes))
            }

            displayPosts()
        })
        .catch(function () {
            alert("Error loading posts info")
        });

    $(document).on("click", ".like-button", function (){
        $(this).toggleClass(".like-button liked");
    })
})

function loadPosts() {
    return $.get(
        {
            url: 'https://private-anon-da27b6919a-wad20postit.apiary-mock.com/posts',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

function displayPosts() {
    $('section.main-container').empty();
    for (let pos of posts) {

        let po = $("<div></div>").attr("class", "post");
        let author_info = $("<span></span>").attr("class", "post-author-info");

        let post_author_img = $("<img>").attr("src", pos.author["avatar"]).attr("alt", "").attr("class", "post-author-info");
        let name = $("<small></small>").text(pos.author["firstname"] + " " + pos.author["lastname"]);

        author_info.append(post_author_img, name);


        let create_time = $("<small></small>").text(pos.createTime);

        let media_div = $("<div></div>").attr("class", "post-image");
        if (pos.media != null) {

            if (pos.media["type"] === "image") {
                let media_img = $("<img>").attr("src", pos.media["url"]).attr("alt", "");
                media_div.append(media_img);
            }

            if (pos.media["type"] === "video") {
                let media_video = $("<video controls>").attr("src", pos.media["url"]);
                media_div.append(media_video);
            }
        }

        let title_div = $("<div></div>").attr("class", "post-title");
        if (pos.text != null) {
            let title = $("<h3></h3>").text(pos.text);
            title_div.append(title);
        }

        let button_div = $("<div></div>").attr("class", "post-actions");
        let like_button = $("<button></button>").attr("type", "button").attr("name", "like")
            .attr("class", "like-button").text(pos.likes);
        button_div.append(like_button);

        if (pos.media === null) {
            po.append(author_info, create_time, title_div, button_div);
        } else if (pos.text === null) {
            po.append(author_info, create_time, media_div, button_div);
        } else {
            po.append(author_info, create_time, media_div, title_div, button_div);
        }

        $(".main-container").append(po);
    }
}