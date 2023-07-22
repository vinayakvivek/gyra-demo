import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { faker } from "@faker-js/faker";
import { ScrollArea } from "./ui/scroll-area";

const getCollections = () => {
  const collections = [];
  for (let i = 0; i < 12; ++i) {
    collections.push({
      id: i,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    });
  }
  return collections;
};

const CollectionList = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Collections
      </h2>
      <div className="h-3" />
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="flex flex-col space-y-3">
          {getCollections().map((item) => (
            <Card
              key={item.id}
              className="hover:bg-accent hover:cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CollectionList;
