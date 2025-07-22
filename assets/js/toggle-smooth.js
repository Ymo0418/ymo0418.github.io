document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("details.smooth-toggle").forEach(detail => {
    const content = document.createElement('div');

    // summary를 제외한 내용을 감싸는 div 생성
    while (detail.children.length > 1) {
      content.appendChild(detail.children[1]);
    }

    content.classList.add("content");
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.8s ease";
    content.style.maxHeight = detail.open ? content.scrollHeight + "px" : "0";
    detail.appendChild(content);

    let isAnimating = false;

    const openDetail = () => {
      isAnimating = true;
      content.style.maxHeight = content.scrollHeight + "px";

      // 애니메이션 후 상태 정리
      setTimeout(() => {
        isAnimating = false;
        // 중요: 닫기 위해 max-height를 고정된 수치로 유지해야 함
        content.style.maxHeight = content.scrollHeight + "px";
      }, 800);
    };

    const closeDetail = () => {
      isAnimating = true;
      // 현재 높이 고정
      content.style.maxHeight = content.scrollHeight + "px";

      // 강제 reflow
      void content.offsetHeight;

      // 애니메이션 시작
      content.style.maxHeight = "0";

      setTimeout(() => {
        isAnimating = false;
      }, 800);
    };

    // summary 클릭 감지 (toggle보다 빠름)
    detail.querySelector("summary").addEventListener("click", (e) => {
      if (isAnimating) {
        e.preventDefault(); // 애니메이션 중에는 toggle 막기
        return;
      }

      if (!detail.open) {
        openDetail();
      } else {
        closeDetail();
      }
    });
  });
});
