import { useDispatch, useSelector } from "react-redux";
import ProfilePhotoSelector from "../input/ProfilePhotoSelector";
import { useState } from "react";
import { AtSign, Loader2, User, X } from "lucide-react";
import Input from "../input/Input";
import { updateUser } from "../../redux/slices/auth.slice";
import toast from "react-hot-toast";

const ProfileUpdateForm = ({ setIsDialogOpen }) => {

  const { user, loading } = useSelector((state) => state.auth);
  const { uploading } = useSelector((state) => state.upload);
  const dispatch = useDispatch();

  const defaultFormData = {
    name: user?.name || "",
    username: user?.username || "",
    profilePic: user?.profilePic || "",
    bio: user?.bio,
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }
    if (!formData.username.trim()) {
      return toast.error("Username is required");
    }
    dispatch(updateUser(formData))
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setFormData(defaultFormData);
        setIsDialogOpen(false);
      })
      .catch((err) => toast.error(err?.message));
  };

  const [formData, setFormData] = useState(defaultFormData);
  return (
    <div className="shadow-sm border-[0.5px] rounded-box border-base-content/10 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 p-4 md:p-6 max-h-[95vh] overflow-y-scroll scrollbar-hide">
      <button
        className="absolute right-3 top-3 text-base-content/70 cursor-pointer hover:text-base-content duration-300 tooltip tooltip-left"
        data-tip="Close"
        onClick={() => setIsDialogOpen(false)}
      >
        <X className="size-5" />
      </button>
      <h1 className="text-lg text-base-content font-semibold">
        Update Your Profile
      </h1>
      <p className="text-sm text-base-content/70">
        Make changes to your personal information and preferences.
      </p>
      <form onSubmit={handleUpdateProfile}>
        <div className=" mt-10">
          <ProfilePhotoSelector setFormData={setFormData} />
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:items-center gap-5 mt-8">
          <Input
            type="text"
            placeholder="Enter your name"
            value={formData?.name}
            Icon={User}
            onChange={handleOnChange}
            label="Name"
            name="name"
          />
          <Input
            type="text"
            placeholder="Create a username"
            value={formData?.username}
            Icon={AtSign}
            onChange={handleOnChange}
            label="Username"
            name="username"
          />
        </div>
        <div className="mt-5 relative">
          <label className="floating-label">
            <span className="text-[17px]">Bio</span>
            <textarea
              className="textarea rounded-box w-full placeholder:text-base-content/40 focus:outline-base-content/30 focus:outline-offset-2 focus:border-base-content/30 px-4 py-2"
              placeholder="Short and simple bio goes here"
              rows={3}
              maxLength={100}
              value={formData.bio}
              onChange={handleOnChange}
              name="bio"
            ></textarea>
          </label>
          <span
            className={`text-xs ${
              formData.bio.length == 100 ? "text-error" : "text-base-content/40"
            } absolute right-2 bottom-2`}
          >
            {formData.bio.length}/100
          </span>
        </div>
        <button
          className={`btn btn-primary mt-4 w-full ${
            uploading || loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={loading || uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Uploading Image...
            </>
          ) : loading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Updating Profile...
            </>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
