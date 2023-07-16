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
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const MENU_LIST = [
  {
    index: 0,
    name: "Home",
    pathname: "/",
    isOpen: false,
    subMenuList: [],
  },
  {
    index: 1,
    name: "About",
    pathname: "",
    isOpen: false,
    subMenuList: [
      {
        index: 0,
        name: "Intro",
        pathname: "/about/intro",
      },
      {
        index: 1,
        name: "Privacy",
        pathname: "/about/privacy",
      },
      {
        index: 2,
        name: "Terms",
        pathname: "/about/terms",
      },
    ],
  },
  {
    index: 2,
    name: "More",
    pathname: "",
    isOpen: false,
    subMenuList: [
      {
        index: 0,
        name: "신상",
        pathname: "/more/new",
      },
      {
        index: 1,
        name: "인기",
        pathname: "/more/popular",
      },
      {
        index: 2,
        name: "상의",
        pathname: "/more/top",
      },
      {
        index: 3,
        name: "아우터",
        pathname: "/more/outer",
      },
      {
        index: 4,
        name: "바지",
        pathname: "/more/pants",
      },
      {
        index: 5,
        name: "신발",
        pathname: "/more/shoes",
      },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuList, setMenuList] = useState([...MENU_LIST]);
  const sidebarRef = useRef(); // 사이드바 엘레먼트를 담고 있는 레퍼런스
  const menuRef = useRef(); // 서브메뉴 엘레먼트를 담고 있는 레퍼런스

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
   * @desc 부모 메뉴 클릭 후 애니메이션 동작
   */
  useEffect(() => {
    const menuEle = menuRef.current;
    const duration = 0.3;

    if (menuEle) {
      const menuItems = Array.from(menuEle.querySelectorAll("li"));
      if (menuItems) {
        gsap.set(menuItems, {
          height: "auto",
          display: "block",
        });
        gsap.from(menuItems, { height: 0, duration, stagger: 0.1 });
      }
    }
  }, [menuList]);

  /**
   * @desc 바깥 영역 클릭 시 사이드바 닫음
   */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /**
   * @desc 사이드바 열고/닫기
   */
  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen); // 사이드바 토글
    setMenuList([...MENU_LIST]); // 메뉴 초기화
  };

  /**
   * @desc 사이드바 닫으면서 메뉴목록도 초기화 시킴.
   */
  const closeSidebar = () => {
    const menuEle = menuRef.current;
    let time = 0;
    if (menuEle) {
      time = 300;
      const menuItems = Array.from(menuEle.querySelectorAll("li"));
      gsap.to(menuItems, {
        height: 0,
        duration: 0.3,
        stagger: 0.1,
        display: "none",
      });
    }

    setTimeout(() => {
      setIsMenuOpen(false);
      setMenuList([...MENU_LIST]);
    }, time);
  };

  /**
   * @desc 서브메뉴 펼치기/접기
   */
  const toggleAccordion = (index) => {
    const menuEle = menuRef.current;
    let time = 0;
    if (menuEle) {
      time = 300;
      const menuItems = Array.from(menuEle.querySelectorAll("li"));
      gsap.to(menuItems, {
        height: 0,
        duration: 0.3,
        stagger: 0.1,
        display: "none",
      });
    }

    setTimeout(() => {
      setMenuList((prevState) =>
        prevState.map((menu) => {
          if (menu.index === index) {
            return { ...menu, isOpen: !menu.isOpen };
          } else {
            return { ...menu, isOpen: false };
          }
        })
      );
    }, time);
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
              {menuList.map((menu) => (
                <li key={menu.index}>
                  {menu.pathname ? (
                    <Link to={menu.pathname}>
                      <div className="parent" onClick={closeSidebar}>
                        <span>{menu.name}</span>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="parent"
                      onClick={() => toggleAccordion(menu.index)}
                    >
                      <span>{menu.name}</span>
                      {menu.subMenuList.length > 0 && (
                        <button>
                          <FontAwesomeIcon
                            icon={menu.isOpen ? faMinus : faPlus}
                            size={"sm"}
                          />
                        </button>
                      )}
                    </div>
                  )}

                  {menu.subMenuList.length > 0 && menu.isOpen && (
                    <ul ref={menuRef}>
                      {menu.subMenuList.map((sub) => (
                        <li key={sub.index}>
                          <Link to={sub.pathname} onClick={closeSidebar}>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
