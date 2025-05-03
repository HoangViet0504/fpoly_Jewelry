import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  CubeIcon,
  TagIcon,
  ShoppingBagIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import { noImage, paths } from "../../../common/constant";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";

const navigation = [
  { name: "Thống kê", href: paths.dashboard.overView, icon: HomeIcon },
  { name: "Khách hàng", href: paths.dashboard.user, icon: UsersIcon },
  { name: "Sản phẩm", href: paths.dashboard.product, icon: CubeIcon },
  {
    name: "Hình ảnh sản phẩm",
    href: paths.dashboard.imageProduct,
    icon: CubeIcon,
  },
  {
    name: "Danh mục / Bộ sưu tập",
    href: paths.dashboard.categories,
    icon: TagIcon,
  },
  // {
  //   name: "Collection",
  //   href: paths.dashboard.productCollection,
  //   icon: FolderIcon,
  // },
  { name: "Đơn hàng", href: paths.dashboard.order, icon: ShoppingBagIcon },
  { name: "Mã giảm giá", href: paths.dashboard.voucher, icon: TicketIcon },
  { name: "Bình luận", href: paths.dashboard.comment, icon: InboxIcon },
];

const userNavigation = [
  { name: "Trang chủ", href: paths.home },
  { name: "Thông tin", href: paths.profile },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface LeftSideBarProps {
  children?: React.ReactNode;
}

export default function LeftSideBar({
  children,
}: LeftSideBarProps): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <>
      <div>
        {/* Mobile Sidebar */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="h-10 w-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex items-center px-4 py-4">
                  <img
                    className="h-8 w-auto"
                    src="/icons/logo/logo.svg"
                    alt="Logo"
                  />
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.href === location.pathname
                          ? "bg-indigo-100 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.href === location.pathname
                            ? "text-indigo-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
          <div className="flex items-center px-4 py-4">
            <a href={paths.home}>
              <img
                className="h-8 w-auto"
                src="/icons/logo/logo.svg"
                alt="Logo"
              />
            </a>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.href === location.pathname
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    item.href === location.pathname
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <Menu
                style={{ display: "flex", alignItems: "center" }}
                as="div"
                className="ml-3 relative"
              >
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar_img ?? noImage}
                    alt="User Avatar"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </>
  );
}
