
//輪播圖的JS好像會吃其他的，所以我放在最上面

//愛心設計
$(document).ready(function () {
    // 監聽心形圖標的點擊事件
    $(".heart-icon").click(function () {
        // 切換圖標的類名和樣式
        var heartIcon = $(this).find("i");
        if (heartIcon.hasClass("fa-regular fa-heart")) {
            heartIcon.removeClass("fa-regular fa-heart").addClass("fa-solid fa-heart").css("color", "#b44163");
        } else {
            heartIcon.removeClass("fa-solid fa-heart").addClass("fa-regular fa-heart").css("color", "");
        }
    });
});


// $('#myCarousel').carousel({
//     interval: false
//   });
//   $('#carousel-thumbs').carousel({
//     interval: false
//   });

// handles the carousel thumbnails
// https://stackoverflow.com/questions/25752187/bootstrap-carousel-with-thumbnails-multiple-carousel
//$('[id^=carousel-selector-]').click(function () {
//    var id_selector = $(this).attr('id');
//    var id = parseInt(id_selector.substr(id_selector.lastIndexOf('-') + 1));
//    $('#myCarousel').carousel(id);
//    console.log("id_selector:" +id_selector);
//    console.log("id:" +id);
//});
$(document).on('click', '[id^=carousel-selector-]', function () {
    var id_selector = $(this).attr('id');
    var id = parseInt(id_selector.substr(id_selector.lastIndexOf('-') + 1));
    $('#myCarousel').carousel(id);
    console.log("id_selector:" + id_selector);
    console.log("id:" + id);
});
// Only display 3 items in nav on mobile.
if ($(window).width() < 575) {
    $('#carousel-thumbs .row div:nth-child(4)').each(function () {
        var rowBoundary = $(this);
        $('<div class="row mx-0">').insertAfter(rowBoundary.parent()).append(rowBoundary.nextAll().addBack());
    });
    $('#carousel-thumbs .carousel-item .row:nth-child(even)').each(function () {
        var boundary = $(this);
        $('<div class="carousel-item">').insertAfter(boundary.parent()).append(boundary.nextAll().addBack());
    });
}

$('#myCarousel').on('slide.bs.carousel', function (e) {
    console.log('slide.bs.carousel');
    var id = parseInt($(e.relatedTarget).attr('data-slide-number'));
    $('[id^=carousel-selector-]').removeClass('selected');
    $('[id=carousel-selector-' + id + ']').addClass('selected');
    console.log(id)
});



$('#myCarousel .carousel-item img').on('click', function (e) {
    var src = $(e.target).attr('data-remote');
    if (src) $(this).ekkoLightbox();
});


$(document).on('toggle.bs.modal', '.modal fade', function () {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
    getChatData();
});



//聊天室登入按鈕
$(document).ready(function () {
    $(document).on('click', '#signBtn', function () {
        window.location.href = '/Home/Login';
    });
    $(document).on('click', '#heartSignBtn', function () {
        window.location.href = '/Home/Login';
    });
});

// 聊天室
$(document).ready(function () {
    $(document).on('click', '#discussBtn', function () {
        $("#discussInput").toggle();
    });
});


$(document).on("click", ".replyBtn", function () {
    $($(this).parent().parent().children(".replyTextDiv")).toggle();
});




$(document).ready(function () {
    // 監聽 #discussTextArea 元素的 keydown 事件
    $(document).on("keydown", "#discussTextArea", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();  // 阻止預設的 Enter 鍵行為
            simulateClick();  // 呼叫模擬 click 函式
        }
    });

    $(document).on("click", ".publishBtn", simulateClick);  // 點擊 publishBtn 也呼叫模擬 click 函式

    function simulateClick() {
        var temp = $("#discussTextArea").val();
        if (temp == "") {
            alert("請輸入文字");
        } else {
            var sure = confirm("確定提交嗎討論\n\n" + $("#discussTextArea").val());
        }
        discussUpdate();
    }
});


$(document).on("click", ".messageBtn", function () {
    var chatId = $(this).closest(".replyTextDiv").find("#replyTextDivId").val();

    var temp = $(this).parent().children("textarea[name='ChatContent']").val();
    if (temp == "") {
        alert("請輸入文字");
    } else {
        var sure = confirm("確定提交留言\n\n" + temp);
    }
    replyUpdate(chatId);
    console.log(chatId);
});


