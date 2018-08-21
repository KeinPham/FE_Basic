$(function () {
	if (
		localStorage.getItem("token") === null ||
		localStorage.getItem("token") === "undefined"
	) {
		alert("Đăng Nhập");
		window.location.href = "Login-2.html";
	}else{
		renderMain();
	}
	$.ajax({
		url: "https://master-wfs.agilsun.com/wfs/co/filter",
		headers: {
			Authorization: localStorage.getItem("token"),
			"Content-Type": "application/x-www-form-urlencoded"
		},
		dataType: "json",
		data: {},
		success: function (seller) {
			var sellerHtml = seller.data.seller;
			var renderHtml = '<option value = "" >Tất cả</option> ';
			sellerHtml.forEach(element => {
				renderHtml += "<option value='" + element.id + "'>";
				renderHtml += element.name;
				renderHtml += "</option>";
			});

			$("#seller").html(renderHtml);
		}
	});

	//============================Render HTML======================//


	$('#logOut').click(function () {
		localStorage.removeItem("token");
		window.location.href = "Login-2.html";
	});

	$('.changeFillter').on('change', function () {
		$('.table-item .zzz').html("");
		var ccc = {
			"code": $("#code").val(),
			"seller": $("#seller").val(),
			"state": $("#state").val(),
			"transfer_type": $("#type").val(),
			"limit": $("#limit").val()
		};
		for (x in ccc) {
			if (ccc[x] == null || ccc[x] == undefined || ccc[x] == " " || ccc[x] == "") {
				delete ccc[x]
			}
		}
		console.log(ccc)
		renderMain(ccc);
	});

	function renderMain(data) {
		$.ajax({
			type: 'GET',
			url: 'https://master-wfs.agilsun.com/wfs/transfer/list?limit=30&page=1&',
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data:data ,
			dataType: "json",
			success: (kein) => {
				var listItem = kein.data.records
				for(x in listItem)  {
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
});