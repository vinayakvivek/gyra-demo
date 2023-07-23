import { QueryClient, QueryClientProvider } from "react-query";
import ChatBox from "./components/ChatBox";
import CollectionList from "./components/CollectionList";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <div className="h-screen flex flex-col">
          <Navbar className="px-16" />
          <main className="flex items-stretch grow bg-background py-8 px-16 overflow-y-auto">
            <div className="flex flex-row w-full overflow-y-auto space-x-16">
              <CollectionList className="basis-1/3 pb-2" />
              <ChatBox className="basis-2/3 py-10" />
            </div>
          </main>

          <footer className="bg-accent p-2 text-center">
            <span className="text-sm">{`Made with <3 in Bangalore`}</span>
          </footer>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
