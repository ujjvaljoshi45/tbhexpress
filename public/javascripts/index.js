var pagestatus = 'index';

document.addEventListener("DOMContentLoaded", function(event) {

    load_page(pagestatus);

});

function load_page(pagestatus) {

    if (pagestatus == 'index') {
        document.getElementById('profile-div').style.display = 'none';
        document.getElementById('post-div').style.display = 'none';
        document.getElementById('index-div').style.display = 'block';
        document.getElementById('create-post-div').style.display = 'block';

    } else if (pagestatus == 'profile') {
        document.getElementById('index-div').innerHTML = '';
        document.getElementById('create-post-div').style.display = 'none';
        document.getElementById('index-div').style.display = 'none';
        document.getElementById('post-div').style.display = 'none';
        document.getElementById('profile-div').style.display = 'block';
    } else if (pagestatus == 'post') {
        document.getElementById('index-div').innerHTML = '';
        document.getElementById('create-post-div').style.display = 'none';
        document.getElementById('index-div').style.display = 'none';
        document.getElementById('profile-div').style.display = 'none';
        document.getElementById('post-div').style.display = 'block';
    }
}

function add_post(){
    var post = document.getElementById('new-post-content').value;
    fetch('/addpost', {
        method: 'POST',
        body: JSON.stringify({post: post}),
    }).then(res => res.json())
    .then(res => {
        console.log(res);
    });
}