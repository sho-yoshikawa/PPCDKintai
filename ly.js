window.addEventListener("load", async function () {
    // load後も読み込みが発生しているためsleep
    await new Promise(s => setTimeout(s, 2000));

    var start_worktimes = document.querySelectorAll('[id$="result_start_time_text"]');
    var end_worktimes = document.querySelectorAll('[id$="result_end_time_text"]');

    // カンマ区切りで読み込む
    var worktime = "";
    var start = "";
    var end = "";
    for (let i = 0; i < start_worktimes.length; i++) {
        start = start_worktimes[i].value.toString();
        end = end_worktimes[i].value.toString();
        worktime += start + "," + end + ",";
    }

    // 末尾カンマ削除
    worktime = worktime.slice(0, -1);
    await new Promise(s => setTimeout(s, 1000));

    // ボタン実装
    var e = document.getElementsByClassName("js-sticky-header").item(0);
    var submit_button = document.createElement('input');
    submit_button.id = "submit-csv";
    submit_button.type = "button";
    submit_button.value = "勤怠実績をCSVで読み込む";
    e.appendChild(submit_button);

    submit_button.addEventListener("click", async function () {
        // コピー可能か確認
        if (navigator.clipboard) {
            navigator.clipboard.writeText(worktime);
            console.log("worktime copied.");
            await new Promise(s => setTimeout(s, 500));
            window.open('https://www.ehr-dr.jp/leg71787/attendance/monthlyTimeManagementUpdate.do?command=load', '_blank');
        } else {
            alert("copy function not supported, worktime will be output to console.");
        }
    });

    // popup.htmlに使う場合はstorageに保存
    // await chrome.storage.local.set({'worktime': worktime}, function () {
    //     console.log(worktime);
    // });
});


