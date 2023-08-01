import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAdminStore } from "../../stores/admin-store";
import { useMutation } from "react-query";
import * as api from "../../api";
import LoadingCircle from "../common/LoadingCircle";

const CreateAssetDialog = () => {
  const { collection } = useAdminStore();
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate, isLoading } = useMutation(
    "asset",
    () => {
      if (!collection) {
        throw new Error(`Collection cannot be empty`);
      }
      return api.createAsset(collection, {
        asset_id: "mock",
        input_format: "url",
        data: data,
        metadata: {},
      });
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
        <Button variant="outline">Add Asset</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new asset</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex flex-row items-center space-x-4 py-6">
            <Label htmlFor="name" className="text-right">
              URL
            </Label>
            <Input
              id="name"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => mutate()}>
              {isLoading && <LoadingCircle />} Save
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssetDialog;
