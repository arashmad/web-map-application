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
import { features } from "process";

/**
 * Component Body.
 */
const SearchBar = () => {
  const [addressList, setAddressList] = useState<
    { label: string; value: string }[]
  >([{ label: "", value: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  async function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    const place = e.target.value;
    const result = await searchAddressAction(place);
    const addresses = [
      ...new Map(
        result.features.map((item) => [item.properties.osm_id, item])
      ).values(),
    ].map((address) => {
      return {
        label: address.properties.name,
        value: address.properties.osm_id.toString(),
      };
    });
    console.log(addresses);
    setAddressList(addresses);
    setIsLoading(false);
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
              ? addressList.find((address) => address.value === value)?.label
              : "Search for place"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Select for place..."
              className="h-9"
              onChangeCapture={onChangeHandler}
            />
            <CommandList>
              {/* <CommandEmpty>Nothing to show</CommandEmpty> */}
              <CommandGroup>
                {!isLoading ? (
                  addressList.map((address) => (
                    <CommandItem
                      key={address.value}
                      value={address.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === address.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {address.label}
                    </CommandItem>
                  ))
                ) : (
                  <>Loading</>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
