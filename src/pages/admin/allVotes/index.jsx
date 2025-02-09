import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../../components/dashboard/pageHeader/pageHeader";
import Vote from "../../../components/dashboard/vote";
import "./index.css";
import { createApiContext } from "../../../context/apiContext";
import PromoLoader from "../../../components/skeletonLoaders/promoLoader";
import { toast } from "react-toastify";
import UpdateVote from "../../../components/dashboard/updateVote";
import ConfirmationModal from "../../confirmModal";
import { images } from "../../../images";


const AllVotes = () => {
  const { getAllPools, deletePool, user, userData } = useContext(createApiContext);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [voteToDelete, setVoteToDelete] = useState(null);

  //handle node click function
  const handleNodeClick = (promoData) => {
    setSelectedPool(promoData);
  };

  //handle close node detail function
  const handleCloseNodeDetail = () => {
    setSelectedPool(null);
  };

  //fetch all promotion codes function
  useEffect(() => {
    const fetchVotes = async () => {
      setLoading(true);
      try {
        const response = await getAllPools();
        setVotes(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching votes", error);
        setLoading(false);
      }
    };
    fetchVotes();
  }, [selectedPool]);

  const handleDeleteVote = async (id) => {
    setLoading(true);
    try {
      const response = await deletePool(id);
      if (response?.status) {
        toast.success("Vote deleted successfully");
        // const response = await getAllPools();
        setVotes((prevVote) => prevVote.filter((f) => f._id !== id));
        setLoading(false);
      } else if (response.response.data.message) {
        setLoading(false);
        console.log("else");
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.log("Error deleting vote", error);
      setLoading(false);
    }
  };

  const skeletonCount = Math.floor(window.innerHeight / 100);

  const handleConfirmDelete = () => {
    if (voteToDelete) {
      handleDeleteVote(voteToDelete);
      setVoteToDelete(null);
      setShowConfirmationModal(false);
    }
  };
  return (
    <div className="right_dashboard">
      <div className="right_container">
        <PageHeader
          page_title={"All Votes"}
          // badge={" GM, Noderr"}
          // badge={userData ? `GM, ${userData.firstName} ${userData.lastName}` : "GM, Noderr"}
          badge={userData && userData.firstName && userData.lastName ? `GM, ${userData.firstName} ${userData.lastName}` : "GM, Noderr"}

          // profilePic={images.FakePic}
          profilePic={userData?.profilePic? `${process.env.REACT_APP_NODE_IMG_URL}${userData.profilePic}` : images.FakePic}

          create={true}
          link={"/dashboard/create-pool"}
        />
        {loading ? (
          <PromoLoader skeletonCount={skeletonCount} />
        ) : (
          <div className="all_votes">
            {votes?.length > 0 ? (
              user &&
              votes

                .slice()

                .reverse()
                .map((vote, index) => (
                  <Vote
                    key={index}
                    voteData={vote}
                    onEdit={() => handleNodeClick(vote)}
                    // onDelete={()=> deleteHnadler(vote._id)}
                    onDelete={() => {
                      setVoteToDelete(vote._id);
                      setShowConfirmationModal(true);
                    }}
                  />
                ))
            ) : (
              <h1>No vote found</h1>
            )}
          </div>
        )}
      </div>
      {
        selectedPool && (
          <UpdateVote
            voteData={selectedPool}
            onClose={handleCloseNodeDetail}
            setLoading={setLoading}
            setVotes={setVotes}
          />
        )
      }
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div >
  );
};

export default AllVotes;
