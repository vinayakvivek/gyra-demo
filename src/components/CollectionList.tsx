import { Card, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { useMutation, useQuery } from "react-query";
import * as api from "../api";
import { Collection } from "@/types";
import LoadingCircle from "./common/LoadingCircle";
import { useChatStore } from "../stores/chat-store";

const ListItem = (item: Collection) => {
  const { setCollection, setConversation, collection } = useChatStore();

  const createConvoQuery = useMutation({ mutationFn: api.createConversation });
  const handleClick = () => {
    createConvoQuery.mutate(
      {
        collection_name: item.collection_name,
        conversation_name: "test",
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
    <Card
      className={cn("hover:bg-accent hover:cursor-pointer", {
        "border-foreground": item.collection_name === collection,
      })}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row justify-between">
        <span className="text-xl font-bold">{item.collection_name}</span>
        {createConvoQuery.isLoading && <LoadingCircle />}
      </CardHeader>
    </Card>
  );
};

const CollectionList = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isLoading, error, data } = useQuery(
    "collections",
    api.getCollections
  );

  return (
    <div ref={ref} className={cn("h-full flex flex-col", className)} {...props}>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Collections
      </h2>
      <div className="h-3" />
      {isLoading && <p>Loading...</p>}
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