// 在 #replyTextArea 上監聽 keydown 事件
$(document).on("keydown", "#replyTextArea", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();  // 阻止預設的 Enter 鍵行為
        $(this).siblings(".messageBtn").click();  // 模擬點擊 .messageBtn
    }
});



/*收藏API*/
const heartIcons = document.querySelectorAll('.heart-icon');

heartIcons.forEach(function (heartIcon) {
    heartIcon.addEventListener('click', function () {
        let currentUserId = $('#currentUserId').val();
        const activityId = heartIcon.getAttribute('data-activityid');
        if (heartIcon.classList.contains('fa-regular')) {
            // 在此處執行AJAX POST請求，將activityId和userID（在這裡假設為1）發送到後端
            $.ajax({
                type: 'POST',
                url: '/MyActivity/LikeActivity',
                data: {
                    activityId: activityId,
                    userId: currentUserId
                },
                success: function (data) {
                    console.log("處理成功的回應，可以更新UI或執行其他操作")
                    // 處理成功的回應，可以更新UI或執行其他操作
                    heartIcon.classList.remove('fa-regular');
                    heartIcon.classList.add('fa-solid');
                    heartIcon.style.color = "#B44163";

                    //const cardInfo = heartIcon.closest('.card').querySelector('.card__info');

                    //const likedText = document.createElement('span');
                    //likedText.textContent = '已收藏';
                    //likedText.classList.add('liked-text');

                    /*cardInfo.appendChild(likedText);*/
                },
                error: function (error) {
                    // 處理錯誤，如果有錯誤發生
                }
            });
        } else {
            // 在此處執行AJAX DELETE請求，從"LikeRecord"資料表中刪除對應的記錄
            $.ajax({
                type: 'DELETE',
                url: '/Activity/UnlikeActivity',
                data: {
                    activityId: activityId,
                    userId: currentUserId
                },
                success: function (data) {
                    console.log("處理成功的回應，可以更新UI或執行其他操作delete")
                    // 處理成功的回應，可以更新UI或執行其他操作
                    heartIcon.classList.remove('fa-solid');
                    heartIcon.classList.add('fa-regular');
                    heartIcon.style.color = "#1E3050";

                    
                },
                error: function (error) {
                    // 處理錯誤，如果有錯誤發生
                }
            });
        }
    });
});

