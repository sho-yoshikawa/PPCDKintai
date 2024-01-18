window.addEventListener("load", async function() {
    // 全角スペースは正常
    // var e = document.querySelector("input[value='　登録する　']");
    // idがないので直打ち
    var e = document.getElementsByTagName("tr")[0];

    var input_form = document.createElement('textarea');
    input_form.id = "input-csv";
    e.appendChild(input_form);

    // フォームとボタンに改行
    e.appendChild(document.createElement('br'));

    var submit_button = document.createElement('input');
    submit_button.id = "submit-csv";
    submit_button.type = "button";
    submit_button.value = "LY勤怠実績をセット";
    e.appendChild(submit_button);

    submit_button.addEventListener("click", function () {
        // CSV勤怠読み込み
        var worktimes = String(input_form.value).split(',');
        console.log(worktimes);

        // checkboxに全てチェックをいれる 
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (let checkbox of checkboxes) {
            checkbox.checked = "checked";
        }

        // readonlyを全て外す
        var readonly_boxes = document.querySelectorAll('input[readonly="readonly"]');
        for (let readonly_box of readonly_boxes) {
            readonly_box.readonly = "";
            readonly_box.style = "background-color: rgb(255, 255, 255);";
        }

        // CSV勤怠入力
        var worktime_index = 0;
        var form_index = 0;
        while (worktime_index < worktimes.length) { 
            var start_worktime = worktimes[worktime_index];
            var end_worktime = worktimes[worktime_index + 1];


            // どちらか片方でも欠損していたらとりあえず受け付けない
            if (start_worktime == "" || end_worktime == "") {
                form_index += 1;
                worktime_index += 2;
                continue ;
            }

            // 出勤分
            var target_form_name = "item[" + String(form_index) + "].clockin";
            var selector_name = 'input[name="' + target_form_name + '"]';
            var target = document.querySelector(selector_name);
            target.value = start_worktime;

            // 退勤
            target_form_name = "item[" + String(form_index) + "].clockout";
            selector_name = 'input[name="' + target_form_name + '"]';
            target = document.querySelector(selector_name);
            target.value = end_worktime;
            
            // 本人コメント（必須）
            console.log(form_index);
            target_form_name = "item[" + String(form_index) + "].userComment";
            selector_name = 'textarea[name="' + target_form_name + '"]';
            target = document.querySelector(selector_name);
            console.log(target);
            target.innerHTML = "打刻の修正をしました。";
            console.log(target.innerHTML);
            form_index += 1;
            worktime_index += 2;
        }
    });
});

