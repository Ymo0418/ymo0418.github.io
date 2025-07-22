document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("details.smooth-toggle").forEach(detail => {
    const content = document.createElement('div');
    // 기존 summary 이후의 내용들을 content에 넣기
    while (detail.children.length > 1) {
      content.appendChild(detail.children[1]);
    }
    content.classList.add("content");
    detail.appendChild(content);

    // 초기 스타일
    content.style.overflow = "hidden";

    let isAnimating = false;
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        content.style.maxHeight = content.scrollHeight + "px";

          isAnimating = false;
      } else {
        content.style.maxHeight = 0;
        void content.offsetHeight;
      }
    });
  });
});