/*抓取groupid*/
function getIdFromUrl() {
    const groupidElement = document.querySelector('.groupid');  // 選取具有 class 為 groupid 的元素
    if (groupidElement) {
        return groupidElement.getAttribute('data-groupid');
    }
    return null;
}
/*抓取groupid*/
function getChatData() {
    const id = getIdFromUrl();  // 取得 id
    if (!id) {
        console.log('ID not found in the URL.');
        return;
    }

    $.ajax({
        url: `/api/chatData/${id}`,  // 使用 id 構建 URL
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            updateChatInModal(data);
            console.log("updateChatInModal(data);");
            // Do something with the data, e.g., update the UI
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

const id = getIdFromUrl();
if (id) {
    console.log('ID:', id);
    getChatData(id);  // 呼叫 getChatData 函式並傳遞 id
}


function updateChatInModal(chatList) {
    // 清空原有的討論區內容
    $("#dialogDiv").empty();

    // 將新的聊天資料插入到討論區
    var chatBoardHTML = `<div>
                    <div id="messageBoardTitle">
                        <p class="h1">討論區</p>
                        <div id="discussBtn">建立討論</div>
                    </div>

                    <!-- 討論輸入區 -->
                    
                    <div class="commentDiv" id="discussInput">
                            <div class="userCommentDiv">
                                <img class="profile" src="" />
                                <div class="userCommentDivRight">
                                    <p class="h3 align-self-center"></p>
                                    <div class="discuss-box align-self-start" name="ChatContent">
                                        <textarea name="ChatContent" id="discussTextArea" class="col-auto" rows="3" placeholder="討論串輸入框"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="commentBtnDiv">
                                <button class="publishBtn" type="submit">
                                    <p class="h3">發表</p>
                                    <i class="fa-solid fa-comment fa-2xl align-self-center"></i>
                                </button>
                            </div>
                    </div>
                </div>`;
    $('#dialogDiv').append(chatBoardHTML);
    chatList.forEach(function (chat) {
        if (chat.ToWhom === null) {
            var chatId = chat.ChatID;  // 注意這裡要使用 ChatID，而不是 chatId
            var userPhoto = chat.UserPhoto ? `<img src="data:image/png;base64,${chat.UserPhoto}" class="profile" />` : '';
            var chatContent = chat.ChatContent ? `<div class="comment-box align-self-start">${chat.ChatContent}</div>` : '';
            var chatTime = new Date(chat.ChatTime).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            var chatCommentDiv = `
            <div class="commentDiv">
                <div class="userCommentDiv">
                    ${userPhoto}
                    <div class="userCommentDivRight">
                        <p class="h3 align-self-center">${chat.Nickname}</p>
                        ${chatContent}
                        <a id="editA" class="editA" value="${chat.UserID}">編輯</a>
                        <a>&nbsp;</a>
                        <a id="deleteA" class="deleteA" value="${chat.UserID}">刪除</a>
                        <p class="commentDatetime">${chatTime}</p>
                    </div>
                </div>
                <div class="commentBtnDiv" id =${chatId}>
                    <div class="replyBtn" id="replyBtn">
                        <p class="h3">回覆</p>
                        <i class="fa-solid fa-comment fa-2xl align-self-center"></i>
                    </div>
                </div>`;
            chatList.forEach(function (reply) {
                if (reply.ToWhom !== null && reply.ToWhom === chatId) {
                    var replyTime = new Date(reply.ChatTime).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    // 建立回覆的 HTML
                    var replyHtml = `
                    <div class="replyDiv">
                        <div class="userCommentDiv">
                            <img src="data:image/png;base64,${reply.UserPhoto}" class="profile" />
                            <div class="userCommentDivRight">
                                <p class="h3 align-self-center">${reply.Nickname}</p>
                                <div class="comment-box align-self-start">${reply.ChatContent}</div>
                                <a id="editA" class="editA"  value="${reply.UserID}">編輯</a>
                                <a>&nbsp;</a>
                                <a id="deleteA" class="deleteA" value="${reply.UserID}">刪除</a>
                                <p class="commentDatetime">${replyTime}</p>
                            </div>
                        </div>
                    </div>`;
                    chatCommentDiv = chatCommentDiv + replyHtml; 
                }
            });
            var replyTextDiv = `
                <div class="replyTextDiv" id="replyTextDiv${chatId}">
                    <input type="hidden" id="replyTextDivId" value="${chatId}" />
                    <div class="userCommentDiv">
                        <img class="profile" src="" />
                        <div class="userCommentDivRight">
                            <p class="h3 align-self-center" id="userInfoNickname"></p>
                            <textarea name="ChatContent" id="replyTextArea" class="col-auto" rows="1"></textarea>
                            <button class="messageBtn" type="submit">
                                <p class="messageBtn-text-style" href="#">
                                    留言
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;

            chatCommentDiv = chatCommentDiv + replyTextDiv;
            // 插入到討論區
            $('#dialogDiv').append(chatCommentDiv);
        }
    });
    getUserInfo();
     userEditDelete();
}
//會員讀取自訂函式
function userEditDelete() {
    const currentUserId = $('#currentUserId').val(); // 使用者id
    $('.editA, .deleteA').each(function () {
        const editLink = $(this);
        const chatUserId = editLink.attr('value');

        // 检查条件，如果当前用户的ID等于聊天用户的ID，则显示链接
        if (currentUserId === chatUserId) {
            editLink.css('display', 'inline-block');
        } else {
            editLink.css('display', 'none');
        }
    });
}

function getUserInfo() {
    let currentUserId = $('#currentUserId').val();

    console.log(`/api/getUserInfo/${currentUserId}`);
    $.ajax({
        url: `/api/getUserInfo/${currentUserId}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
                console.log('userInfo', data);
            $('#discussInput .userCommentDiv p').text(data[0].Nickname);
            $('#discussInput .userCommentDiv .profile').attr('src', 'data:image/png;base64,' + data[0].UserPhoto);
            $('.replyTextDiv .userCommentDiv #userInfoNickname').text(data[0].Nickname);
            $('.replyTextDiv .userCommentDiv .profile').attr('src', 'data:image/png;base64,' + data[0].UserPhoto);
            getUserIngroup();
            },
        error: function (error) {
            console.error('Error:', error);
            $('#replyTextDiv').remove();
            console.log("$(`#replyTextDiv`).empty();")
            $('.commentBtnDiv').remove();
            $('#discussInput').remove();
            $('#discussBtn').replaceWith(`
                <button style="display:inline-block;margin-left: 60%;" id="heartSignBtn">
                       <p class="h3">登入加入討論</p>
                    </button>
            `);
        }
    });
}
//會員留言權限
function getUserIngroup() {
    const id = getIdFromUrl();
    console.log(`/api/getUserIngroup/${id}`);
    $.ajax({
        url: `/api/getUserIngroup/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data == false) {
                $('#replyTextDiv').remove();
                console.log("$(`#replyTextDiv`).empty();")
                $('.commentBtnDiv').remove();
                $('#discussInput').remove();
                $('#discussBtn').replaceWith(`
                <h5 style = "margin-left:60%; margin-top:3rem; color:yellow;">討論區開放給報名團員使用!!</h5>
            `);
            }
            
            console.log(currentUserId)
            console.log(data);
        },
        error: function (error) {
            
        }
    });
}

//刪除留言請求
$(document).on('click', '.deleteA', function () {
        const currentUserId = $('#currentUserId').val(); // 当前用户的 ID
        const replyUserId = $(this).attr('value'); // 获取要删除的留言的用户 ID
        if (currentUserId === replyUserId) {
            const replyId = $(this).attr('replyId'); // 获取要删除的留言的 ID
            console.log(replyId);
            // 发送 DELETE 请求到后端 API 来删除留言
            fetch(`/api/groupPage/${replyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Reply deleted successfully.');
                    } else {
                        console.error('Failed to delete reply.');
                    }
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });
        } else {
            // 不允许删除
            console.log('You are not allowed to delete this reply.');
        }
 });





//討論上傳自訂函數
function discussUpdate() {
    let discussContent = $('#discussTextArea').val();
    const id = getIdFromUrl();  // 取得 id
    let currentUserId = $('#currentUserId').val();

    let updateData = {
        ActivityID: id,
        UserID: currentUserId,
        ChatContent: discussContent,
        ToWhom: null,
        // 可以添加其他需要上传的数据字段
    };

    // 发起AJAX请求
    $.ajax({
        url: '/api/discussUpdate', // 后端API的URL
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(updateData), // 将数据转为JSON字符串
        contentType: 'application/json', // 设置Content-Type为JSON
        success: function (response) {
            console.log('数据成功上传:', response);
            getChatData();
            // 在这里处理成功响应
        },
        error: function (error) {
            console.error('上传数据时出错:', error);
            console.log(JSON.stringify(updateData));
            // 在这里处理错误响应
        }
    });
}

//留言上傳
function replyUpdate(chatId) {
    const id = getIdFromUrl();  // 取得 id
    const replyContent = $(`#replyTextDiv${chatId}`).find('textarea[name="ChatContent"]').val();  // 根據 chatId 取得回覆內容
    const currentUserId = $('#currentUserId').val();

    let replyData = {
        ActivityID: id,
        UserID: currentUserId,
        ChatContent: replyContent,
        ToWhom: chatId,  // 設定回覆的對象為原始留言的 chatId
    };

    // 發起 AJAX 請求
    $.ajax({
        url: '/api/replyUpdate',  // 後端 API 的 URL
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(replyData),  // 將資料轉為 JSON 字串
        contentType: 'application/json',  // 設定 Content-Type 為 JSON
        success: function (response) {
            console.log('回覆成功:', response);
            getChatData();  // 更新聊天資料
            // 在這裡處理成功回應
        },
        error: function (error) {
            console.error('回覆時發生錯誤:', error);
            console.log(JSON.stringify(replyData));
            // 在這裡處理錯誤回應
        }
    });
}

//圖片API
function photoGet() {
    const id = getIdFromUrl();
    
    $.ajax({
        url: `/api/photoGet/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $(".carouselDiv").empty();
            var carouselHTML = `
                <div class="carousel-container position-relative  col-lg-8" id="pictureDiv">
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-slide-number="0">
                            <img src="${data[0].PhotoPath}" class="d-block w-100" alt="..." data-type="image"
                                 data-toggle="lightbox" data-gallery="example-gallery">
                        </div>
                        <div class="carousel-item" data-slide-number="1">
                            <img src="${data[1].PhotoPath}" class="d-block w-100" alt="..." data-type="image"
                                 data-toggle="lightbox" data-gallery="example-gallery">
                        </div>
                        <div class="carousel-item" data-slide-number="2">
                            <img src="${data[2].PhotoPath}" class="d-block w-100" alt="..." data-type="image"
                                 data-toggle="lightbox" data-gallery="example-gallery">
                        </div>
                        <div class="carousel-item" data-slide-number="3">
                            <img src="${data[3].PhotoPath}" class="d-block w-100" alt="..." data-type="image"
                                 data-toggle="lightbox" data-gallery="example-gallery">
                        </div>
                    </div>
                </div>

                <!-- Carousel Navigation -->
                <div id="carousel-thumbs" class="carousel slide " data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row mx-0">
                                <div id="carousel-selector-0" class="thumb col-sm-1 col-lg-3 px-1 py-2 selected"
                                     data-target="#myCarousel" data-slide-to="0">
                                    <img src="${data[0].PhotoPath}" class="img-fluid" alt="...">
                                </div>
                                <div id="carousel-selector-1" class="thumb col-sm-1 col-lg-3 px-1 py-2" data-target="#myCarousel"
                                     data-slide-to="1">
                                    <img src="${data[1].PhotoPath}" class="img-fluid" alt="...">
                                </div>
                                <div id="carousel-selector-2" class="thumb col-sm-1 col-lg-3 px-1 py-2" data-target="#myCarousel"
                                     data-slide-to="2">
                                    <img src="${data[2].PhotoPath}" class="img-fluid" alt="...">
                                </div>
                                <div id="carousel-selector-3" class="thumb col-sm-1 col-lg-3 px-1 py-2" data-target="#myCarousel"
                                     data-slide-to="3">
                                    <img src="${data[3].PhotoPath}" class="img-fluid" alt="...">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            $(".carouselDiv").append(carouselHTML);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}
















$(document).ready(function () {
    // 選取探索按鈕
    var exploreLink = $("#explore-link");
    // 選取下拉內容
    var exploreDropdown = $("#explore-dropdown");
    //選取揪團按鈕
    var groupBtn = $("#group-link");

    exploreLink.hover(
        function () {
            // 滑鼠進入時顯示下拉內容
            exploreDropdown.css("display", "block");

        });

    exploreDropdown.hover(
        function () {
            // 滑鼠進入下拉內容時保持顯示
            exploreDropdown.css("display", "block");
        },
        function () {
            // 滑鼠離開下拉內容時隱藏
            exploreDropdown.css("display", "none");
        }
    );
    //滑鼠移動到揪團也會讓下拉消失
    groupBtn.hover(
        function () {
            exploreDropdown.css("display", "none")
        }
    )

    //點擊鈴鐺後，數字通知消失
    // 使用事件委託，當點擊<i>元素時執行以下操作
    $('.notification').on('click', 'i', function () {
        // 移除包含.notification--num的元素
        $(this).parent().find('.notification--num').remove();
    });
});



//-------James家的--------------
//麵包屑判斷導向哪個活動類別
$(document).ready(function () {
    $("nav ol li a").click(function (e) {
        e.preventDefault(); // 阻止默認連結行為

        var linkText = $(this).text();

        // 使用switch語句根據不同的類別內容執行不同的操作
        switch (linkText) {
            case "登山":
                // 更新href屬性
                var newHref = "/MyActivity/ACT?page=0&category=登山";
                $(this).attr("href", newHref);
                // 使用window.location進行重定向
                window.location.href = newHref;
                break;
            case "溯溪":
                // 更新href屬性
                var newHref = "/MyActivity/ACT?page=0&category=溯溪";
                $(this).attr("href", newHref);
                // 使用window.location進行重定向
                window.location.href = newHref;
                break;
            case "潛水":
                // 更新href屬性
                var newHref = "/MyActivity/ACT?page=0&category=潛水";
                $(this).attr("href", newHref);
                // 使用window.location進行重定向
                window.location.href = newHref;
                break;
            case "露營":
                // 更新href屬性
                var newHref = "/MyActivity/ACT?page=0&category=露營";
                $(this).attr("href", newHref);
                // 使用window.location進行重定向
                window.location.href = newHref;
                break;
            case "其他":
                // 更新href屬性
                var newHref = "/MyActivity/ACT?page=0&category=其他";
                $(this).attr("href", newHref);
                // 使用window.location進行重定向
                window.location.href = newHref;
                break;
            default:
                // 更新href屬性
                var newHref = "/MyActivity/ACT";
                $(this).attr("href", newHref);
                // 使用window.location進行重定向
                window.location.href = newHref;
                break;
        }
    });
});

