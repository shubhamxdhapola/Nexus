import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/slices/upload.slice";
import { Loader2 } from "lucide-react";

const ProfilePhotoSelector = ({ setFormData }) => {

  const { user, loading } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(user?.profilePic || null);
  const { uploading } = useSelector((state) => state.upload);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      dispatch(uploadImage(formData))
        .unwrap()
        .then((profileImage) => {
          setProfileImage(profileImage);
          setFormData((prevData) => ({
            ...prevData,
            profilePic: profileImage,
          }));
          toast.success("Image updated successfully");
        })
        .catch((err) => toast.error(err));
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setFormData((prevData) => ({
      ...prevData,
      profilePic: null,
    }));
    toast.success("Image removed successfully");
  };

  return (
    <div className="flex justify-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!profileImage ? (
        <div className="avatar relative">
          <div className="ring-primary bg-primary/80 ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-3 flex items-center justify-center">
            <LuUser className="text-3xl text-base-content" />
          </div>
          <button
            className={`w-7 h-7 flex items-center justify-center bg-primary ring-base-100 ring-2 ${
              uploading || loading
                ? "cursor-not-allowed btn-disabled"
                : "cursor-pointer"
            } text-base-content rounded-full absolute bottom-1 -right-1 duration-300`}
            type="button"
            onClick={onChooseFile}
            disabled={uploading || loading}
          >
            {uploading ? <Loader2 className="animate-spin" /> : <LuUpload />}
          </button>
        </div>
      ) : (
        <div className="relative ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-3 flex items-center justify-center">
          <img
            src={profileImage}
            alt="profile-photo"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button
            className={`w-7 h-7 flex items-center justify-center bg-error ring-base-100 ring-2 ${
              uploading || loading
                ? "cursor-not-allowed btn-disabled"
                : "cursor-pointer"
            } text-base-content rounded-full absolute bottom-1 -right-1 duration-300`}
            type="button"
            onClick={handleRemoveImage}
            disabled={loading}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
