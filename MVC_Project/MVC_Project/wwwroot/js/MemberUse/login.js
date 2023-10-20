

// function show_hide() {
//     var login = document.getElementById("container1");
//     var signup = document.getElementById("container2");


//     if (login.style.display === "block") {
//         login.style.display = "none";
//         signup.style.display = "block";
//         signup.style.visibility = "visible";

//     } else {
//         login.style.display = "block";
//         signup.style.display = "none";

//     }
// }


//BUG修正
// 獲取註冊鏈接元素

const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link'); // 添加這一行來獲取登入鏈接

// 添加點擊事件監聽器
registerLink.addEventListener('click', function () {
    // 獲取登入表單和註冊表單元素
    const loginForm = document.getElementById('container1');
    const signupForm = document.getElementById('container2');

    // 切換表單的顯示狀態
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    signupForm.style.visibility = "visible";
});

// 添加從註冊切換回登入的事件監聽器
loginLink.addEventListener('click', function () {
    // 獲取登入表單和註冊表單元素
    const loginForm = document.getElementById('container1');
    const signupForm = document.getElementById('container2');

    // 切換表單的顯示狀態
    loginForm.style.display = "block";
    signupForm.style.display = "none";
});

// 在頁面加載時，確保一個表單可見，一個表單不可見
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('container1');
    const signupForm = document.getElementById('container2');
    loginForm.style.display = "block";
    signupForm.style.display = "none";
});

