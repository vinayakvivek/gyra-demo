import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { useQuery } from "react-query";
import * as api from "../api";

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
        <ScrollArea className="flex-1 overflow-hidden">
          <div className="flex flex-col space-y-3">
            {data.map((item) => (
              <Card
                key={item.collection_name}
                className="hover:bg-accent hover:cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="text-xl">
                    {item.collection_name}
                  </CardTitle>
                  <CardDescription>{item.created_time}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
});

export default CollectionList;
