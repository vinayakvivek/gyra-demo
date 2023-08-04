import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useAdminStore } from "../../stores/admin-store";
import { useMutation } from "react-query";
import * as api from "../../api";
import LoadingCircle from "../common/LoadingCircle";
import { Trash2Icon } from "lucide-react";

type Props = {
  assetId: string;
};

const DeleteAssetDialog = ({ assetId }: Props) => {
  const { collection } = useAdminStore();
  const [open, setOpen] = useState(false);

  const { mutate, isLoading } = useMutation(
    "asset-delete",
    () => {
      if (!collection) {
        throw new Error(`Collection cannot be null`);
      }
      return api.deleteAsset(collection, assetId);
    },
    {
      onSuccess: () => {
        setOpen(false);
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Asset?</DialogTitle>
          <DialogDescription></DialogDescription>
          <DialogFooter>
            <Button
              type="submit"
              variant="destructive"
              onClick={() => mutate()}
              disabled={isLoading}
            >
              {isLoading && <LoadingCircle />} Delete
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAssetDialog;
