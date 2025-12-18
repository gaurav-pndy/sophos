import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronUpDown, HiCheck } from "react-icons/hi2";

const SpecializationSelect = ({
  specialization,
  setSpecialization,
  specializationOptions,
  t,
}) => {
  return (
    <div>
      <label className="small-text font-medium text-brand1 block mb-2">
        {t("doctors.filter.specialization")}
      </label>

      <Listbox value={specialization} onChange={setSpecialization}>
        <div className="relative">
          {/* Button (shown value) */}
          <Listbox.Button className="relative w-full cursor-pointer border border-brand4/40 rounded-lg bg-white py-2.5 pl-3 pr-10 text-left small-text text-brand1 focus:outline-none focus:border-brand1 transition-all">
            <span className="block truncate">{specialization}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <HiChevronUpDown className="text-brand1/70 h-5 w-5" />
            </span>
          </Listbox.Button>

          {/* Dropdown panel */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-2 max-h-80 w-full overflow-auto rounded-lg bg-white py-2 small-text shadow-lg ring-1 ring-black/5 focus:outline-none">
              {specializationOptions.map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-8 pr-4 ${
                      active ? "bg-brand1/10 text-brand1" : "text-brand1"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-2 flex items-center text-brand1">
                          <HiCheck className="h-4 w-4" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SpecializationSelect;
