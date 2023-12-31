import { ScrollArea } from "./ui/scroll-area";
import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { useMutation } from "react-query";
import * as api from "../api";
import { Collection } from "@/types";
import LoadingCircle from "./common/LoadingCircle";
import { useChatStore } from "../stores/chat-store";
import H2 from "./common/H2";
import { useQueryCollections } from "../hooks/query";
import { v4 as uuidv4 } from "uuid";

const ListItem = (item: Collection) => {
  const { setCollection, setConversation, collection } = useChatStore();

  const createConvoQuery = useMutation({ mutationFn: api.createConversation });
  const handleClick = () => {
    createConvoQuery.mutate(
      {
        collection_name: item.collection_name,
        conversation_name: "convo_" + uuidv4(),
      },
      {
        onSuccess: (conversation) => {
          setCollection(item.collection_name);
          setConversation(conversation.conversation_id);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "hover:bg-accent hover:cursor-pointer flex flex-row justify-between items-center border rounded-lg px-3 py-2",
        {
          "bg-foreground text-background hover:bg-foreground":
            item.collection_name === collection,
        }
      )}
      onClick={handleClick}
    >
      <span className="text-lg">{item.collection_name}</span>
      {createConvoQuery.isLoading && <LoadingCircle />}
    </div>
  );
};

const CollectionList = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isLoading, error, data } = useQueryCollections();

  return (
    <div ref={ref} className={cn("h-full flex flex-col", className)} {...props}>
      <H2>Collections</H2>
      <div className="h-3" />
      {isLoading && <LoadingCircle />}
      {!!error && <p>Error fetching collections: {`${error}`}</p>}
      {data && (
        <ScrollArea type="scroll" className="flex-1 overflow-hidden">
          <div className="flex flex-col space-y-3">
            {data.map((item) => (
              <ListItem key={item.collection_name} {...item} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
});

export default CollectionList;
