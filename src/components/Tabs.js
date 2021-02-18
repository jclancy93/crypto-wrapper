import React, { useState } from "react";
import classnames from "classnames";

const baseClassNames = "w-1/2 py-4 px-1 text-center border-b-2 font-medium text-md";

const Tab = ({ selected, children, onClick }) => {
  const tabsStyle = classnames(baseClassNames, {
    "border-white-200": selected,
    "text-gray-200": selected,
    "border-transparent": !selected,
    "text-gray-500": !selected,
    "hover:text-indigo-500": !selected,
    "hover:border-indigo-500": !selected,
  })

  return (
    <a href="#" className={tabsStyle} onClick={onClick}>
      {children}
    </a>
  )
}

export const Tabs = ({ selectedTab, setSelectedTab }) => {

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select a tab</label>
        <select id="tabs" name="tabs" className="block w-full bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 text-white">
          <option selected={selectedTab === "wrap"} onClick={() => setSelectedTab("wrap")}>Wrap</option>
          <option selected={selectedTab === "unwrap"} onClick={() => setSelectedTab("unwrap")}>Unwrap</option>
        </select>
      </div>
      <div className="hidden sm:block mb-6 w-full">
        <div className="border-b border-gray-900">
          <nav className="-mb-px flex" aria-label="Tabs">
            <Tab selected={selectedTab === "wrap"} onClick={() => setSelectedTab("wrap")}>
              Wrap
            </Tab>
            <Tab selected={selectedTab === "unwrap"} onClick={() => setSelectedTab("unwrap")}>
              Unwrap
            </Tab>
          </nav>
        </div>
      </div>
    </div>
  )
}