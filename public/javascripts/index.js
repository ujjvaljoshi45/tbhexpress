var pagestatus = 'index';

document.addEventListener("DOMContentLoaded", function(event) {

    load_page(pagestatus);

});

function load_page(pagestatus) {

    if (pagestatus == 'index') {
        get_post();
        document.getElementById('profile-div').style.display = 'none';
        document.getElementById('post-div').style.display = 'none';
        document.getElementById('index-div').style.display = 'block';
        document.getElementById('create-post-div').style.display = 'block';

    } else if (pagestatus == 'profile') {
        get_user_post();
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
        if (res.status == 'success'){
            document.getElementById('new-post-content').value = '';
            load_page('index');
        }
    });
}

function get_post(){
    fetch('/getpost', {method: 'GET'})
    .then(res => res.json())
    .then(res => {
        if (res.status == 'success'){
            var post = res.post;
            var post_div = document.getElementById('index-div');
            post_div.innerHTML = '';
            for (var i = 0; i < post.length; i++){
                var post_content = document.createElement('div');
                post_content.className = 'post-content';
                post_content.innerHTML = `
                <a class='post-user' onclick="getOtherProfile('${post[i].user}')">${post[i].user}</a> <br>
                <div class='post-content'>${post[i].body}<br></div>
                <div class='post-timestamp'>${post[i].date}</div>
                `;
                post_div.appendChild(post_content);
            }
        } else {
            console.log('error');
        }
    });
}

function get_user_post() {
    fetch('/getuserpost', {method: 'GET'})
    .then(res => res.json())
    .then(res => {
        if (res.status == 'success'){
            var post = res.post;
            var post_div = document.getElementById('profile-div');
            post_div.innerHTML = '';
            for (var i = 0; i < post.length; i++){
                var post_content = document.createElement('div');
                post_content.className = 'post-content';
                post_content.innerHTML = `
                <a class='post-user' onclick="getOtherProfile('${post[i].user}')">${post[i].user}</a> <br>
                <div class='post-content'>${post[i].body}<br></div>
                <div class='post-timestamp'>${post[i].date}</div>
                `;
                post_div.appendChild(post_content);
            }
            document.getElementById('profile-post-div').appendChild(post_div);
        } else {
            console.log('error');
        }
    });
}