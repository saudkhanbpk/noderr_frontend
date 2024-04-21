import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import PageHeader from "../../../../components/dashboard/pageHeader/pageHeader";
import Node from "../../../../components/dashboard/node";
import { allNodeData } from "../../../../data/nodeData";
import { createApiContext } from "../../../../context/apiContext";
import AdminNodeLoader from "../../../../components/skeletonLoaders/adminnodesLoader";
import { toast } from "react-toastify";
import UpdateNode from "../../../../components/dashboard/updateNode";
import { images } from "../../../../images";
const AllNodes = () => {
  const { getAllNodes, deleteNode } = useContext(createApiContext);
  const [loadding, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await getAllNodes();
        setNodes(response?.data?.nodes);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching nodes", error);
        toast.error(error.response.data.message);
      }
    };
    fetchNodes();
  }, []);
  const handleDeleteNode = async (id) => {
    setLoading(true);

    const data = await deleteNode(id);
    if (data?.status) {
      toast.success("Node deleted successfully");
      const response = await getAllNodes();
      setNodes(response);
      setLoading(false);
    } else if (data.response.data.message) {
      console.log("else");
      setLoading(false);
      toast.error(data.response.data.message);
    }
    // Node deleted successfully, refetch nodes
  };
  const skeletonCount = Math.floor(window.innerHeight / 100);
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleCloseNodeDetail = () => {
    setSelectedNode(null);
  };

  return (
    <div className="right_dashboard">
      <div className="right_container">
        <PageHeader
          page_title={"All Nodes"}
          badge={"GM, Noderr"}
          profilePic={images.FakePic}
          create={true}
          link={"/dashboard/create-node"}
        />
        {loadding ? (
          <AdminNodeLoader skeletonCount={skeletonCount} />
        ) : (
          <div className="all_nodes">
            {nodes?.length > 0 ? (
              nodes &&
              nodes
                .slice()
                .reverse()
                ?.map((node, index) => {
                  return (
                    <Node
                      key={index}
                      node={node}
                      onDelete={() => handleDeleteNode(node._id)}
                      onClick={() => handleNodeClick(node)}
                    />
                  );
                })
            ) : (
              <h1>No Node Found</h1>
            )}
          </div>
        )}
      </div>
      {selectedNode && (
        <UpdateNode
          node={selectedNode}
          onClose={handleCloseNodeDetail}
          setNodes={setNodes}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default AllNodes;
