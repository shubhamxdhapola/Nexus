import { Globe, Link, Loader2, X } from "lucide-react";
import { useState } from "react";
import Input from "../input/Input";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addLink, updateLink } from "../../redux/slices/link.slice";

const LinkForm = ({
  heading,
  subheading,
  btnText,
  setIsDialogOpen,
  editLinkId,
  setEditLinkId,
}) => {
  const { allLinks, savingLink } = useSelector((state) => state.link);
  const link = allLinks.find((link) => link._id === editLinkId);

  const defaultFormData = {
    title: link?.title || "",
    url: link?.url || "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return toast.error("Platform name is required");
    if (!formData.url.trim()) return toast.error("Platform url is required");
    editLinkId ? handleUpdateLink() : handleAddLink();
  };

  const handleUpdateLink = () => {
    dispatch(updateLink({ data: formData, id: editLinkId }))
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setFormData(defaultFormData);
        setIsDialogOpen(false);
        setEditLinkId(null);
      })
      .catch((err) => toast.error(err?.message));
  };

  const handleAddLink = () => {
    dispatch(addLink(formData))
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setFormData(defaultFormData);
        setIsDialogOpen(false);
      })
      .catch((err) => toast.error(err?.message));
  };

  return (
    <div className="shadow-sm border-[0.5px] rounded-box border-base-content/10 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100 p-4 md:p-6 max-h-[95vh]">
      <button
        className="absolute right-3 top-3 text-base-content/70 cursor-pointer hover:text-base-content duration-300 tooltip"
        data-tip="Close"
        onClick={() => setIsDialogOpen(false)}
      >
        <X className="size-5" />
      </button>
      <h1 className="text-lg text-base-content font-semibold">{heading}</h1>
      <p className="text-sm text-base-content/70">{subheading}</p>
      <form onSubmit={handleOnSubmit}>
        <div className="mt-8 space-y-5">
          <Input
            type="text"
            placeholder="Enter platform name"
            value={formData?.title}
            Icon={Globe}
            onChange={handleOnChange}
            label="Platform Name"
            name="title"
          />
          <Input
            type="text"
            placeholder="Enter platform url"
            value={formData?.url}
            Icon={Link}
            onChange={handleOnChange}
            label="Platform URL"
            name="url"
          />
          <button
            className={`btn btn-primary w-full mt-2 ${
              savingLink && "btn-disabled cursor-not-allowed"
            }`}
            disabled={savingLink}
          >
            {savingLink ? (
              <>
                {" "}
                <Loader2 className="animate-spin" /> Saving
              </>
            ) : (
              btnText
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;
