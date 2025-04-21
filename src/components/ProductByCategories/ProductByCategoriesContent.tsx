import { useEffect, useState } from "react";
import { PlusSmIcon } from "@heroicons/react/solid";
import CardItemByCategories from "./CardItemByCategories";
import { paths } from "../../common/constant";
import { Meta, Product } from "../../types/interface";
import { RestApi } from "../../api/utils/axios";
import Navigation from "../Navigation";

// const breadcrumbs = [{ id: 1, name: "Men", href: "#" }];
const filters = [
  {
    id: "Chất liệu",
    name: "Chất Liệu",
    options: [
      { value: "Gold", label: "Vàng" },
      { value: "Silver", label: "Bạc" },
      { value: "Platinum", label: "Bạch kim" },
      { value: "Other", label: "Khác" },
    ],
  },
  {
    id: "Like",
    name: "Sắp xếp theo",
    options: [
      { value: "price_desc", label: "Giá thấp đến cao" },
      { value: "price_asc", label: "Giá cao đến thấp" },
      { value: "purchases", label: " Lượt mua nhiều" },
      { value: "likes", label: "Lượt thích nhiều" },
      { value: "sale", label: "Khuyến mãi" },
    ],
  },
];
interface ProductByCategoriesProps {
  slug: string;
}
export default function ProductByCategoriesContent({
  slug,
}: ProductByCategoriesProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [listProductByCategories, setListProductByCategories] = useState<
    Product[]
  >([]);
  const [material, setMaterial] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<Meta>({} as Meta);
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchProductByCategories = async () => {
    setIsLoading(true);
    try {
      const response = await RestApi.get("/getListProductsBySlugClient", {
        params: {
          slug: slug,
          material: material,
          sort: sort,
          page: page,
          keyword: keyword,
        },
      });
      setListProductByCategories(response.data.data);
      setMeta(response.data.meta);
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductByCategories();
  }, [slug, material, sort, page, keyword]);

  return (
    <div className="bg-white">
      <div>
        <div className="border-b border-gray-200">
          <nav
            aria-label="Breadcrumb"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4 py-4">
              <li>
                <div className="flex items-center">
                  <a
                    href={paths.home}
                    className="mr-4 text-sm font-medium text-gray-900"
                  >
                    Trang chủ
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {slug}
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <main className="max-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-2">
          <div className="border-b border-gray-200 pt-5 pb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Danh mục sản phẩm
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Khám phá bộ sưu tập trang sức mới nhất – tinh xảo trong từng chi
              tiết, tôn vinh vẻ đẹp thanh lịch của bạn.
            </p>
          </div>

          <div className="pt-5 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusSmIcon
                  className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block">
                <div className="mb-4 flex flex-col gap-y-2">
                  <label
                    htmlFor="keyword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tìm kiếm
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập từ khóa ..."
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                    value={keyword}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {filters.map((section, sectionIdx) => (
                  <div
                    key={section.name}
                    className={sectionIdx === 0 ? undefined : "pt-5"}
                  >
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">
                        {section.name}
                      </legend>
                      <div className="pt-4 space-y-3">
                        {section.options.map((option, optionIdx) => {
                          const isMaterial = section.id === "Chất liệu";
                          const isChecked = isMaterial
                            ? material === option.value
                            : sort === option.value;

                          const handleChange = () => {
                            if (isMaterial) {
                              setMaterial(option.value);
                            } else {
                              setSort(option.value);
                            }
                          };

                          return (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={section.id}
                                value={option.value}
                                checked={isChecked}
                                onChange={handleChange}
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>
                ))}
                <button
                  className="hover:bg-gray-100 bg-white text-gray-500 "
                  style={{
                    marginTop: "24px",
                    width: "100%",
                    height: "40px",
                    borderRadius: "4px ",
                    border: "1px solid #E5E7EB",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMaterial("");
                    setSort("");
                    setKeyword("");
                    setPage(1);
                  }}
                >
                  <span className="text-sm font-medium text-gray-700">
                    Xóa bộ lọc
                  </span>
                </button>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
            >
              <CardItemByCategories
                loading={isLoading}
                data={listProductByCategories}
              />
              {listProductByCategories?.length !== 0 && !isLoading && (
                <div className="grid lg:grid-cols-1, mt-5">
                  <Navigation data={meta} page={page} setPage={setPage} />
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
