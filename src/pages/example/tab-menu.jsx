import React, { useState } from "react";
import "../../styles/example/tab-menu.css";

export default function TabMenu() {
  const tabMenuItems = ["JavaScript", "CSS", "HTML", "jQuery", "XHTML"];
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <div id="wrap">
      <ul id="tabmenu_list">
        {tabMenuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleTabClick(index)}
            className={selectedTab === index ? "selected" : ""}
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ul id="panel_list">
        <li style={{ display: selectedTab === 0 ? "block" : "none" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          congue elit eu mauris sollicitudin dictum. Phasellus nec felis ut arcu
          placerat tincidunt. Vestibulum luctus mauris ac ante molestie
          eleifend. Quisque dapibus nulla ac purus volutpat posuere a quis nisl.
          Nam condimentum purus vitae nibh feugiat imperdiet. Cras purus mi,
          egestas vitae imperdiet volutpat, suscipit nec odio. Maecenas
          elementum aliquam metus nec ultrices. Suspendisse potenti. Praesent
          lobortis gravida massa in volutpat. Nunc id mauris id orci congue
          malesuada. Aliquam vel mauris risus, sit amet laoreet sapien. Maecenas
          varius gravida purus vel pharetra. Sed quis leo id mi laoreet
          accumsan. Vestibulum ac mauris purus, nec rutrum sem. Sed euismod
          magna a lacus consectetur in mattis quam suscipit. Phasellus nec enim
          libero. Donec sit amet justo diam. In hac habitasse platea dictumst.
          Sed nibh libero, iaculis eget aliquet eu, rhoncus nec ligula.
        </li>
        <li style={{ display: selectedTab === 1 ? "block" : "none" }}>
          Nam cursus molestie erat, a sodales erat sollicitudin ut. Maecenas nec
          urna mi, eu congue turpis. Duis vitae volutpat lorem. Ut vulputate
          tempor elit, vitae iaculis elit sollicitudin at. Ut gravida fermentum
          tempor. Mauris metus ante, volutpat et porta a, malesuada vel purus.
          In lobortis ullamcorper lorem eu malesuada. Nullam sollicitudin, urna
          eu euismod suscipit, eros sapien adipiscing arcu, sit amet ultricies
          lacus elit sed urna. Nam scelerisque, nulla eu mollis elementum, ipsum
          tortor ullamcorper felis, eget laoreet diam turpis dignissim metus. In
          eget lectus sit amet mi pretium pellentesque varius vitae augue.
          Integer mattis, elit nec adipiscing rhoncus, elit tellus congue
          sapien, et auctor mi nisi in purus. Curabitur commodo, neque sed
          ornare porta, purus magna rhoncus eros, quis consectetur ipsum erat ac
          mi. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Fusce sed turpis tortor, quis euismod enim.
          Integer faucibus venenatis egestas. Etiam eu metus et sem bibendum
          fermentum. Sed dui ante, sollicitudin at tincidunt at, pretium sit
          amet diam. Nunc porttitor tristique est sed pulvinar. Fusce eu ligula
          vitae orci venenatis sagittis sed quis ipsum.
        </li>
        <li style={{ display: selectedTab === 2 ? "block" : "none" }}>
          Pellentesque in metus leo. Praesent porta, dolor nec mattis
          ullamcorper, velit purus mollis enim, nec tincidunt magna massa ornare
          elit. In ipsum enim, pellentesque vitae gravida ultrices, aliquet nec
          ante. Mauris sed nunc ut ligula dictum convallis vel et nunc. Aenean
          eget enim vitae nulla lacinia consequat. Quisque blandit, ante vel
          sodales sollicitudin, neque ante elementum leo, ut consequat dui risus
          ut purus. Vestibulum viverra lacus at felis dignissim bibendum.
          Maecenas interdum nisl eu metus porta luctus. Suspendisse nulla neque,
          ultricies nec facilisis nec, mollis id sapien. Donec nec quam et felis
          pulvinar fringilla a non orci. Maecenas tincidunt magna a sem faucibus
          eu interdum magna aliquam. Suspendisse a diam lorem, nec malesuada
          sapien. Nam a scelerisque velit. Integer commodo malesuada odio, sit
          amet rutrum ante viverra ut. In egestas, arcu id pretium tempus,
          ligula nibh interdum enim, non bibendum velit felis sed augue. Cum
          sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Praesent augue eros, posuere pharetra pharetra eu,
          feugiat eu velit.
        </li>
        <li style={{ display: selectedTab === 3 ? "block" : "none" }}>
          Vestibulum a quam scelerisque odio ultricies mollis eget a leo. Morbi
          dictum, velit lobortis hendrerit tincidunt, lacus nisl rhoncus felis,
          commodo sollicitudin magna augue non est. Nunc in felis quis purus
          dignissim blandit vel ut erat. In hac habitasse platea dictumst.
          Nullam euismod auctor rhoncus. Proin et sem ac neque placerat
          vulputate. Nullam consequat purus eget libero posuere pulvinar. Aenean
          luctus luctus leo nec vehicula. Praesent eleifend nibh sed neque
          vestibulum hendrerit. Nulla suscipit vehicula sem, quis congue ligula
          gravida vel. Aliquam risus urna, pretium eget porttitor hendrerit,
          gravida at libero. Curabitur nec luctus risus. Etiam ullamcorper
          fringilla nisl hendrerit convallis. Duis in nibh tellus. Donec porta
          nibh id purus mollis sodales. Nam eget libero vel metus congue
          ultricies ut vitae nibh. Sed ac justo ac eros luctus ullamcorper ut
          tincidunt nibh. Fusce dapibus bibendum urna, id tempor turpis sodales
          sed. Nam dui purus, posuere vel placerat eu, posuere non magna.
        </li>
        <li style={{ display: selectedTab === 4 ? "block" : "none" }}>
          Vestibulum consequat consequat aliquet. Aenean ut nunc dolor, vel
          dictum mauris. Proin neque eros, tincidunt at faucibus a, dapibus sit
          amet tellus. Etiam rutrum pharetra risus porta ullamcorper. Nunc
          convallis orci at massa suscipit porta. Sed interdum suscipit dui, eu
          sodales odio fermentum vitae. Nunc vitae dui metus, a laoreet ante.
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. Sed eu mauris mi, non blandit
          tortor. Ut fringilla cursus justo id porta. Sed in nibh nulla. Aenean
          consectetur arcu vel eros facilisis ac luctus lectus placerat. Fusce
          risus dui, adipiscing ut tempus non, malesuada quis velit.
        </li>
      </ul>
    </div>
  );
}
