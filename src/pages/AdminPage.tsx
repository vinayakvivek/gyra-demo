import { useQueryCollections } from "../hooks/query";
import Navbar from "../components/Navbar";
import LoadingCircle from "../components/common/LoadingCircle";
import CollectionSelector from "../components/CollectionSelector";

const AdminPage = () => {
  const { isLoading, data } = useQueryCollections();

  return (
    <div className="h-screen flex flex-col">
      <Navbar className="px-16" />
      <div className="py-8 px-16">
        {isLoading && <LoadingCircle />}
        {data && <CollectionSelector />}
      </div>
    </div>
  );
};

export default AdminPage;
