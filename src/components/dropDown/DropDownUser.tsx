/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { noImage, paths, Token } from "../../common/constant";
import { useAuthStore } from "../../stores/useAuthStore";
import Cookies from "js-cookie";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownUser() {
  const { user, setUser } = useAuthStore();
  return (
    <Menu
      style={{ zIndex: "99999" }}
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button
          style={{ cursor: "pointer" }}
          className="inline-flex justify-center w-full rounded-md text-sm font-medium  hover:opacity-80 "
        >
          {user ? (
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={user?.avatar_img ?? noImage}
              alt=""
            />
          ) : (
            <img
              className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] xs:w-[30px] xs:h-[30px]"
              src="/icons/header/user.svg"
              alt=""
            />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {!user ? (
          <Menu.Items className="origin-top-right absolute -right-24 top-12 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={paths.auth.signUp}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    Đăng ký
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={paths.auth.signIn}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    Đăng nhập
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        ) : (
          <Menu.Items className="origin-top-right absolute -right-24 top-12 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            {user?.role === 1 && (
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={paths.dashboard.overView}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "group flex items-center px-4 py-2 text-sm"
                      )}
                    >
                      Thống kê
                    </a>
                  )}
                </Menu.Item>
              </div>
            )}
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href={paths.profile}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    Thông tin
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Cookies.remove(Token);
                      setUser(undefined);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    Đăng xuất
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
}
