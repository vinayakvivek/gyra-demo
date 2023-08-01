import { useQueryCollections } from "../hooks/query";
import Navbar from "../components/Navbar";
import LoadingCircle from "../components/common/LoadingCircle";
import CollectionSelector from "../components/CollectionSelector";
import { useAdminStore } from "../stores/admin-store";
import { useQuery } from "react-query";
import * as api from "../api";
import { AssetListItem } from "@/types/assets";
import CreateAssetDialog from "../components/admin/CreateAssetDialog";

const AssetItem = ({ asset }: { asset: AssetListItem }) => {
  return (
    <div className="flex flex-row px-4 py-2 border items-center rounded-lg justify-between">
      <div className="flex flex-row space-x-6 items-center">
        <p className="px-2 py-1 border rounded-full w-20 text-center">
          {asset.input_format.toUpperCase()}
        </p>
        <span>{asset.data}</span>
      </div>
      <div>Edit</div>
    </div>
  );
};

const AssetList = () => {
  const { collection } = useAdminStore();
  const { isLoading, data } = useQuery(
    ["assets", collection],
    () => {
      if (!collection) return [];
      return api.getAssets(collection);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  return collection ? (
    <div className="w-[600px]">
      <div className="flex flex-row justify-between items-center mb-2">
        <h4 className="text-xl">Assets</h4>
        <CreateAssetDialog />
      </div>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        data &&
        data.map((item) => <AssetItem key={item.asset_id} asset={item} />)
      )}
    </div>
  ) : (
    <></>
  );
};

const AdminPage = () => {
  const { isLoading, data } = useQueryCollections();

  return (
    <div className="h-screen flex flex-col">
      <Navbar className="px-16" />
      <div className="py-8 px-16">
        {isLoading && <LoadingCircle />}
        {data && (
          <div className="flex flex-col space-y-6">
            <CollectionSelector />
            <AssetList />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
