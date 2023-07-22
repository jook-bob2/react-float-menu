import React, { useEffect, useState } from "react";
import "../../styles/example/modal-window.css";
import gsap from "gsap";

export default function ModalWindow() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  /**
   * @desc 모달이 열릴 때 애니메이션 적용
   */
  useEffect(() => {
    if (showModal) {
      // GSAP를 사용하여 fadeIn 애니메이션 적용
      gsap.set("#grayLayer", { display: "block" }); // grayLayer를 보여지게 함
      gsap.to("#grayLayer", {
        opacity: 0.9,
        duration: 0.3,
        ease: "porwer1.out",
      }); // 어둡게 되는 에니메이션 실행
      gsap.set("#overLayer", { display: "block", opacity: 1 });
    }
  }, [showModal]);

  /**
   * @desc 모달을 열기 전 img index와 showModal 셋팅
   * @param {*} index
   */
  const openModal = (index) => {
    setSelectedImg(index);
    setShowModal(true);
  };

  /**
   * @desc 모달을 닫을 때 애니메이션 처리 이후 showModal 값 변경
   */
  const closeModal = () => {
    // GSAP를 사용하여 fadeOut 애니메이션 적용
    gsap.to("#grayLayer", {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
      onComplete: () => setShowModal(false),
    });
    gsap.to("#overLayer", {
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
      onComplete: () => setShowModal(false),
    });
  };

  return (
    <div>
      <ul id="img_list">
        <li onClick={() => openModal(0)}>
          <span>
            <img src="/images/photo1_thum.jpg" alt="" />
          </span>
        </li>
        <li onClick={() => openModal(1)}>
          <span>
            <img src="/images/photo2_thum.jpg" alt="" />
          </span>
        </li>
        <li onClick={() => openModal(2)}>
          <span>
            <img src="/images/photo3_thum.jpg" alt="" />
          </span>
        </li>
        <li onClick={() => openModal(3)}>
          <span>
            <img src="/images/photo4_thum.jpg" alt="" />
          </span>
        </li>
        <li onClick={() => openModal(4)}>
          <span>
            <img src="/images/photo5_thum.jpg" alt="" />
          </span>
        </li>
        <li onClick={() => openModal(5)}>
          <span>
            <img src="/images/photo6_thum.jpg" alt="" />
          </span>
        </li>
        <li onClick={() => openModal(6)}>
          <span>
            <img src="/images/photo7_thum.jpg" alt="" />
          </span>
        </li>
        <li onClick={() => openModal(7)}>
          <span>
            <img src="/images/photo8_thum.jpg" alt="" />
          </span>
        </li>
      </ul>

      {showModal && selectedImg !== null && (
        <div id="grayLayer" onClick={closeModal}>
          <div id="overLayer">
            <img src={`/images/photo${selectedImg + 1}.jpg`} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
