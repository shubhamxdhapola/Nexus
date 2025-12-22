import { useDispatch, useSelector } from "react-redux";
import { deleteLink } from "../redux/slices/link.slice.js";
import toast from "react-hot-toast";
import { Loader2, X } from "lucide-react";

const DeleteConfirmationDialog = ({
  deleteLinkId,
  setDeleteLinkId,
  setIsDialogOpen,
}) => {
  const { deletingLink } = useSelector((state) => state.link);
  const dispatch = useDispatch();

  const handleCancelDelete = () => {
    setDeleteLinkId(null);
    setIsDialogOpen(false);
  };

  const handleDeleteLink = () => {
    dispatch(deleteLink(deleteLinkId))
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        handleCancelDelete();
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
      <h1 className="text-lg text-base-content font-semibold">
        Are you absolutely sure?
      </h1>
      <p className="text-sm text-base-content/70 mt-3">
        This action cannot be undone. This will permanently delete your link
        from our sever.
      </p>
      <div className="mt-6 flex justify-end items-center gap-4">
        <button className="btn w-fit" onClick={handleCancelDelete}>
          Cancel
        </button>
        <button
          className={`btn btn-primary w-fit ${
            deletingLink && "btn-disabled cursor-not-allowed"
          }`}
          disabled={deletingLink}
          onClick={handleDeleteLink}
        >
          {deletingLink ? (
            <>
              {" "}
              <Loader2 className="animate-spin" />
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
