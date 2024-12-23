// A client component
"use client";

/* Custom Components */
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* Server Actions */
import { searchAddressAction } from "@/actions/search-actions";

import { AddressPointFeatureCollection } from "@/types/Geojson/Geojson";

/**
 * Component Body.
 */
const SearchBar = () => {
  const [addresses, setAddresses] = useState<AddressPointFeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  async function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const place = e.target.value;
    const result = await searchAddressAction(place);
    console.log(result);
    setAddresses(result);
    // onSearchPlace(result);
  }

  return (
    <div className="bg-slate-100">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? addresses.features.find(
                  (address) => address.properties.name.toString() === value
                )?.properties.name
              : "Go to"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Select for place..."
              className="h-9"
              onChangeCapture={onChangeHandler}
            />
            <CommandList>
              <CommandEmpty>Nothing to show</CommandEmpty>
              <CommandGroup>
                {addresses.features.map((address) => (
                  <CommandItem
                    key={address.properties.place_id}
                    value={address.properties.place_id.toString()}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {address.properties.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === address.properties.place_id.toString()
                          ? "opacity-100"
                          : "opacity-50"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
