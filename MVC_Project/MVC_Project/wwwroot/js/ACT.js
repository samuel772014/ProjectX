//--------James加的-----------
//麵包屑設計
$(document).ready(function () {
    // 獲取當前URL
    var encodedText = window.location.href;
    var currentURL = decodeURIComponent(encodedText);
    console.log(currentURL);

    // 檢查URL的分類
    switch (true) {
        case currentURL.endsWith("登山"):
            updateBreadcrumb("登山");
            break;
        case currentURL.endsWith("溯溪"):
            updateBreadcrumb("溯溪");
            break;
        case currentURL.endsWith("潛水"):
            updateBreadcrumb("潛水");
            break;
        case currentURL.endsWith("露營"):
            updateBreadcrumb("露營");
            break;
        case currentURL.endsWith("其他"):
            updateBreadcrumb("其他");
            break;
        default:
            // 如果URL不符合任何分類，保持原有麵包屑
            break;
    }
});

function updateBreadcrumb(category) {
    // 更新麵包屑內容
    $(".breadcrumb").append('<li class="separator">&nbsp;<i class="fa-solid fa-chevron-right"></i>&nbsp;</li>');
    $(".breadcrumb").append('<li class="breadcrumb-item">' + category + '</li>');
}




