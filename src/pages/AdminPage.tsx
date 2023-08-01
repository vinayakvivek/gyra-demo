import { useQueryCollections } from "../hooks/query";
import Navbar from "../components/Navbar";
import LoadingCircle from "../components/common/LoadingCircle";
import CollectionSelector from "../components/CollectionSelector";
import { useAdminStore } from "../stores/admin-store";

const AssetList = () => {
  const { collection } = useAdminStore();
  return collection ? (
    <div>
      <h4 className="text-xl">Assets</h4>
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
