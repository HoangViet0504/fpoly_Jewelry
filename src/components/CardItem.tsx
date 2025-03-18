import React from "react";
import { Product } from "../types/interface";

interface ProductProps {
  data?: Product[];
}
export default function CardItem({ data }: ProductProps): React.ReactElement {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {data?.map((product) => (
            <div
              key={product?.id}
              className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
            >
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                  style={{ borderRadius: "4px" }}
                  src={product?.imageSrc}
                  alt={product?.imageAlt}
                  className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
              </div>
              <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={product?.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product?.name}
                  </a>
                </h3>
                <p className="text-sm text-gray-500">{product?.description}</p>
                <div className="flex-1 flex flex-col justify-end">
                  <p className="text-sm italic text-gray-500">
                    {product?.options}
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {product?.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
