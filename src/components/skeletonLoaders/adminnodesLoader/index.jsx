import React from "react";
import "./index.css";
import Skeleton from "react-loading-skeleton";
const AdminNodeLoader = ({skeletonCount}) => {

  return (
    <div className="admin_nodes_skeleton_loader">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Skeleton className="admin_node_loader" key={index} />
      ))}
    </div>
  );
};

export default AdminNodeLoader;
