document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("details.smooth-toggle").forEach(detail => {
    const content = document.createElement('div');
    // 기존 summary 이후의 내용들을 content에 넣기
    while (detail.children.length > 1) {
      content.appendChild(detail.children[1]);
    }
    content.classList.add('content');
    detail.appendChild(content);

    // 애니메이션 적용
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = 0;
      }
    });
  });
});
