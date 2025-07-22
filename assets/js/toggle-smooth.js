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
    content.style.transition = "max-height 0.4s ease";
    content.style.maxHeight = detail.open ? content.scrollHeight + "px" : "0";

    let isAnimating = false;

    detail.addEventListener("toggle", () => {
      if (isAnimating) return;
      isAnimating = true;

      if (detail.open) {
        // 열기
        content.style.maxHeight = content.scrollHeight + "px";

        // 열림 후 자동 높이로 전환 (스크롤 가능한 경우)
        setTimeout(() => {
          content.style.maxHeight = "none";
          isAnimating = false;
        }, 400);
      } else {
        // 닫기: 현재 높이로 고정 후 → 0 으로 줄이기
        const height = content.scrollHeight;
        content.style.maxHeight = height + "px";

        // reflow 강제 적용
        void content.offsetHeight;

        content.style.maxHeight = "0";

        setTimeout(() => {
          isAnimating = false;
          // 다시 열릴 때를 위해 max-height 초기화
          content.style.maxHeight = "0";
        }, 400);
      }
    });
  });
});
