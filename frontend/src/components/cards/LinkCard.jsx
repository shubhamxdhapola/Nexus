import { Calendar, Copy, EditIcon, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LinkCard = ({
  link,
  setEditLinkId,
  setDeleteLinkId,
  setIsEditLinkDialogOpen,
  setIsDeleteLinkDialogOpen,
}) => {
  const handleEdit = (id) => {
    console.log(id);
    setEditLinkId(id);
    setIsEditLinkDialogOpen(true);
  };
  const handleDelete = (id) => {
    setDeleteLinkId(id);
    setIsDeleteLinkDialogOpen(true);
  };
  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  return (
    <div className="card bg-base-200 py-4 px-5 border-base-content/10 border-[0.5px]">
      <h2>{link.title}</h2>
      <Link
        to={link?.url}
        target="_blank"
        className="text-base-content/70 text-sm mt-1 hover:underline duration-300 truncate"
      >
        {link.url}
      </Link>
      <div className="flex justify-between mt-4 sm:mt-6">
        <button
          className="flex justify-center items-center gap-2 text-base-content/80 text-sm cursor-pointer hover:text-base-content duration-300"
          onClick={() => handleEdit(link._id)}
        >
          <EditIcon className="size-4" />
          <span>Edit</span>
        </button>
        <button
          className="flex justify-center items-center gap-2 text-base-content/80 text-sm cursor-pointer hover:text-base-content duration-300"
          onClick={() => handleDelete(link._id)}
        >
          <Trash2 className="size-4" />
          <span>Delete</span>
        </button>
        <button
          className="flex justify-center items-center gap-2 text-base-content/80 text-sm cursor-pointer hover:text-base-content duration-300"
          onClick={() => handleCopy(link?.url)}
        >
          <Copy className="size-4" />
          <span>Copy</span>
        </button>
        <button className="justify-center items-center gap-2 text-base-content/80 text-sm cursor-pointer hover:text-base-content duration-300 tooltip hidden sm:flex" data-tip="Created On">
          <Calendar className="size-4" />
          <span>{dayjs(link?.createdAt).format("DD MMM YYYY")}</span>
        </button>
      </div>
    </div>
  );
};

export default LinkCard;
