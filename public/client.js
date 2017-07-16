/**
 * Created by aayusharora on 7/10/17.
 */
$(function() {


    var btn = $('#btn');
    var batch_id = $('#batch_id');
    var access_token = $('#access_token');


    btn.click(function () {
        batch_id = batch_id.val();
        access_token = access_token.val();
        ajaxCall(batch_id, access_token);
    });


    function ajaxCall(batch_id, access_token) {
        $.post('/getData', {batch_id: batch_id, access_token: access_token}, function (data) {
                console.log(data);

        });
    }

  });