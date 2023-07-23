import gsap from "gsap";
import React, { useEffect, useState } from "react";
import "../../styles/example/img-gallery.css";

export default function ImgGallery() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    showImg(0);
  };

  const imgMenuClick = (index) => {
    imgMenuActivate(index);
    showImg(index);
  };

  const imgMenuActivate = (index) => {
    setSelectedMenu(index);
  };

  const showImg = (index) => {
    const mainImgWrap = document.querySelector("#main");
    const newImg = document.createElement("img");
    newImg.src = `/images/photo${index + 1}.jpg`;

    mainImgWrap.prepend(newImg);

    const lastImage = mainImgWrap.children[1];
    gsap.to(lastImage, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
      onComplete: () => {
        mainImgWrap.removeChild(lastImage);
      },
    });
  };

  return (
    <div id="container">
      <div id="navi">
        <div id="page">
          <ul id="img_list">
            <li
              onClick={() => imgMenuClick(0)}
              className={selectedMenu === 0 ? "selected" : ""}
            >
              <span>
                <img src="/images/photo1_thum.jpg" alt="" />
              </span>
            </li>
            <li
              onClick={() => imgMenuClick(1)}
              className={selectedMenu === 1 ? "selected" : ""}
            >
              <span>
                <img src="/images/photo2_thum.jpg" alt="" />
              </span>
            </li>
            <li
              onClick={() => imgMenuClick(2)}
              className={selectedMenu === 2 ? "selected" : ""}
            >
              <span>
                <img src="/images/photo3_thum.jpg" alt="" />
              </span>
            </li>
            <li
              onClick={() => imgMenuClick(3)}
              className={selectedMenu === 3 ? "selected" : ""}
            >
              <span>
                <img src="/images/photo4_thum.jpg" alt="" />
              </span>
            </li>
            <li
              onClick={() => imgMenuClick(4)}
              className={selectedMenu === 4 ? "selected" : ""}
            >
              <span>
                <img src="/images/photo5_thum.jpg" alt="" />
              </span>
            </li>
            <li
              onClick={() => imgMenuClick(5)}
              className={selectedMenu === 5 ? "selected" : ""}
            >
              <span>
                <img src="/images/photo6_thum.jpg" alt="" />
              </span>
            </li>
            <li
              onClick={() => imgMenuClick(6)}
              className={selectedMenu === 6 ? "selected" : ""}
            >
              <span>
                <img src="/images/photo7_thum.jpg" alt="" />
              </span>
            </li>
            <li
              onClick={() => imgMenuClick(7)}
              className={selectedMenu === 7 ? "selected" : ""}
            >
              <span>
                <img src="/images/photo8_thum.jpg" alt="" />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div id="main">
        <img alt="" />
      </div>
    </div>
  );
}
