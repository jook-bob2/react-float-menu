/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const sidebarRef = useRef(); // 사이드바 엘레먼트를 담고 있는 레퍼런스
  const location = useLocation();

  /**
   * @desc 사이드바 여부에 따른 애니메이션 동작
   */
  useEffect(() => {
    // 렌더링 완료 후 동작
    if (isMenuOpen) {
      gsap.to(sidebarRef.current, {
        x: "0%",
        duration: 0.5,
        display: "block",
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.5,
        display: "none",
      });
    }
  }, [isMenuOpen]);

  /**
   * @desc 바깥 영역 클릭 시 사이드바 닫음
   */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  /**
   * @desc 사이드바 열고/닫기
   */
  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen); // 사이드바 토글
  };

  /**
   * @desc 사이드바 닫으면서 메뉴목록도 초기화 시킴.
   */
  const closeSidebar = () => {
    const allUlElements = document.querySelectorAll(".sub"); // Get all the ul elements
    const sidebarElement = sidebarRef.current; // Get the sidebar element

    // 모든 서브메뉴를 닫음
    allUlElements.forEach((ulElement) => {
      gsap.to(ulElement, {
        opacity: 0,
        maxHeight: 0,
        duration: 0.5,
        ease: "power2.easeOut",
        onComplete: () => {
          ulElement.style.display = "none";
        },
      });
    });

    // 사이드바를 닫음
    gsap.to(sidebarElement, {
      x: "-100%",
      duration: 0.5,
      ease: "power2.easeOut",
      onComplete: () => {
        sidebarElement.style.display = "none";
        setActiveIdx(null);
        setIsMenuOpen(false);
      },
    });
  };

  /**
   * @desc 서브메뉴 펼치기/접기
   */
  const toggleAccordion = (e, index) => {
    e.stopPropagation();

    if (activeIdx === index) {
      setActiveIdx(null);
      closeSubMenu();
    } else {
      setActiveIdx(index);
      openSubMenu(index);
    }
  };

  /**
   * @desc 서브메뉴를 오픈하는 함수
   * @param {*} index
   */
  const openSubMenu = (index) => {
    // 서브메뉴
    const ulElement = document.getElementById(`sub_${index}`);
    // 서브메뉴가 아닌 엘레먼트
    const otherUlElements = document.querySelectorAll(
      `.sub:not(#sub_${index})`
    );

    // 서브메뉴가 아닌 엘레먼트들을 닫음.
    otherUlElements.forEach((ele) => {
      gsap.to(ele, {
        opacity: 0,
        maxHeight: 0,
        duration: 0.5,
        ease: "power2.easeOut",
        onComplete: () => {
          ele.style.display = "none";
        },
      });
    });

    // 선택 된 서브메뉴를 오픈함.
    gsap.set(ulElement, { display: "block" });
    gsap.to(ulElement, {
      opacity: 1,
      maxHeight: ulElement.scrollHeight + "px", // Set the maxHeight to the actual scrollHeight
      duration: 0.5,
      ease: "power2.easeInOut",
    });
  };

  /**
   * @desc 같은 서브메뉴 선택 시 서브메뉴를 닫는 함수
   */
  const closeSubMenu = () => {
    if (activeIdx !== null) {
      const ulElement = document.getElementById(`sub_${activeIdx}`);
      gsap.to(ulElement, {
        opacity: 0,
        maxHeight: 0,
        duration: 0.5,
        ease: "power2.easeOut",
        onComplete: () => {
          ulElement.style.display = "none";
          setActiveIdx(null);
        },
      });
    }
  };

  return (
    <header className="header">
      <div className="menu">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size={"2xl"} />
        </button>
        <div className={`menu-content`} ref={sidebarRef}>
          <div className="menu-header">
            <span>Menu List</span>
            <button className="menu-btn close" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faClose} size={"2xl"} />
            </button>
          </div>
          <nav>
            <ul className="menu-list">
              <li>
                <Link className="parent" to={"/"}>
                  <div>
                    <span>Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <button
                  className="parent"
                  onClick={(e) => toggleAccordion(e, 1)}
                >
                  <span>About</span>
                  <FontAwesomeIcon
                    icon={activeIdx === 1 ? faMinus : faPlus}
                    size={"sm"}
                  />
                </button>
                <ul className="sub" id={`sub_1`}>
                  <li>
                    <Link to={"/about/intro"}>Intro</Link>
                  </li>
                  <li>
                    <Link to={"/about/privacy"}>Privacy</Link>
                  </li>
                  <li>
                    <Link to={"/about/terms"}>Terms</Link>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  className="parent"
                  onClick={(e) => toggleAccordion(e, 2)}
                >
                  <span>More</span>
                  <FontAwesomeIcon
                    icon={activeIdx === 2 ? faMinus : faPlus}
                    size={"sm"}
                  />
                </button>
                <ul className="sub" id={`sub_2`}>
                  <li>
                    <Link to={"/more/new"}>신상</Link>
                  </li>
                  <li>
                    <Link to={"/more/popular"}>인기</Link>
                  </li>
                  <li>
                    <Link to={"/more/top"}>상의</Link>
                  </li>
                  <li>
                    <Link to={"/more/outer"}>아우터</Link>
                  </li>
                  <li>
                    <Link to={"/more/pants"}>바지</Link>
                  </li>
                  <li>
                    <Link to={"/more/shoes"}>신발</Link>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  className="parent"
                  onClick={(e) => toggleAccordion(e, 3)}
                >
                  <span>Example</span>
                  <FontAwesomeIcon
                    icon={activeIdx === 3 ? faMinus : faPlus}
                    size={"sm"}
                  />
                </button>
                <ul className="sub" id={`sub_3`}>
                  <li>
                    <Link to={"/example/tab-menu"}>탭메뉴</Link>
                  </li>
                  <li>
                    <Link to={"/example/modal-window"}>모달윈도우</Link>
                  </li>
                  <li>
                    <Link to={"/example/img-gallery"}>이미지갤러리</Link>
                  </li>
                  <li>
                    <Link to={"/example/visual-slide-index-rwd"}>
                      비쥬얼슬라이드
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
