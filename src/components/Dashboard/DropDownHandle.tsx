import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  PencilAltIcon,
  TrashIcon,
  DotsVerticalIcon,
} from "@heroicons/react/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface DropDownHandleProps {
  setIsEdit: (value: boolean) => void;
  setOpenForm: (value: boolean) => void;
  setOpenDelete: (value: boolean) => void;
  id: string;
  setId: (id: string) => void;
}
export default function DropDownHandle({
  setIsEdit,
  setOpenForm,
  setOpenDelete,
  setId,
  id,
}: DropDownHandleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="flex justify-center">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Menu.Button
          className="bg-white"
          onClick={() => {
            setIsOpen(!isOpen);
            setId(id);
          }} // Khi click vào icon thì setIdUser về rỗng
        >
          <DotsVerticalIcon
            style={{ cursor: "pointer" }}
            className={classNames(
              isOpen ? "text-red-500" : "text-gray-400",
              " flex-shrink-0 h-6 w-6 hover:opacity-80"
            )}
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterLeave={() => setIsOpen(false)} // Khi menu đóng thì reset state
      >
        <Menu.Items
          className=" absolute right-2.5  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none "
          style={{ position: "absolute", zIndex: 99999999 }}
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  style={{ width: "100%", cursor: "pointer" }}
                  onClick={() => {
                    setIsOpen(false);
                    setIsEdit(true);
                    setOpenForm(true);
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <PencilAltIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Chỉnh sửa
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    setOpenDelete(true);
                  }}
                  style={{ width: "100%", cursor: "pointer" }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <TrashIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Thêm vào thùng rác
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
