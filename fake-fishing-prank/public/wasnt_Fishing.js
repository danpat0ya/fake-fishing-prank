document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    // START 또는 RESTART 버튼 클릭
    const startBtn = document.querySelector('.start_button');
    if (startBtn) {
      startBtn.click();
      return;
    }

    // CLOSE 버튼 클릭
    const closeBtn = document.querySelector('.close_button');
    if (closeBtn) {
      closeBtn.click();
    }
  }
});

function startFishing() {
  // 1. 버튼 숨기기
  const button = document.querySelector('.start_button');
  if (button) button.remove();

  // 2. 배경 이미지 변경
  document.body.style.backgroundImage = "url('fishing_port.png')";

  // 3. 이미지 요소 생성
  const bait = document.createElement('img');
  bait.src = 'brandnew_bait.png';
  bait.className = 'bait_image';
  document.body.appendChild(bait);

  // 4. 애니메이션 실행
  let count = 0;
  let direction = 1;
  const interval = setInterval(() => {
    bait.style.transform = `translateY(${direction * 2}px)`;
    direction *= -1;
    count++;
    if (count >= 6) {
      clearInterval(interval);
      bait.style.transform = 'translateY(0)';
    }
  }, 250);

  // 5. 랜덤 시간 후 다음 단계 실행
  const delay = Math.floor(Math.random() * (2500 - 100 + 1)) + 200;
  setTimeout(() => {
    bait.remove(); // 미끼 제거

    // 6. 확률 기반 결과
    const rand = Math.random() * 100;
    let imageSrc = '';
    let message = '';
    let isAd = false;

    if (rand < 60) {
      isAd = true;
      message = '당신을 낚았다!';
    } else if (rand < 80) {
      imageSrc = 'fish_1.png';
      message = '대구를 낚았다!\n20% 확률!!';
    } else if (rand < 89) {
      imageSrc = 'fish_2.png';
      message = '광어를 낚았다!\n9% 확률!!';
    } else if (rand < 96) {
      imageSrc = 'fish_3.png';
      message = '도미를 낚았다!\n7% 확률!!';
    } else if (rand < 98) {
      imageSrc = 'fish_4.png';
      message = '고래상어를 낚았다!\n2% 확률!!';
    } else {
      imageSrc = 'treasure.png';
      message = '보물을 낚았다!\n1% 확률!!';
    }

    // 6-1. 결과 표시
    const overlay = document.createElement('div');
    overlay.className = 'result_overlay';

    const msg = document.createElement('div');
    msg.className = 'result_message';
    msg.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close_button';
    closeBtn.textContent = 'X';
    closeBtn.onclick = () => {
      overlay.remove();
      document.body.style.backgroundImage = "url('port_with_rod.png')";
      showRestartButton();
    };

    overlay.appendChild(msg);
    overlay.appendChild(closeBtn);

    if (isAd) {
      const ad = document.createElement('ins');
      ad.className = 'adsbygoogle';
      ad.style.cssText = 'display:block; width:100vw; height:100vh;';
      ad.setAttribute('data-ad-client', 'ca-pub-xxxxxxxxxxxxxxxx');
      ad.setAttribute('data-ad-slot', '1234567890');
      ad.setAttribute('data-ad-format', 'auto');
      ad.setAttribute('data-full-width-responsive', 'true');
      overlay.appendChild(ad);
      (adsbygoogle = window.adsbygoogle || []).push({});
    } else {
      const resultImg = document.createElement('img');
      resultImg.src = imageSrc;
      resultImg.className = 'result_image';
      overlay.appendChild(resultImg);
    }

    document.body.appendChild(overlay);
  }, delay);
}

// 7. Restart 버튼 생성
function showRestartButton() {
  const restartBtn = document.createElement('input');
  restartBtn.type = 'button';
  restartBtn.value = 'RESTART';
  restartBtn.className = 'start_button restart_button';
  restartBtn.onclick = startFishing;
  document.body.appendChild(restartBtn);
}