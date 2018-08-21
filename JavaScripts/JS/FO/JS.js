$(document).ready(function () {
    var mainFo = [];
    var workTime = [{
        name: "Thứ 2",
        checked: false,
        timeS: "",
        timeE: ""
    }, {
        name: "Thứ 3",
        checked: false,
        timeS: "",
        timeE: ""
    }, {
        name: "Thứ 4",
        checked: false,
        timeS: "",
        timeE: ""
    }, {
        name: "Thứ 5",
        checked: false,
        timeS: "",
        timeE: ""
    }, {
        name: "Thứ 6",
        checked: false,
        timeS: "",
        timeE: ""
    }, {
        name: "Thứ 7",
        checked: false,
        timeS: "",
        timeE: ""
    }, {
        name: "Chủ Nhật",
        checked: false,
        timeS: "",
        timeE: ""
    }];
    var HiddenCmt = [
        {
        checked: false
    }, {
        checked: false
    }, {
        checked: false
    }];
    var phoneN = {
        cntPhoneN: "",
        checked: false
    };
    var addCntTitle = [{
        checked: false,
        nameTitle: "",
        cntTitle: ""
    }];
    $(function () {
        for (i = 0; i < workTime.length; i++) {
            $('#appendWorkTime').append(`<div class="row enter">
            <div class="col-xs-4"><input type="checkbox" class="checkWorkTime">` + workTime[i].name + `</div>
            <div class="col-xs-8">
                <div class="row">
                    <div class="col-xs-6">
                        <input type="text" class="timeS timeBoss">
                    </div>
                    <div class="col-xs-6">
                        <input type="text" class="timeE timeBoss">
                    </div>
                </div>
            </div>
            </div>`)
        };
        $('.timeBoss').timepicker({
            timeFormat: 'hh:mm p',
            interval: 30,
            minTime: '1',
            maxTime: '12:00pm',
            defaultTime: '',
            startTime: '0',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });

            $('.appendInput').click(function () {
                $('#appendInput').append(`<li class="label-item">
            <input type="text" class="title-name">
            <input type="text" class="title-key">
        </li>`)
            addCntTitle.push({
                nameTitle: "",
                cntTitle: ""
            });
            console.log(addCntTitle)
        });

        var checkWorkTime = $('.checkWorkTime');
        var timeS = $('.timeS');
        var timeE = $('.timeE');
        var checkHiddenCmt = $('.checkHiddenCmt');
        var checkAddTitle = $('.checkAddTitle');
        var phoneNumHtml = $('.phoneN');
        var checkAddTitle2 = $('.checkAddTitle2');
        var localStr = localStorage.getItem('settingMain');
            $('.save').click(function () {
                for (x in workTime) {
                    if (checkWorkTime[x].checked == true) {
                        workTime[x].timeS = $(timeS[x]).val();
                        workTime[x].timeE = $(timeE[x]).val();
                        workTime[x].checked = true;
                    }
                }
                mainFo[0] = workTime;
                /*--------workTime-------*/
                for (x in HiddenCmt) {
                    if (checkHiddenCmt[x].checked == true) {
                        HiddenCmt[x].checked = true;
                    }
                }
                mainFo[1] = HiddenCmt;
                /*--------HiddenCmt-------*/
                if (checkAddTitle[0].checked == true) {
                    phoneN.cntPhoneN = phoneNumHtml.val();
                    phoneN.checked = true;
                }
                mainFo[2] = phoneN;
                /*----------phoneN---------*/
                
                
                if(checkAddTitle2[0].checked == true){
                    for(i=0; i<addCntTitle.length ; i++){
                        var name = $('.title-name')[i].value;
                        var key = $('.title-key')[i].value;
                            addCntTitle[0].checked = true;
                            addCntTitle[i].nameTitle = name;
                            addCntTitle[i].cntTitle = key;
                        }
                    }
                mainFo[3] = addCntTitle;
                /*----------Title---------*/
                var local = localStorage.setItem('settingMain',JSON.stringify(mainFo));
            });
            $(function(){
                if(localStr != undefined){
                    var zzz = JSON.parse(localStr);
                    for(x in zzz[0]){
                       if(zzz[0][x].checked == true){
                            $(checkWorkTime[x]).prop('checked', true);
                            $(timeS[x]).prop('value',zzz[0][x].timeS);
                            $(timeE[x]).prop('value',zzz[0][x].timeE);
                       } 
                    }
                    for(x in zzz[1]){
                        if(zzz[1][x].checked == true){
                            $(checkHiddenCmt[x]).prop('checked', true);
                        }
                    }
                    for(x in zzz[2]){
                        if(zzz[2].checked == true){
                            $('.checkAddTitle').prop('checked', true);
                            $(phoneNumHtml).prop('value',zzz[2].cntPhoneN)
                        }
                    }
                    for(i = 2 ; i<= zzz[3].length ; i++){
                        $('#appendInput').append(`<li class="label-item">
                        <input type="text" class="title-name">
                        <input type="text" class="title-key">
                    </li>`)[i]
                    console.log(i)
                    } 
                    for(x in zzz[3]){
                        if(zzz[3][0].checked == true){
                            $('.checkAddTitle2').prop('checked', true);
                            $($('.title-name')[x]).prop('value', zzz[3][x].nameTitle);
                            $($('.title-key')[x]).prop('value', zzz[3][x].cntTitle);
                        }
                    }
                }   
            });
            $('.clear').click(function (){
                localStorage.removeItem('settingMain');
            })
    });

});