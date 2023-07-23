/* eslint-disable react-hooks/exhaustive-deps */
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/example/visual-slide-index-rwd.css";

let timer;

export default function VisualSlideIndexRwd() {
  const visualInnerRef = useRef(null); // visual_inner의 너비를 가져오는데 사용
  const visualListRef = useRef(null); // visual_list의 하위 엘레먼트들을 가져오는데 사용
  const visualLiRefs = useRef([]); // 각 LI 요소를 배열로 저장 함.

  const visualWidth = useRef(0); // 각 슬라이드의 가로 크기를 저장하는 변수
  const currentIndex = useRef(0); // 현재 활성화된 슬라이드의 인덱스를 관리하는 상태
  const [isSlide, setIsSlide] = useState(false); // 슬라이드 애니메이션이 진행 중인지 여부를 관리하는 상태

  /**
   * @desc 렌더링 및 이벤트 생성 작업
   */
  useEffect(() => {
    visualReset();
    init();

    window.addEventListener("resize", visualReset);

    autoPlay();

    return () => {
      window.removeEventListener("resize", visualReset);
      clearInterval(timer);
    };
  }, []);

  /**
   * @desc 슬라이드 초기화 함수 LI 첫번째 요소를 set 해줌.
   */
  const init = () => {
    gsap.set(visualLiRefs.current, { left: visualWidth.current });
    gsap.set(visualLiRefs.current[0], { left: 0 });
  };

  /**
   * @desc 슬라이드를 반응형으로 초기화 해주는 함수 (RESIZE)
   */
  const visualReset = () => {
    visualWidth.current = visualInnerRef.current.offsetWidth;
    const visualImg = visualListRef.current.querySelectorAll("li img");
    gsap.set(visualLiRefs.current, { width: visualWidth.current });
    gsap.set(visualImg, { width: visualWidth.current });
  };

  /**
   * @desc 다음 슬라이드로 이동
   */
  const slideNext = (isAuto) => {
    if (!isSlide) {
      if (!isAuto) stopAutoPlay();
      setIsSlide(true);

      let nextIndex = currentIndex.current + 1;
      // 전체 길이보다 크거나 같다면 인덱스를 0으로 초기화
      if (nextIndex >= visualLiRefs.current.length) {
        nextIndex = 0;
      }

      // 현재 LI 요소를 가져와 애니메이션 적용
      gsap.to(visualLiRefs.current[currentIndex.current], {
        left: -visualWidth.current,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });
      // 다음 LI 요소를 가져와 애니메이션 적용
      gsap.set(visualLiRefs.current[nextIndex], { left: visualWidth.current });
      gsap.to(visualLiRefs.current[nextIndex], {
        left: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          if (!isAuto) autoPlay();
          setIsSlide(false);
        },
      });
      // 다음 인덱스를 저장
      currentIndex.current = nextIndex;
    }
  };

  /**
   * @desc 이전 슬라이드로 이동
   */
  const slidePrev = (isAuto) => {
    if (!isSlide) {
      if (!isAuto) stopAutoPlay();

      setIsSlide(true);
      let prevIndex = currentIndex.current - 1;
      // 이전 인덱스가 0보다 작으면, 전체 길이에서 -1 함.
      if (prevIndex < 0) {
        prevIndex = visualLiRefs.current.length - 1;
      }

      // 현재 LI 요소를 가져와 애니메이션 적용
      gsap.to(visualLiRefs.current[currentIndex.current], {
        left: visualWidth.current,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      });

      // 이전 LI 요소를 가져와 애니메이션 적용
      gsap.set(visualLiRefs.current[prevIndex], { left: -visualWidth.current });
      gsap.to(visualLiRefs.current[prevIndex], {
        left: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          if (!isAuto) autoPlay();
          setIsSlide(false);
        },
      });
      // 이전 인덱스를 저장
      currentIndex.current = prevIndex;
    }
  };

  /**
   * @desc 자동 슬라이드 함수
   */
  const autoPlay = () => {
    timer = setInterval(() => slideNext(true), 2000);
  };

  /**
   * @desc 자동 슬라이드 멈춤 함수
   */
  const stopAutoPlay = () => {
    clearInterval(timer);
  };

  return (
    <div id="visual_container">
      <div id="visual_wrap">
        <div id="visual_inner" ref={visualInnerRef}>
          <ul id="visual_list" ref={visualListRef}>
            <li
              style={{ width: visualWidth.current }}
              ref={(el) => (visualLiRefs.current[0] = el)}
            >
              <img src="/images/img1.gif" alt="" height={574} />
            </li>
            <li
              style={{ width: visualWidth.current }}
              ref={(el) => (visualLiRefs.current[1] = el)}
            >
              <img src="/images/img2.gif" alt="" height={574} />
            </li>
            <li
              style={{ width: visualWidth.current }}
              ref={(el) => (visualLiRefs.current[2] = el)}
            >
              <img src="/images/img3.gif" alt="" height={574} />
            </li>
            <li
              style={{ width: visualWidth.current }}
              ref={(el) => (visualLiRefs.current[3] = el)}
            >
              <img src="/images/img4.gif" alt="" height={574} />
            </li>
            <li
              style={{ width: visualWidth.current }}
              ref={(el) => (visualLiRefs.current[4] = el)}
            >
              <img src="/images/img5.gif" alt="" height={574} />
            </li>
          </ul>
          <span id="prev_btn" onClick={() => slidePrev(false)}>
            <img src="/images/prev_btn.png" alt="" />
          </span>
          <span id="next_btn" onClick={() => slideNext(false)}>
            <img src="/images/next_btn.png" alt="" />
          </span>
        </div>
      </div>
    </div>
  );
}
