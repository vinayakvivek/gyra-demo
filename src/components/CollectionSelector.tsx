import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { QUERY_KEY_COLLECTIONS } from "../hooks/query";
import * as api from "../api";
import { useQuery } from "react-query";
import H3 from "./common/H3";

type CollectionSelectorProps = {
  onSelect: (collection: string) => void;
};

const CollectionSelector = ({ onSelect }: CollectionSelectorProps) => {
  const [items, setItems] = useState<string[]>([]);
  useQuery(QUERY_KEY_COLLECTIONS, api.getCollections, {
    onSuccess: (data) => {
      setItems(data.map(({ collection_name }) => collection_name));
    },
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value) {
      onSelect(value);
    }
  }, [value, onSelect]);

  return (
    <div>
      <H3 className="mb-3">Collection</H3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-96 justify-between"
          >
            {value ? value : "Select collection..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0">
          <Command>
            <CommandInput placeholder="Search collections..." />
            <CommandEmpty>No collections found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CollectionSelector;
