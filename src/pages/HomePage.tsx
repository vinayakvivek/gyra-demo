import ChatBox from "../components/ChatBox";
import CollectionList from "../components/CollectionList";
import Navbar from "../components/Navbar";
import H2 from "../components/common/H2";
import { useChatStore } from "../stores/chat-store";

const HomePage = () => {
  const { conversationId } = useChatStore();
  return (
    <div className="h-screen flex flex-col">
      <Navbar className="px-16" />
      <main className="flex items-stretch grow bg-background py-8 px-16 overflow-y-auto">
        <div className="flex flex-row w-full overflow-y-auto space-x-16">
          <CollectionList className="basis-1/3 pb-2" />
          {conversationId && (
            <div className="basis-2/3 flex flex-col">
              <H2>Chat</H2>
              <ChatBox className="grow py-3 overflow-y-auto" />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-accent p-2 text-center">
        <span className="text-sm">{`Made with <3 in Bangalore`}</span>
      </footer>
    </div>
  );
};

export default HomePage;