// A client component
"use client";

/* Custom Components */
import { Input } from "@/components/ui/input";

/* Server Actions */
import { searchAddressAction } from "@/actions/search-actions";
import { GeoJSON } from "ol/format";

/**
 * Component Interface.
 */
interface ISearchBar {
  onSearchPlace: (places: GeoJSON[] | []) => void;
}

/**
 * Component Body.
 */
const SearchBar: React.FC<ISearchBar> = (props) => {
  const { onSearchPlace } = props;

  async function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const place = e.target.value;
    const result = await searchAddressAction(place);
    onSearchPlace(result);
  }

  return (
    <Input
      type="text"
      placeholder="Input place name"
      onChange={onChangeHandler}
    />
  );
};

export default SearchBar;
