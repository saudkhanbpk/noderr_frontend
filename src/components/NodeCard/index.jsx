import React from "react";
import "./index.css";
const NodeCard = ({ stats_img, bg_color, text, slot, onClick, userData }) => {
  return (
    <div className={`stats_box`} style={{ background: bg_color }} onClick={onClick}>
      <div className="icon_container">
        {/* <img src={stats_img} alt="stats" /> */}
        <img src={`${process.env.REACT_APP_NODE_IMG_URL}${stats_img}`} alt="node" className=" w-20 h-16" />
      </div>
      <div className="stats_digit">
        <p
          className={`${bg_color === "#FFFFFF" ? "text-black " : "text-white font-semibold"}`}
        >{text}</p>
{ userData && userData.role === "admin" &&   <span className={`${bg_color === "#FFFFFF" ? "text-black" : "text-white"}`}
        >slots : {slot}</span>}
      </div>
    </div>
  );
};

export default NodeCard;
