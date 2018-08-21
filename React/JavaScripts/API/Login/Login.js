$(document).ready(function () {
    var xxx = () => {
        $.ajax({
            type: 'POST',
            url: 'https://master-wfs.agilsun.com/wfs/auth/token',
            data: {
                email: $('.idEmail').val(),
                password: $('.idPassword').val()
            },
            success: (main) => {
                localStorage.setItem('token', main.token);
                renderHtml();
            }
        });
        if (localStorage.getItem('token') != null) {
            $('#login').hide();
            $('#list-item').show();
            $('#logOut').show();
            $('#filter').show();

        }
    };

    var renderHtml = () => {
        $.ajax({
            type: 'GET',
            url: 'https://master-wfs.agilsun.com/wfs/transfer/list?limit=30&page=1&',
            // data: {'limit':15, 'page':1},
            // data: {'transfer_type':'move_regional', 'state':'done'},
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: (kein) => {
                var listItem = kein.data.records
                for (x in listItem) {
                    $('.table-item').append(`<tr class="zzz">
                            <td class="code">` + listItem[x].code + `</td>
                            <td class="create_date">` + listItem[x].seller + `</td>
                            <td class="create_date">` + listItem[x].create_date + `</td>
                            <td class="create_date">` + listItem[x].warehouse + `</td>
                            <td class="warehouse">` + listItem[x].warehouse_dest + `</td>
                            <td class="warehouse">` + listItem[x].transfer_type + `</td>
                            <td class="state">` + listItem[x].state + `</td>
                            </tr>`)
                }
            }
        }) //AJAX GET APPEND HTML  
    }


    //-----EnterLogin-----//
    $(document).keypress(function (e) {
        if (e.which == 13) {
            xxx();
        }
    });
    //-----ButtonLogin-----//
    $('.idLogin').click(function () {
        xxx();
    });
    //-----ButtonLogOut-----//
    $('#logOut').click(function () {
        localStorage.removeItem('token');
        $('#login').show();
        $('#list-item').hide();
        $('#logOut').hide();
        $('#filter').hide();
    });

    $('#transfer_type').on('change', function(){
        $('.table-item .zzz').html("");
        $.ajax({
            type: 'GET',
            url: 'https://master-wfs.agilsun.com/wfs/transfer/list?limit=15&page=1&'+'transfer_type=' + this.value,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: (kein) => {
                var listItem = kein.data.records
                for (x in listItem) {
                    $('.table-item').append(`<tr class="zzz">
                            <td class="code">` + listItem[x].code + `</td>
                            <td class="create_date">` + listItem[x].seller + `</td>
                            <td class="create_date">` + listItem[x].create_date + `</td>
                            <td class="create_date">` + listItem[x].warehouse + `</td>
                            <td class="warehouse">` + listItem[x].warehouse_dest + `</td>
                            <td class="warehouse">` + listItem[x].transfer_type + `</td>
                            <td class="state">` + listItem[x].state + `</td>
                            </tr>`)
                }
            }
        }) //AJAX GET APPEND HTML

    });
    
});