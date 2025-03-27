import React from "react";
import { paths } from "../../helper/constant";

export default function NotFoundPage(): React.ReactElement {
  return (
    <div
      style={{ height: "100dvh", overflow: "hidden" }}
      className="bg-white grid lg:grid-cols-2  lg:relative"
    >
      <div className="flex-grow flex flex-col">
        <main className="flex-grow flex flex-col bg-white">
          <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 pt-10 sm:pt-16">
              <a href="/" className="inline-flex">
                <span className="sr-only">Workflow</span>
                <img
                  className=""
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="flex-shrink-0 my-auto py-16 sm:py-32">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <a
                  href={paths.home}
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 bg-gray-50">
          <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
            <nav className="grid grid-cols-6 gap-6">
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                Status
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </footer>
      </div>
      <div className="">
        <img
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "6px",
            objectFit: "cover",
          }}
          className=" object-cover"
          src="/images/product/sp1-1.webp"
          alt=""
        />
      </div>
    </div>
  );
}
