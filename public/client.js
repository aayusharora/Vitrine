/**
 * Created by aayusharora on 7/10/17.
 */
$(function() {


        var btn = $('#btn');
        var login_btn = $('#signin');
        var batch_id = $('#batch_id option:selected');
        var access_token = $('#access_token');
        var userName = $('#user');
        var access_card = $('.access_card');
        var access_login_card = $('.access_login_card');
        var pass = $('#password');
        var login_direct = $('#login_direct');
        var login_username = $('#login_username');
        var login_password = $('#login_password');
        var showcases = $('#showcases');
        var username = '';
        var batchId = '';
        var batchAccesstoken = '';
        var userInfo = [];



        btn.click(function () {
            batchId = $('#batch_id option:selected').text();
            batchAccesstoken = access_token.val();
            getData(batchId, batchAccesstoken);
        });

        login_btn.click(function(){
            var password = pass.val();
            storeData(batchId, batchAccesstoken, password);

        });

        login_direct.click(function() {

            var user = login_username.val();
            var pass = login_password.val();

            $.post('/login',{username: user, password: pass}, function(data) {
                console.log(data);
                window.location = 'upload';
            });

        });

        showcases.click(function () {
            getShowcases();
        });



    function getData(batch_id, access_token) {
        $.post('/getData', {batch_id: batch_id, access_token: access_token}, function (data) {
                hideTokenContainer();
                setUsername(JSON.parse(data)[0].account_slug);
                showLoginContainer();


        });
    }


    function storeData(batch_id, access_token, pass){
        $.post('/storeData',{username: username,batch_id: batch_id, access_token: access_token, password: pass}, function(data) {
            console.log(data);
        });
    }

    function setUsername(user) {
        username = user;
        userName.text(username);

    }

    function hideTokenContainer() {

      access_card.addClass('animate_access_card');
      access_card.hide();

    }

    function showLoginContainer() {
        access_login_card.addClass('animate_login_card');
    }


    function getShowcases () {
        $.get('/showcases',function(data) {
            userInfo = data;
            window.location = '/showcase';
        });

    }



});