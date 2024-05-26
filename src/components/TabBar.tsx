"use client";

import { setCookie } from "cookies-next";
import { useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  tabOption?: number[];
  currentTab?: number;
}

export const TabBar = ({ tabOption = [1, 2, 3, 4], currentTab = 1 }: Props) => {
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div
      className={`grid w-full rounded-xl bg-green-200 p-2 grid-cols-${tabOption.length}`}
    >
      {tabOption.map((tab) => (
        <div key={tab} className="m-0">
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
