import ProfileCard from "../components/dashboard/ProfileCard";
import LinkForm from "../components/forms/LinkForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinkCard from "../components/cards/LinkCard";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import Preview from "../components/dashboard/Preview";
import { getAllLinks } from "../redux/slices/link.slice";
import Modal from "../components/Modal";

const Dashboard = () => {
  const { allLinks, fetchingLinks } = useSelector((state) => state.link);
  const { authenticating } = useSelector((state) => state.auth);
  const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false);
  const [isEditLinkDialogOpen, setIsEditLinkDialogOpen] = useState(false);
  const [isDeleteLinkDialogOpen, setIsDeleteLinkDialogOpen] = useState(false);
  const [editLinkId, setEditLinkId] = useState(null);
  const [deleteLinkId, setDeleteLinkId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLinks());
  }, [dispatch]);

  if (authenticating || fetchingLinks) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-10 py-4 min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="px-2 py-2 sm:px-15 md:px-25 lg:px-2 ">
        <ProfileCard />
        <button
          className="btn btn-primary w-full mt-5"
          onClick={() => setIsAddLinkDialogOpen(true)}
        >
          Add New Link
        </button>
        {isAddLinkDialogOpen && (
          <Modal>
            <LinkForm
              heading="Add Your Link"
              subheading="One link for all your important content."
              btnText="Save Link"
              setIsDialogOpen={setIsAddLinkDialogOpen}
            />
          </Modal>
        )}
        {isEditLinkDialogOpen && (
          <Modal>
            <LinkForm
              heading="Update Your Link"
              subheading="Make changes to your existing link details."
              btnText="Update Link"
              setIsDialogOpen={setIsEditLinkDialogOpen}
              editLinkId={editLinkId}
              setEditLinkId={setEditLinkId}
            />
          </Modal>
        )}
        {isDeleteLinkDialogOpen && (
          <Modal>
            <DeleteConfirmationDialog
              deleteLinkId={deleteLinkId}
              setDeleteLinkId={setDeleteLinkId}
              setIsDialogOpen={setIsDeleteLinkDialogOpen}
            />
          </Modal>
        )}

        <div className="mt-8">
          <h2 className="text-lg mb-4 font-semibold text-base-content">
            Your Links
          </h2>
          <div className="space-y-4">
            {allLinks?.length > 0 ? (
              allLinks?.map((link) => (
                <LinkCard
                  key={link._id}
                  link={link}
                  setEditLinkId={setEditLinkId}
                  setDeleteLinkId={setDeleteLinkId}
                  setIsEditLinkDialogOpen={setIsEditLinkDialogOpen}
                  setIsDeleteLinkDialogOpen={setIsDeleteLinkDialogOpen}
                />
              ))
            ) : (
              <div className="flex justify-center mt-10">
                <p className="text-base-content">No links added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-2 md:p-4 fixed left-[50%] w-[50%] lg:inline-flex hidden">
        <Preview />
      </div>
    </div>
  );
};

export default Dashboard;
