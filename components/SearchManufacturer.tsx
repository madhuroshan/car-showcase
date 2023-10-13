"use client";
import Image from "next/image";
import {
  useState,
  Fragment,
} from "react";
import {
  Combobox,
  Transition,
} from "@headlessui/react";
import { SearchManufacturerProps } from "@/types";
import { manufacturers } from "@/constants";
import React from "react";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] =
    useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter(
          (manufacturer) =>
            manufacturer
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(
                query
                  .toLowerCase()
                  .replace(/\s+/g, "")
              )
        );

  return (
    <div className="search-manufacturer">
      <Combobox
        value={manufacturer}
        onChange={setManufacturer}
      >
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              height={20}
              width={20}
              alt="car-logo"
              className="ml-4"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(
              manufacturer: string
            ) => manufacturer}
            onChange={(e) =>
              setQuery(e.target.value)
            }
          ></Combobox.Input>
          <Transition
            as={Fragment}
            leave="transition ease-in 100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() =>
              setQuery("")
            }
          >
            <Combobox.Options>
              {filteredManufacturers.map(
                (item) => (
                  <Combobox.Option
                    value={item}
                    key={item}
                    className={({
                      active,
                    }) =>
                      `relative search-manufacturer__option ${
                        active
                          ? "bg-primary-blue"
                          : "text-gray-900"
                      }`
                    }
                  >
                    {({
                      selected,
                      active,
                    }) => {
                      return (
                        <>
                          <span
                            className={`block truncate ${
                              selected
                                ? "font-medium"
                                : "font-normal"
                            }`}
                          >
                            {item}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active
                                  ? "text-white"
                                  : "text-teal-600"
                              }`}
                            ></span>
                          ) : null}
                        </>
                      );
                    }}
                  </Combobox.Option>
                )
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;