$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: 'http://210.211.117.149:8000/wfs/auth/token',
        data: {
            email: 17105,
            password: 17105
        },
        success: function (main) {
            localStorage.setItem('token', main.token);
        },
        type: 'GET',
        url: 'http://210.211.117.149:8000/wfs/transfer/list?limit=30&page=1&',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (kein) {
            var listItem = kein.data.records
            for (x in listItem) {
                $('.table-item').append(`<tr class="zzz">
                <td class="code">` + listItem[x].code + `</td>
                <td class="create_date">` + listItem[x].create_date + `</td>
                <td class="warehouse">` + listItem[x].warehouse_dest + `</td>
                <td class="seller">` + listItem[x].seller + `</td>
                <td class="state">` + listItem[x].state + `</td>
            </tr>`)
            }   
        }
    });
});