import CollectionList from "./components/CollectionList";

function App() {
  return (
    <div className="flex flex-row items-center justify-center bg-background h-screen">
      <div className="h-full basis-1/3 p-12">
        <CollectionList />
      </div>
      <div className="h-full basis-2/3 bg-green-200"></div>
    </div>
  );
}

export default App;
