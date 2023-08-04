import CollectionSelector from "../components/CollectionSelector";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";
import H2 from "../components/common/H2";
import { useChatStore } from "../stores/chat-store";
import { useMutation } from "react-query";
import * as api from "../api";
import { useCallback } from "react";
import LoadingCircle from "../components/common/LoadingCircle";

const HomePage = () => {
  const { conversationId, setConversation, setCollection } = useChatStore();

  const { mutate, isLoading } = useMutation({
    mutationFn: api.createConversation,
  });
  const handleClick = useCallback(
    (collection: string) => {
      mutate(
        {
          collection_name: collection,
          conversation_name: "test",
        },
        {
          onSuccess: (conversation) => {
            setCollection(collection);
            setConversation(conversation.conversation_id);
          },
          onError: (err) => {
            console.error(err);
          },
        }
      );
    },
    [mutate, setCollection, setConversation]
  );

  return (
    <div className="h-screen flex flex-col">
      <Navbar className="px-16" />
      <main className="flex items-stretch grow bg-background py-8 px-16 overflow-y-auto">
        <div className="flex flex-row w-full overflow-y-auto space-x-16">
          <div className="flex flex-col space-y-4">
            <CollectionSelector onSelect={handleClick} />
            {isLoading && <LoadingCircle />}
          </div>
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
