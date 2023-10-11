$(document).ready(function () {
    var itemsPerPage = 10; // 한 페이지당 표시할 항목 수
    var $table = $('.table tbody');
    var $rows = $table.find('tr');

    var currentPage = 1;
    var totalPages = Math.ceil($rows.length / itemsPerPage);

    showPage(currentPage);

    $('.pagination li').on('click', function () {
        if ($(this).hasClass('disabled') || $(this).hasClass('active')) {
            return false;
        }
        if ($(this).text() === "이전") {
            if (currentPage > 1) {
                currentPage--;
                document.getElementById("num").innerHTML = currentPage;
            }
        } else if ($(this).text() === "다음") {
            if (currentPage < totalPages) {
                currentPage++;
                document.getElementById("num").innerHTML = currentPage;
            }
        } else {
            currentPage = $(this).index();
        }
        showPage(currentPage);
    });

    function showPage(page) {
        $('.pagination li').removeClass('active');
        $table.find('tr').hide();
        var start = (page - 1) * itemsPerPage;
        var end = start + itemsPerPage;
        if (page === totalPages) {
            // 마지막 페이지에서는 남은 항목을 모두 출력
            end = $rows.length;
        }
        $table.find('tr').slice(start, end).show();
        $('.pagination li:eq(' + (page - 1) + ')').addClass('active');

        // "이전" 및 "다음" 버튼 활성화/비활성화 처리
        $('.pagination li').removeClass('disabled');
        if (page === 1) {
            $("#previousPage").addClass('disabled');
        }
        if (page === totalPages) {
            $("#nextPage").addClass('disabled');
        }
    }
});

// 모든 클래스가 "copyable"인 요소를 찾습니다.
var copyableElements = document.querySelectorAll(".copyable");

// 각 요소를 클릭하면 연결된 데이터 내용을 클립보드로 복사합니다.
copyableElements.forEach(function (element) {
    element.addEventListener("click", function () {
        // 요소에 연결된 데이터 내용을 가져와 클립보드로 복사합니다.
        var textToCopy = element.getAttribute("data-content");

        // 임시 텍스트 영역을 만들어 클립보드로 복사합니다.
        var textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        // 사용자에게 알림 메시지로 복사됨을 알립니다.
        alert("복사됨: " + textToCopy);
    });
});

// 모든 클래스가 "memo-icon"인 요소를 찾습니다.
var memoIcons = document.querySelectorAll(".memo-icon");

// 메모 모달 창 요소를 가져옵니다.
var modal = document.getElementById("memoModal");
var modalContent = document.querySelector(".modal-content");
var memoText = document.getElementById("memoText");

// 각 메모 아이콘을 클릭하면 연결된 메모를 표시합니다.
memoIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        var memo = icon.getAttribute("data-memo");
        memoText.textContent = memo;
        modal.style.display = "block";
    });
});

// 모달 창 닫기 버튼을 클릭하면 모달 창을 숨깁니다.
var closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});


// 메모 아이콘 아래에 메모를 표시할 리스트 엘리먼트를 가져옵니다.
var memoList = document.getElementById("memoList");

// 각 메모 아이콘을 순회하며, 해당 메모 아이콘 아래에 메모 표시를 추가합니다.
memoIcons.forEach(function (icon) {
    var memoText = icon.getAttribute("data-memo");

    // 아이콘과 메모를 담는 요소를 생성합니다.
    var listItem = document.createElement("li");
    listItem.innerHTML = `
        <i class="fas fa-sticky-note"></i>
        <span class="memo-text">${memoText}</span>
    `;

    // 메모 표시 요소를 메모 리스트에 추가합니다.
    memoList.appendChild(listItem);

    icon.addEventListener("click", function () {
        var memo = icon.getAttribute("data-memo");
        memoText.textContent = memo;
        modal.style.display = "block";
    });
});

// 모달 창 닫기 버튼을 클릭하면 모달 창을 숨깁니다.
var closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function() {
    // 테이블의 tbody 요소 가져오기
    var tbody = document.querySelector("table tbody");

    // 모든 행(<tr>)을 가져와서 반복
    var rows = tbody.querySelectorAll("tr");
    for (var i = 0; i < rows.length; i++) {
      // 각 행의 order 셀에 순차적인 번호 추가
      var cell = rows[i].querySelector(".order");
      cell.textContent = (i + 1);
    }
  });