import ChatBox from "./components/ChatBox";
import CollectionList from "./components/CollectionList";
import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="h-screen flex flex-col">
        <nav className="bg bg-accent p-4 px-10">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
            GYRA
          </h1>
        </nav>

        <main className="flex items-stretch grow bg-background p-4 px-10 overflow-y-auto">
          <div className="flex flex-row w-full overflow-y-auto space-x-10">
            <CollectionList className="basis-1/3 pb-2" />
            <ChatBox className="basis-2/3" />
          </div>
        </main>

        <footer className="bg-accent p-2 text-center">
          <span className="text-sm">{`Made with <3 in Bangalore`}</span>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
