import { useEffect, useState } from "react";
import Button from "./Button";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

const DropDown=({ optionState, options,disabled })=> {
    const [ option, setOption ] = optionState
    const [hideDropMenu, setHideDropMenu] = useState(true);

    const selectOption = (selectedOption) => {
      setOption(selectedOption);
      setHideDropMenu(true);
    };

    useEffect(() => {
      const handleClick = () => setHideDropMenu(true);
      window.addEventListener("click", handleClick, true);
  
      return () => {
        window.removeEventListener("click", handleClick, true);
      };
    }, []);

  return (
    <div className={"relative min-w-28 z-20"}>
      <span className="relative">
        <div className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer rounded-full"></div>
        <Button
          onClick={() => disabled?{}:setHideDropMenu(!hideDropMenu)}
          className={"relative z-10 w-full justify-between gap-1 " + clsx({ "pointer-events-none" : !hideDropMenu })}
          type="button"
          theme={!disabled?"transparent":"default"}
        >
          {option} <ChevronDown size={24}/>
        </Button>
      </span>

      <div
        hidden={hideDropMenu}
        className="w-full mt-2 absolute border rounded-lg border-white/5 text-sm z-10 shadow overflow-hidden backdrop-blur-md bg-white/5"
      >
        {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => selectOption(option)}

              className="block px-4 py-2 w-full hover:bg-gray-100/10 text-white"
            >
              {option}
            </button>
        ))}
      </div>
    </div>
  );
}

export default DropDown