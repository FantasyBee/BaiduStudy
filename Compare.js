    // 1、搜索按钮功能实现
    // 获取搜索表单元素和搜索框元素
    var searchForm = document.querySelector("form");
    var searchInput = document.querySelector('input[name="search"]');
    // 添加表单提交事件处理程序，为什么不选用百度一下按钮搜索是为了回车键也能完成搜索

    //为搜索框以及搜索按钮整个大区域添加监听器
    searchForm.addEventListener("submit", function (event) {
        // 阻止表单默认的提交行为
        event.preventDefault();
        // 获取搜索框内关键词
        var searchWord = searchInput.value.trim();
        if (searchWord !== "") {
            // 调用搜索函数
            searchIng(searchWord);
            // 保存搜索历史
            saveSearchHistory(searchWord);
            // 清空搜索框内容
            searchInput.value = "";
        }
    });

    //百度搜索方法实现
    function searchIng(searchKeyWord) {
        // 检查搜索关键词是否为空
        if (searchKeyWord !== "") {
            // 构建搜索 URL，将搜索关键词作为参数
            var searchUrl =
            "https://www.baidu.com/s?wd=" + encodeURIComponent(searchKeyWord);
            // 重定向到搜索 URL
            window.location.href = searchUrl;
        }
    }












    // 2、百度搜索框历史记录，限制显示十条
    //将搜索记录要获取的元素放到全局变量这里
    //（本来是在window.onload中）
    var searchInput = document.querySelector(".input1 input");
    var searchBtn = document.querySelector(".input1");
    var searchList = document.querySelector(".searchList");
    var searchHistory = document.querySelector(".search-history");
    searchHistory.style.display = "none";
    var isSearching = false; // 记录是否正在搜索

    //存储搜索记录的方法实现
    function saveSearchHistory(keywordTotal) {
        //获取本地存储，并且清空
        var searches = localStorage.getItem("searches");
        searches = searches ? JSON.parse(searches) : [];
        searches.unshift(keywordTotal);
        if (searches.length > 20) {
            searches.pop();
        }
        localStorage.setItem("searches", JSON.stringify(searches));
    }

    //独立作用域，显示搜索记录为主
    window.onload = function () {
    // 判断本地存储是否有搜索记录
    var searches = localStorage.getItem("searches");
    var Searchings = searches && JSON.parse(searches).length > 0;

    //显示搜索记录方法实现
    function showSearchHistory() {
        //获取本地存储，并且清空
        var searches = localStorage.getItem("searches");
        //如果有值，则使用 JSON.parse(searches) 方法将其解析为 JavaScript 数组，如果没有值，则将 searches 变量赋值为空数组 []。
        searches = searches ? JSON.parse(searches) : [];
        //将搜索记录内容设置为空，以便下面进行渲染
        searchList.innerHTML = "";
        searches.forEach(function (item) {
            var li = document.createElement("li");
            li.textContent = item;

            // 创建删除搜索历史的span按钮
            var deleteIcon = document.createElement("span");
            deleteIcon.textContent = "删除";
            deleteIcon.classList.add("delete-icon");
            li.appendChild(deleteIcon);

            //展示搜索记录内容框
            searchList.appendChild(li);

            //闭包处理每个li元素
            (function (searchItem) {
                li.addEventListener("click", function () {
                searchInput.value = searchItem;
                //移除搜索输入框的父节点的类名为 "clicked" 的类
                searchInput.parentNode.classList.remove("clicked");
                searchHistory.style.display = "none";
                searchIng(searchItem);
                // 保存搜索历史
                saveSearchHistory(searchItem);
                // 清空搜索框内容
                searchInput.value = "";
                });
                //调用删除搜索记录的方法
                deleteIcon.addEventListener("click", function (event) {
                //下面这句我本来是没想到的
                event.stopPropagation(); // 防止事件冒泡到 li 元素
                //删除操作
                deleteSearchItem(searchItem);
                //更新搜索记录
                showSearchHistory();
                });
            })(item);
        });
        searchHistory.style.display = "block";
    }

    //创建删除按钮的方法实现
    function deleteSearchItem(keyword) {
        var searches = localStorage.getItem("searches");
        searches = searches ? JSON.parse(searches) : [];
        var index = searches.indexOf(keyword);
        if (index !== -1) {
        //调用splice方法，删除一个在index位置上的搜索记录
        searches.splice(index, 1);
        //将更新后的searches塞到本地存储，并且是以JSON方式
        localStorage.setItem("searches", JSON.stringify(searches));
        Searchings = searches.length > 0; // 更新Searchings变量的值
        }
    }

    //为搜索框添加事件处理
    searchInput.addEventListener("click", function () {
        var keyword = searchInput.value.trim();
        //条件判断，防止点击两次搜索框便将搜索框现有内容转成记录
        if (keyword !== "" && isSearching) {
            saveSearchHistory(keyword);
        if (Searchings) {
            showSearchHistory();
        } else {
            searchHistory.style.display = "none";
        }
        searchInput.value = "";
        }
        if (Searchings) {
            searchInput.parentNode.classList.add("clicked");
            showSearchHistory();
        } else {
            searchInput.parentNode.classList.add("two-clicked");
            searchHistory.style.display = "none";
        }
    });

    //为除搜索框区域以外添加监听器，以控制搜索记录的展示与隐藏，以及搜索框内容是否被转换为搜索记录的控制
    document.addEventListener("click", function (event) {
        if (!searchHistory.contains(event.target) && event.target !== searchInput) {
        isSearching = false;
        searchInput.parentNode.classList.remove("clicked");
        searchInput.parentNode.classList.remove("two-clicked");
        searchHistory.style.display = "none";
        }
    });
    };

    //为搜索框内的图片添加一些样式
    const img_2 = document.querySelector(".input1 .img-2 img");
    img_2.addEventListener("mouseover", function () {
        img_2.src = "https://img2.imgtp.com/2024/04/15/V6qkvwsc.png";
    });
    img_2.addEventListener("mouseout", function () {
        img_2.src = "https://img2.imgtp.com/2024/04/15/hNj0zdZP.png";
    });

    searchInput.addEventListener("input", function () {
        // 获取搜索输入框的值并去除两端的空白字符
        var inputValue = searchInput.value.trim();
        
        // 检查搜索框的值是否不为空
        if (inputValue !== "") {
            // 构建目标路径，并将搜索词作为参数添加到 URL 中
            var targetPath = "http://127.0.0.1:5501/indexTwo.html?search=" + encodeURIComponent(inputValue);
            searchInput.value = "";
            // 使用 window.location.href 实现页面重定向
            window.location.href = targetPath;
        }
    });










    //3、登录界面功能实现
    //获取登录的按钮元素，以及登录界面的元素
    const loginBtn = document.querySelector(".loginbtn");
    //在html最底部定义的登录界面的元素，现在获取他们
    //登录界面作为子元素封装到total父元素块里面，只需要对他进行操作
    const total = document.querySelector(".total");
    const closeBtn = document.querySelector(".close img");
    //获取忘记密码元素，以便切换登录状态该元素显示与隐藏
    const forget = document.querySelector(".forget");

    //为登录按钮设置监听器
    loginBtn.addEventListener("click", function () {
    //展示total，也就是登录界面
    total.style.display = "block";
    });

    //为登录界面中的closeBtn设置监听器。关闭登录界面
    document.addEventListener("click", function (event) {
    if (event.target === closeBtn) {
        total.style.display = "none";
        checkBox.checked = false;
        isChoose = !isChoose;
        loginBtn2.style.backgroundColor = "#B8C5FA";
    }
    });

    //设置变量记录当前为登录/注册
    let nowIcon = 0;

    //获取登录选项-账户密码登录或者短信登录的元素
    const zhBox = document.querySelector(".zh");
    const dxBox = document.querySelector(".dx");
    const zh = document.querySelector(".zh p");
    const dx = document.querySelector(".dx p");
    const loginUp = document.querySelector(".loginUp");
    const signUp = document.querySelector(".signUp");
    // 默认设置为 zhBox 点击状态
    zhBox.classList.add("active");

    //为账号密码登录与短信登录的切换设置监听器
    //点击账号密码登录
    zhBox.addEventListener("click", function () {
        zhBox.classList.add("active");
        dxBox.classList.remove("active");
        nowIcon = 0;
        zh.style.color = "black";
        dx.style.color = "rgb(185, 185, 185)";
        loginUp.style.display = "block";
        signUp.style.display = "none";
        forget.style.visibility = "visible";
        // 重置 isChoose 为 false
        isChoose = false;
        checkBox.checked = false; // 取消勾选框的勾选状态
        loginBtn2.style.backgroundColor = "#B8C5FA";
        // 停止对短信注册中两个表单校验的提示
        noPhone.style.display = "none";
        phoneError.style.display = "none";
        noCheckWord.style.display = "none";
        signupUsername.style.border = "1px solid #ccc";
        signupUsername.style.boxShadow = "";
    });

    //点击短信登录
    dxBox.addEventListener("click", function () {
        dxBox.classList.add("active");
        zhBox.classList.remove("active");
        nowIcon = 1;
        dx.style.color = "black";
        zh.style.color = "rgb(185, 185, 185)";
        signUp.style.display = "block";
        loginUp.style.display = "none";
        forget.style.visibility = "hidden";
        // 重置 isChoose 为 false
        isChoose = false;
        checkBox.checked = false; // 取消勾选框的勾选状态
        loginBtn2.style.backgroundColor = "#B8C5FA";
        // 停止对登录中两个表单校验的提示
        noUserName.style.display = "none";
        noPassWord.style.display = "none";
    });

    //为登录界面的登录框设置样式
    const checkBox = document.getElementById("agreeCheckbox");
    const loginBtn2 = document.querySelector(".loginbtn2");
    let isChoose = false;

    //勾选框控制登录按钮的状态
    checkBox.addEventListener("click", function () {
        isChoose = !isChoose;
        if (isChoose) {
            loginBtn2.style.backgroundColor = "#4E6EF2";
        } else {
            loginBtn2.style.backgroundColor = "#B8C5FA";
        }
    });


    //获取提示语
    const noUserName = document.querySelector(".noUserName");
    const noPassWord = document.querySelector(".noPassWord");
    const noPhone = document.querySelector(".noPhone");
    const phoneError = document.querySelector(".phoneError");
    const noCheckWord = document.querySelector(".noCheckWord");
    // 表单校验！
    loginBtn2.addEventListener("click", function () {
        let nowIconCheck = nowIcon;
        if (isChoose && nowIconCheck === 0) {
            if (loginUsername.value.trim() === "") {
                noUserName.style.display = "block";
                // 处理登录用户名输入框
                loginUsername.focus();
                loginUsername.click();
            } else {
                noUserName.style.display = "none";
                noPassWord.style.display = "none";
                if (loginPassword.value.trim() === "") {
                    noPassWord.style.display = "block";
                    loginPassword.focus();
                    loginPassword.click();
                } else {
                    noPassWord.style.display = "none";
                }
            }
        }
        if (isChoose && nowIconCheck === 1) {
            const phoneNumber = signupUsername.value.trim();
            const isValidPhoneNumber = /^\d{11}$/.test(phoneNumber);
            if(phoneNumber === ""){
                noPhone.style.display = "block";
                signupUsername.focus();
                signupUsername.click();
                phoneError.style.display = "none";
            }else if(!isValidPhoneNumber) {
                // 手机号格式不正确
                noPhone.style.display = "none";
                phoneError.style.display = "block";
                signupUsername.style.border = "1px solid red";
                signupUsername.style.boxShadow = "2px 2px 2px #FFD6D6, -2px -2px 2px #FFD6D6";
            }
            else {
                phoneError.style.display = "none";
                noPhone.style.display = "none";
                noCheckWord.style.display = "none";
                signupUsername.style.border = "1px solid #ccc";
                signupUsername.style.boxShadow = "";
                if(signupPassword.value.trim() === ""){
                    noCheckWord.style.display = "block";
                    signupPassword.focus();
                    signupPassword.click();
                } else {
                    noCheckWord.style.display = "none";
                }
            }
        }
    });


    //下面是针对登录按钮的各种情况做的细节处理
    loginBtn2.addEventListener("mouseover", function () {
        if (!isChoose) {
            loginBtn2.style.backgroundColor = "rgb(165, 178, 237)";
        } else if (isChoose) {
            loginBtn2.style.backgroundColor = "#4662D9";
        }
        });
        loginBtn2.addEventListener("mouseout", function () {
        if (!isChoose) {
            loginBtn2.style.backgroundColor = "#B8C5FA";
        } else if (isChoose) {
            loginBtn2.style.backgroundColor = "#4E6EF2";
        }
        });
        loginBtn2.addEventListener("mousedown", function () {
        if (isChoose) {
            loginBtn2.style.boxShadow = "0 2px 2px #DCE2FC";
        }
        });
        loginBtn2.addEventListener("mouseup", function () {
        if (isChoose) {
            loginBtn2.style.boxShadow = "0 8px 12px rgb(217, 224, 252)";
        }
    });


    //获取四个输入框的元素
    const loginUsername = document.getElementById("loginUsername");
    const loginPassword = document.getElementById("loginPassword");
    const signupUsername = document.getElementById("signupUsername");
    const signupPassword = document.getElementById("signupPassword");

    // 定义一个函数，用于处理输入框的点击和失去焦点事件
    function handleInputField(inputField) {
        // 添加点击事件监听器
        inputField.addEventListener("click", function () {
            // 设置边框为浅蓝色并添加阴影
            inputField.style.border = "1px solid #488EE7";
            inputField.style.boxShadow = "0 0 5px rgba(61, 121, 255, 0.5)";
        });
        // 添加失去焦点事件监听器
        inputField.addEventListener("blur", function () {
            // 恢复原样式
            inputField.style.border = "1px solid #ccc";
            inputField.style.boxShadow = "none";
        });
    }
    // 处理登录用户名输入框
    handleInputField(loginUsername);
    // 处理登录密码输入框
    handleInputField(loginPassword);
    // 处理注册用户名输入框
    handleInputField(signupUsername);
    // 处理注册密码输入框
    handleInputField(signupPassword);







    //4、辅助模式的功能实现
    //辅助模式按钮元素获取
    const modeBtn = document.querySelector(".right-icon1");
    //辅助模式块元素获取
    const modeBlock = document.querySelector(".modeBlock");
    //占位块获取
    const placeHolder = document.querySelector(".placeholder");
    //更多-下拉弹窗元素获取
    const moreBox = document.querySelector(".more");
    //辅助模式按钮提示词获取
    const iconText = document.querySelector(".icon-text");

    // 添加事件监听器，当鼠标悬停在后面的按钮上时，显示前面的元素
    modeBtn.addEventListener("mouseenter", function () {
        iconText.style.backgroundColor = "white";
        iconText.style.visibility = "visible";
    });
    // 添加事件监听器，当鼠标移开辅助模式按钮时，隐藏提示词元素
    modeBtn.addEventListener("mouseleave", function () {
        iconText.style.visibility = "hidden";
    });

    //检测辅助模式是否弹出
    let modeBlockVisible = false;
    //为辅助模式按钮添加监听器
    modeBtn.addEventListener("click", function () {
        //记录下面代码中定义的当前颜色模式
        let modeColorIndex = colorIndex;
        //判断isBlack的值
        if (modeColorIndex === 1 || modeColorIndex === 2) {
            isBlack = false;
        } else if (modeColorIndex === 0) {
            isBlack = true;
        }
        //点击辅助模式 监听器
        if (!modeBlockVisible) {
            placeHolder.style.display = "block";
            modeBlock.style.display = "block";
            adjustMarginTop1();
            modeBlockVisible = true;
            if (modeColorIndex === 1) {
                changeToBlack();
                document.body.setAttribute("body-theme", "black");
                updateList(isBlack);
                image.src = "https://img2.imgtp.com/2024/04/02/p4b9BAcP.png";
            }
            if (modeColorIndex === 2) {
                changeToBlue();
                document.body.setAttribute("body-theme", "blue");
                updateList(isBlack);
                image.src = "https://img2.imgtp.com/2024/04/06/PtWXLL2J.png";
            }
            if (modeColorIndex === 0) {
                changeImg.src = "https://img2.imgtp.com/2024/04/14/KFdWEyII.png";
                isBlack = false;
                updateList(isBlack);
            }
        }
        //辅助模式收起
        else {
            placeHolder.style.display = "none";
            modeBlock.style.display = "none";
            moreBox.style.marginTop = "";
            modeBlockVisible = false;
            icon_blog.style.marginTop = "";
            changeToWhite();
            document.body.setAttribute("body-theme", "white");
            isBlack = false;
            updateList(isBlack);
            image.src = "https://img2.imgtp.com/2024/04/02/bh7rK3Oy.png";
        }
    });

    //实现辅助按钮下面那个二维码的变色功能以及显示一个块
    const rightIcon2 = document.querySelector(".right-icon2");
    const rightIconImg = document.querySelector(".right-icon2 img");
    const icon_blog = document.querySelector(".icon-blog");
    // 添加鼠标悬停监听器
    rightIcon2.addEventListener("mouseenter", function () {
        // 在鼠标悬停时更改图像
        rightIconImg.src = "https://img2.imgtp.com/2024/04/03/ipgqSvjv.png";
        icon_blog.style.display = "block";
        });

        // 添加鼠标离开监听器
        rightIcon2.addEventListener("mouseleave", function () {
        // 在鼠标离开时恢复原始图像
        rightIconImg.src = "https://img2.imgtp.com/2024/04/03/3WZctcRJ.png";
        icon_blog.style.display = "none";
    });

    //辅助模式每个块hover变色功能实现
    // 定义每个图片的悬停效果
    const hoverImages = [
    "https://img2.imgtp.com/2024/04/14/PBkNymsl.png",
    "https://img2.imgtp.com/2024/04/14/I56MD56G.png",
    "https://img2.imgtp.com/2024/04/14/OGqpoFsF.png",
    "https://img2.imgtp.com/2024/04/14/sM2EtbRY.png",
    "https://img2.imgtp.com/2024/04/14/vrEIg2s4.png",
    "https://img2.imgtp.com/2024/04/14/Gbesnq23.png",
    "https://img2.imgtp.com/2024/04/14/X3kPng0c.png",
    "https://img2.imgtp.com/2024/04/14/W4dYrgBT.png",
    "https://img2.imgtp.com/2024/04/14/rkZbyo5Y.png",
    "https://img2.imgtp.com/2024/04/14/pZxNzKHN.png",
    "https://img2.imgtp.com/2024/04/14/m4HVSVQn.png",
    "https://img2.imgtp.com/2024/04/14/N4LAvzbm.png",
    "https://img2.imgtp.com/2024/04/14/sg0wWfqi.png",
    "https://img2.imgtp.com/2024/04/14/biSZ72FL.png",
    ];

    // 获取所有图片元素
    const chileImages = document.querySelectorAll(".child img");

    // 遍历每个图片元素
    chileImages.forEach((image, index) => {
        // 如果是第五个图片，跳过处理，下面要单独处理
        if (index === 5) return;
        // 原始图片 URL
        const originalSrc = image.src;
        // 当前图片的悬停图片 URL
        const hoverSrc = hoverImages[index];
        // 添加鼠标悬停事件监听器
        image.addEventListener("mouseover", function () {
            // 更换图片的 src 属性为悬停图片的 URL
            this.src = hoverSrc;
        });
        // 添加鼠标移开事件监听器
        image.addEventListener("mouseout", function () {
            // 恢复图片的 src 属性为原始图片的 URL
            this.src = originalSrc;
        });
    });

    // 调整更多下拉弹窗在不同宽度屏幕下距离顶部的函数
    function adjustMarginTop1() {
        // 获取当前屏幕宽度
        const screenWidth = window.innerWidth;
        // 根据不同的屏幕宽度设置不同的 marginTop
        let marginTop;
        if (screenWidth <= 500) {
            marginTop = "120px";
        } else if (screenWidth > 500 && screenWidth < 800) {
            marginTop = "140px";
        } else if (screenWidth >= 800 && screenWidth < 1200) {
            marginTop = "145px";
        } else {
            marginTop = "180px";
        }
        // 设置元素的 marginTop
        moreBox.style.marginTop = marginTop;
    }










    //5、暗色模式功能模块实现
    // 获取暗色模式按钮元素
    const changeColor = document.getElementById("changeColor");
    const changeImg = changeColor.querySelector("img");
    // logo
    const logoChanger = document.querySelector(".logo");
    const logoChange = logoChanger.querySelector("img");
    //百度热搜以及热搜榜
    const baiduHotSearch = document.querySelector(".baidu-hot-search");
    const hotSearch = document.querySelector(".baidu-hot-search a");
    const hockIcon = document.querySelector(".hockIcon img");
    const middle_context = document.querySelectorAll(".middle-context li a");
    //换一换的图片元素获取，图片也需要换成暗色图片
    const h_icon = document.querySelector(".h-icon");
    const image = document.getElementById("image");
    //AIbtn元素获取
    const AiBtn = document.querySelector(".AIbtn img");
    //尾部图片元素获取
    const footImage1 = document.querySelector(".footImage1 a img");
    const footImage2 = document.querySelector(".footImage2 a img");

    //定义更改颜色按钮的图片颜色变化
    const originalSrc = "https://img2.imgtp.com/2024/04/14/KFdWEyII.png";
    const hoverSrc = "https://img2.imgtp.com/2024/04/14/Gbesnq23.png";
    changeImg.addEventListener("mouseenter", function () {
        // 如果原始图片未被更改
        if (changeImg.src === originalSrc) {
            changeImg.src = hoverSrc;
        }
        });
        changeImg.addEventListener("mouseout", function () {
        // 如果原始图片未被更改
        if (changeImg.src === hoverSrc) {
            changeImg.src = originalSrc;
        }
    });
    //底部隐藏框的颜色变化，有点繁杂
    function footImgChangeWhite(){footImage2.src = "https://img2.imgtp.com/2024/04/13/erwyMj6W.png";}
    function footImgChangeBlack(){footImage2.src = "https://img2.imgtp.com/2024/04/13/IEPpMS1N.png";}
    function footImgChangeBlue(){footImage2.src = "https://img2.imgtp.com/2024/04/13/OhsOTqhM.png";}
    function footImgWhite(){footImage2.src = "https://img2.imgtp.com/2024/04/07/sklTtWbE.png";}
    function footImgBlack(){footImage2.src = "https://img2.imgtp.com/2024/04/07/DM0ykKjW.png";}
    function footImgBlue(){footImage2.src = "https://img2.imgtp.com/2024/04/07/ltQ2H3pP.png";}
    //百度热搜的颜色变化，有点繁杂
    function hockImgChangeWhite(){hockIcon.src = "https://img2.imgtp.com/2024/04/16/MLi9f8Wc.png";}
    function hockImgChangeBlack(){hockIcon.src = "https://img2.imgtp.com/2024/04/16/aKxjPpY2.png";}
    function hockImgChangeBlue(){hockIcon.src = "https://img2.imgtp.com/2024/04/16/0KEgtxZz.png";}
    function hockImgWhite(){hockIcon.src = "https://img2.imgtp.com/2024/04/16/5stoSUYO.png";}
    function hockImgBlack(){hockIcon.src = "https://img2.imgtp.com/2024/04/16/bFhmVrya.png";}
    function hockImgBlue(){hockIcon.src = "https://img2.imgtp.com/2024/04/16/R7johBzS.png";}
    //初始界面也要保持白色主题下底部隐藏窗样式
    baiduHotSearch.addEventListener("mouseover",hockImgChangeWhite);
    baiduHotSearch.addEventListener("mouseout",hockImgWhite);
    footImage2.addEventListener("mouseover",footImgChangeWhite);
    footImage2.addEventListener("mouseout",footImgWhite);


    //  重点变量！！！
    //  控制着挺多内容变化
    //  定义一个变量，记录当前页面是否为黑色
    let isBlack = false;

    //暗色模式主方法实现
    function changeToBlack() {
        isBlack = true;
        // 在更改颜色后立即调用updateList函数以及换一换图片更改
        updateList(isBlack);
        document.body.style.backgroundColor = "#1F1E24";
        changeImg.src = "https://img2.imgtp.com/2024/04/14/MMmDhi5m.png";
        //给设置元素带上监听器
        AiBtn.src = "https://img2.imgtp.com/2024/04/05/I97ge7Mn.png";
        logoChange.src = "https://img2.imgtp.com/2024/04/04/DjORnvDI.png";
        footImage1.src = "https://img2.imgtp.com/2024/04/07/escGHu3o.png";
        footImage2.src = "https://img2.imgtp.com/2024/04/07/DM0ykKjW.png";
        footImage2.removeEventListener("mouseover",footImgChangeWhite);
        footImage2.removeEventListener("mouseout",footImgWhite);
        footImage2.addEventListener("mouseover",footImgChangeBlack);
        footImage2.addEventListener("mouseout",footImgBlack);
        //百度热搜
        hockIcon.src = "https://img2.imgtp.com/2024/04/16/bFhmVrya.png";
        baiduHotSearch.removeEventListener("mouseover",hockImgChangeWhite);
        baiduHotSearch.removeEventListener("mouseout",hockImgWhite);
        baiduHotSearch.addEventListener("mouseover",hockImgChangeBlack);
        baiduHotSearch.addEventListener("mouseout",hockImgBlack);

        //换一换的图片hover颜色变化
        image.src = "https://img2.imgtp.com/2024/04/09/UpgCGanY.png";
        //移除白色模式下的换一换图片监听器
        h_icon.removeEventListener("mouseover", handleMouseOver);
        h_icon.removeEventListener("mouseout", handleMouseOut);
    }

    //白色模式的方法功能实现
    function changeToWhite() {
        isBlack = false;
        document.body.style.backgroundColor = "white";
        image.src = "https://img2.imgtp.com/2024/04/10/r3ta4xI7.png";
        changeImg.src = "https://img2.imgtp.com/2024/04/14/KFdWEyII.png";
        AiBtn.src = "https://img2.imgtp.com/2024/04/04/vBgvxHgF.png";
        logoChange.src = "https://img2.imgtp.com/2024/04/06/KXAkJk8V.png";
        footImage1.src = "https://img2.imgtp.com/2024/04/07/zc7C28Hn.png";
        footImage2.src = "https://img2.imgtp.com/2024/04/07/sklTtWbE.png";
        footImage2.removeEventListener("mouseover",hockImgChangeBlue);
        footImage2.removeEventListener("mouseout",hockImgBlue);
        footImage2.addEventListener("mouseover",footImgChangeWhite);
        footImage2.addEventListener("mouseout",footImgWhite);
        //百度热搜
        hockIcon.src = "https://img2.imgtp.com/2024/04/16/5stoSUYO.png";
        baiduHotSearch.removeEventListener("mouseover",hockImgChangeWhite);
        baiduHotSearch.removeEventListener("mouseout",hockImgWhite);
        baiduHotSearch.addEventListener("mouseover",hockImgChangeWhite);
        baiduHotSearch.addEventListener("mouseout",hockImgWhite);

        //增加白色模式下的换一换图片监听器
        h_icon.addEventListener("mouseover", handleMouseOver);
        h_icon.addEventListener("mouseout", handleMouseOut);
    }

    //蓝色背景的功能实现
    function changeToBlue() {
        isBlack = true;
        document.body.style.backgroundColor = "#141E42";
        changeImg.src = "https://img2.imgtp.com/2024/04/14/qhucm2rp.png";
        logoChange.src = "https://img2.imgtp.com/2024/04/06/oDSslobN.png";
        footImage1.src = "https://img2.imgtp.com/2024/04/07/Iql4or8D.png";
        footImage2.src = "https://img2.imgtp.com/2024/04/07/ltQ2H3pP.png";
        footImage2.removeEventListener("mouseover",footImgChangeBlack);
        footImage2.removeEventListener("mouseout",footImgBlack);
        footImage2.addEventListener("mouseover",footImgChangeBlue);
        footImage2.addEventListener("mouseout",footImgBlue);
        //百度热搜
        hockIcon.src = "https://img2.imgtp.com/2024/04/16/R7johBzS.png";
        baiduHotSearch.removeEventListener("mouseover",hockImgChangeBlack);
        baiduHotSearch.removeEventListener("mouseout",hockImgBlack);
        baiduHotSearch.addEventListener("mouseover",hockImgChangeBlue);
        baiduHotSearch.addEventListener("mouseout",hockImgBlue);

        AiBtn.src = "https://img2.imgtp.com/2024/04/05/I97ge7Mn.png";
        //换一换的图片hover颜色变化
        image.src = "https://img2.imgtp.com/2024/04/06/PtWXLL2J.png";
        //移除白色模式下的换一换图片监听器
        h_icon.removeEventListener("mouseover", handleMouseOver);
        h_icon.removeEventListener("mouseout", handleMouseOut);
    }
    //设定变量，控制颜色模式  0为黑色/1为蓝色/2为白色
    let colorIndex = 0;
    //设置监听器，切换背景色的方法调用在这里实现
    changeColor.addEventListener("click", function () {
        if (colorIndex === 0) {
            changeToBlack();
            document.body.setAttribute("body-theme", "black");
            colorIndex = 1;
        } else if (colorIndex === 1) {
            changeToBlue();
            document.body.setAttribute("body-theme", "blue");
            colorIndex = 2;
        } else if (colorIndex === 2) {
            changeToWhite();
            document.body.setAttribute("body-theme", "white");
            colorIndex = 0;
        }
        updateList(isBlack);
    });









    //5.5、 换一换的图片旋转功能实现
    function rotateImage() {
        // 获取当前的旋转角度
        var currentRotation =
            //这个方法我是查资料的，就是取当前旋转角度的数字部分，其他全去除
            parseInt(
            image.style.transform.replace("rotate(", "").replace("deg)", "")
            ) || 0;
        // 将旋转角度增加180度
        var newRotation = currentRotation + 180;
        // 改完角度立马应用新的旋转角度
        image.style.transform = "rotate(" + newRotation + "deg)";
    }
    //换一换按钮调用
    h_icon.addEventListener("click", rotateImage);
    
    //换一换的图片hover颜色变化
    h_icon.addEventListener("mouseover", handleMouseOver);
    h_icon.addEventListener("mouseout", handleMouseOut);
    //Hover功能实现
    function handleMouseOver() {
        image.src = "https://img2.imgtp.com/2024/04/10/OeGXzQHR.png";
    }
    function handleMouseOut() {
        image.src = "https://img2.imgtp.com/2024/04/10/r3ta4xI7.png";
    }








    // 6、换一换功能实现
    // 获取换一换按钮元素，以及热搜列表元素
    const changeButton = document.getElementById("change");
    const list = document.getElementById("list");
    //定义总测试数组
    const allTestData = [
    [
        { title: "习近平总书记出席全国两会纪实", isNew: true, isHot: false },
        { title: "朋友圈发这些可能会被封号", isNew: true, isHot: false },
        { title: "隧道内开车门恶意别车?警方通报", isNew: false, isHot: true },
        { title: "这些两会建议冲上热搜", isNew: false, isHot: true },
        { title: "39元瑞士卷被黄牛炒到120元", isNew: false, isHot: false },
        { title: "荷兰欲砸近200亿元挽留光刻机巨头", isNew: false, isHot: false }
    ],
    [
        { title: "王诗龄回国穿近4万套装", isNew: false, isHot: false },
        { title: "国足获胜4万多名球迷大合唱", isNew: false, isHot: false },
        { title: "外卖检出粪便尿液?假的", isNew: false, isHot: false },
        { title: "考生莫言北大复试成绩公布", isNew: false, isHot: true },
        { title: "特朗普身家暴涨至超500亿", isNew: false, isHot: false },
        { title: "结婚10年育3子 妻子报警称丈夫强奸", isNew: false, isHot: false }
    ],
    [
        { title: "乌克兰东部最大发电厂被摧毁", isNew: true, isHot: false },
        { title: "黄山辟谣天都峰4月1日开放", isNew: false, isHot: false },
        { title: "全上海一年的豪宅一天就卖完？", isNew: false, isHot: true },
        { title: "13岁女孩失联5天:曾到家却未进?", isNew: false, isHot: false },
        { title: "奔驰加塞事件原视频", isNew: false, isHot: false },
        { title: "月薪15000住家阿姨的一天", isNew: false, isHot: false },
    ],
    [
        { title: "吴艳妮:完全不能接受被叫做网红", isNew: true, isHot: false },
        { title: "校方通报高校老师诱骗女生当小三", isNew: false, isHot: false },
        { title: "萌娃大哭要出去玩 见门开了秒变脸", isNew: false, isHot: false },
        { title: "万达将获约600亿元投资", isNew: false, isHot: false },
        { title: "95后女警眼神杀吓懵嫌疑人", isNew: false, isHot: true },
        { title: "男子账户里的2470万保住了", isNew: false, isHot: false },
    ],
    [
        { title: "店主回应女子称加香菜被收10元", isNew: false, isHot: false },
        { title: "上海偶遇陆毅鲍蕾一家四口", isNew: false, isHot: false },
        { title: "5岁男童身亡,其母亲发声", isNew: false, isHot: false },
        { title: "13岁男孩起诉妈妈归还100万房款", isNew: false, isHot: false },
        { title: "雷军能不能生产一下相机", isNew: false, isHot: true },
        { title: "百日誓师被网暴女孩考进人大新闻系", isNew: false, isHot: false },
    ],
    ];
    // 当前显示的测试数据索引
    let currentDataIndex = 0;
    // 定义一个更新列表函数，这个关键方法
    function updateList(isBlack) {
        let colorIndexNow = colorIndex;
        //当前显示的测试数据
        const currentData = allTestData[currentDataIndex];
        //定义html元素，并且设置为空字符
        let html = "";
        // 计算当前序号
        const startIndex = currentDataIndex * 6;
        // 将每组数据分成两个列表项，因为html那边就是分两部分，一左一右。
        for (let i = 0; i < currentData.length; i += 3) {
            //获取html的style样式，直接借用css样式，不需要重新定义
            html += "<ul class='middle-context'>";
            // 对每个分组内的数据进行处理
            for (let j = i; j < i + 3 && j < currentData.length; j++) {
            const data = currentData[j];
            const liIndex = j - i + 1;
            //为每一个li元素设置类名，这个类目由序号得出
            const liClass = `li-${liIndex}`;
            const dataIndex = startIndex + j; // 计算序号
            let indexContent = dataIndex; // 默认使用数字作为序号内容

            // 检查序号是否为 1，如果是，则添加自定义类
            //下面还对三种颜色模式做了判断
            if (dataIndex === 0) {
                let imageUrl = '';
                if (modeBlockVisible) {
                    if (colorIndexNow === 1) {
                        imageUrl = 'https://img2.imgtp.com/2024/04/15/6MZy22vi.png';
                    } else if (colorIndexNow === 2) {
                        imageUrl = 'https://img2.imgtp.com/2024/04/15/BXypA2gb.png';
                    }
                    else if(colorIndexNow === 0){
                        imageUrl = 'https://img2.imgtp.com/2024/04/14/EFhJMrmN.png';
                    }
                } else {
                    imageUrl = 'https://img2.imgtp.com/2024/04/14/EFhJMrmN.png';
                }
                if (imageUrl !== '') {
                    indexContent = `<img src='${imageUrl}' alt='No.1' 
                        style='display: inline-block; vertical-align: middle;
                        line-height: 30px; width: 18px; 
                        height: 18px; margin: -5px -5px 0 -4px;
                        ' class='top'>`;
                }
            }
            
            //调用css中的对于2/3序号颜色的样式
            const liColorClass1 = dataIndex === 1 ? "one" : "";
            const liColorClass2 = dataIndex === 2 ? "two" : "";
            const liColorClass3 = dataIndex === 3 ? "three" : "";
            //判断语句，即暗色或者明色模式下字体颜色
            if (dataIndex === 0 && isBlack) {
                html += `<li class="${liClass}">${indexContent}<a href="#" class="custom-link">${data.title}</a>`;
            } else if (dataIndex === 0 && !isBlack) {
                html += `<li class="${liClass}">${indexContent}<a href="#" class="custom-link">${data.title}</a>`;
            } else if (dataIndex !== 0 && isBlack) {
                html += `<li class="${liClass}  ${liColorClass1} ${liColorClass2} ${liColorClass3}">
                    ${dataIndex}<a href="#" class="custom-link">${data.title}</a>`;
            } else if (dataIndex !== 0 && !isBlack) {
                html += `<li class="${liClass}  ${liColorClass1} ${liColorClass2} ${liColorClass3}">
                    ${dataIndex}<a href="#" class="custom-link">${data.title}</a>`;
            }        
            //判断显示数据中是否需要加这些样式
            if (data.isNew) {
                html += `<span class="new">新</span>`;
            }
            if (data.isHot) {
                html += `<span class="hot">热</span>`;
            }
            html += `</li>`;
            }
            //html语句结尾
            html += "</ul>";
        }
        // 替换整个列表块的内容
        list.innerHTML = html;
    }
    // 监听器，换一换功能实现
    changeButton.addEventListener("click", function () {
    // 获取下一个测试数据集的索引
    currentDataIndex = (currentDataIndex + 1) % allTestData.length;
    // 更新列表
    updateList(isBlack);
    });
    // 初始化列表
    updateList(isBlack);




    //针对页面底部的隐藏与显示的调试
    const footBox = document.querySelector(".footBox");
    function hideFooter() {
        const screenWidth = window.innerWidth;
        //获取要依次隐藏的元素
        const notShowElements = [
            document.querySelector('.notShow2'),
            document.querySelector('.notShow3'),
            document.querySelector('.notShow4'),
            document.querySelector('.notShow5'),
            document.querySelector('.notShow6')
        ];        
        // 显示show类的元素
        const showElements = document.querySelectorAll('.show1, .show2, .show3, .show4, .show5');
        // 计算要隐藏的元素数量
        let hideCount = Math.max(0, Math.floor((1600 - screenWidth) / 130));
        // 计算要显示的 show 元素数量
        let showCount = Math.min(showElements.length, showElements.length - hideCount);
        // 隐藏 notShow 元素
        for (let i = 0; i < notShowElements.length; i++) {
            notShowElements[i].style.display = i < hideCount ? 'none' : 'block';
        }
        // 显示 show 元素
        for (let i = 0; i < showElements.length; i++) {
            showElements[i].style.display = i < showCount ? 'none' : 'block';
        }
        // 获取 .show4 元素
        const show4 = document.querySelector('.show4');
        // 获取 .show3 元素
        const show3 = document.querySelector('.show3');
        // 如果.show4 显示，则隐藏.show3
        if (show4.style.display === 'block') {
            show3.style.display = 'none';
        }
    }
    //监听页面宽度变化
    window.addEventListener('resize', hideFooter);
    hideFooter();
    //针对隐藏窗的处理以及变化
    document.addEventListener("DOMContentLoaded", function(){
        hideFooter();
    });
    //对隐藏窗触发按钮做监听
    footImage2.addEventListener("mouseenter",function(){
        footBox.style.display = "block";
    });
    footImage2.addEventListener("mouseout",function(){
        footBox.style.display = "none";
    });
