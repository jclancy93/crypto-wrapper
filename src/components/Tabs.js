import React, { useState } from "react";
import classnames from "classnames";

const baseClassNames =
  "w-1/2 py-4 px-1 text-center border-b-2 font-medium text-md";

const Tab = ({ selected, children, onClick }) => {
  const tabsStyle = classnames(baseClassNames, {
    "border-white-200": selected,
    "text-gray-200": selected,
    "border-transparent": !selected,
    "text-gray-500": !selected,
    "hover:text-indigo-500": !selected,
    "hover:border-indigo-500": !selected,
  });

  return (
    <a href="#" className={tabsStyle} onClick={onClick}>
      {children}
    </a>
  );
};

export const Tabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-11/12 mx-auto bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 py-3 px-4 mt-4 mb-2 rounded-md text-white"
          onChange={(e) => setSelectedTab(e.target.value.toLowerCase())}
        >
          <option selected={selectedTab === "wrap"} className="py-2">
            Wrap
          </option>
          <option selected={selectedTab === "unwrap"} className="py-2">
            Unwrap
          </option>
        </select>
      </div>
      <div className="hidden sm:block mb-6 w-full">
        <div className="border-b border-gray-900">
          <nav className="-mb-px flex" aria-label="Tabs">
            <Tab
              selected={selectedTab === "wrap"}
              onClick={() => setSelectedTab("wrap")}
            >
              Wrap
            </Tab>
            <Tab
              selected={selectedTab === "unwrap"}
              onClick={() => setSelectedTab("unwrap")}
            >
              Unwrap
            </Tab>
          </nav>
        </div>
      </div>
    </div>
  );
};
