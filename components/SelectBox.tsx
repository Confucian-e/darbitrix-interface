import { Option } from "@/types";
import { Select } from "antd";
import { Address } from "viem";

/**
 * A custom select box component.
 *
 * @component
 * @param options - The options to be displayed in the select box.
 * @param setSelected - The function to set the selected option(s).
 */
export default function SelectBox({
  options,
  setSelected,
  placeHolder,
}: {
  options: Option[];
  setSelected: React.Dispatch<React.SetStateAction<Address[] | undefined>>;
  placeHolder: string;
}) {
  /**
   * Handles the change event of the select box.
   *
   * @param value - The newly selected option(s).
   */
  const handleChange = (value: Address[]) => {
    setSelected(value);
  };

  return (
    <Select
      mode="multiple"
      className="w-40"
      placeholder={placeHolder}
      onChange={handleChange}
      options={options}
    />
  );
}
