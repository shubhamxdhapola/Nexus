import { Settings } from "lucide-react";
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import ProfileUpdateForm from "../forms/ProfileUpdateForm";
import Modal from "../Modal";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <div className="card bg-base-200 md:p-1 border-base-content/10 border-[0.5px]">
        <div className="card-body flex justify-between items-center flex-row relative">
          <div className="flex justify-center items-center gap-6">
            {user?.profilePic ? (
              <div className="relative ring-primary ring-offset-base-100 w-20 md:w-21 rounded-full ring-2 ring-offset-3 flex items-center justify-center">
                <img
                  src={user?.profilePic}
                  alt="profile-photo"
                  className="w-20 h-20 md:w-21 md:h-21 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="avatar relative">
                <div className="ring-primary bg-base-100 ring-offset-base-100 w-20 md:w-21 rounded-full ring-2 ring-offset-3 flex items-center justify-center">
                  <LuUser className="text-2xl text-base-content" />
                </div>
              </div>
            )}
            <div>
              <div className="font-medium mb-1 text-lg text-base-content">
                {user?.name}
              </div>
              <div className="text-sm text-base-content/60 mb-2">
                @{user?.username}
              </div>
              <div className="text-sm text-base-content/80">
                {user?.bio || "No bio"}
              </div>
            </div>
          </div>
          <button
            className="self-start cursor-pointer group absolute right-3 top-3 tooltip"
            data-tip="Setting"
            onClick={() => setIsDialogOpen(true)}
          >
            <Settings className="text-base-content/80 size-4 md:size-5 group-hover:text-base-content" />
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <Modal>
          <ProfileUpdateForm setIsDialogOpen={setIsDialogOpen} />
        </Modal>
      )}
    </>
  );
};

export default ProfileCard;
