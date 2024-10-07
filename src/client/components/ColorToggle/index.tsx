import { Select, Option, useColorScheme } from "@mui/joy";
import { KeyboardArrowDown } from "@mui/icons-material";
import { type ReactElement, useState } from "react";

const ColorToggle = (): ReactElement => {
  const { mode, setMode } = useColorScheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Select
        value={mode}
        variant="soft"
        listboxOpen={open}
        onClick={() => setOpen(!open)}
        indicator={<KeyboardArrowDown />}
        className="absolute right-5 top-5 min-w-[99.1375px]"
        onChange={(_event, newMode) => {
          setMode(newMode);
          setOpen(false);
        }}
      >
        <Option value="system">System</Option>
        <Option value="light">Light</Option>
        <Option value="dark">Dark</Option>
      </Select>
    </>
  );
};

export default ColorToggle;
