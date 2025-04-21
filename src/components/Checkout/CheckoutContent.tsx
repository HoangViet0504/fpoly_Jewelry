import { useState } from "react";
import Container from "../Container";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];
const paymentMethods = [
  { id: "Thanh toán online", title: "Thanh toán online" },
  { id: "Thanh toán khi nhận hàng", title: "Thanh toán khi nhận hàng" },
];

export default function CheckoutContent() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  return (
    <div>1234</div>
    // <Container>
    //   <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    //     <h2 className="sr-only">Checkout</h2>

    //     <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
    //       <div>
    //         <div className="">
    //           <h2 className="text-lg font-medium text-gray-900">
    //             Shipping information
    //           </h2>
    //           <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
    //             <div>
    //               <label
    //                 htmlFor="first-name"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 First name
    //               </label>
    //               <div className="mt-1">
    //                 <input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   autoComplete="email"
    //                   placeholder="First name"
    //                   required
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />
    //               </div>
    //             </div>

    //             <div>
    //               <label
    //                 htmlFor="last-name"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Last name
    //               </label>
    //               <div className="mt-1">
    //                 <input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   autoComplete="email"
    //                   placeholder="Last name"
    //                   required
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />
    //               </div>
    //             </div>

    //             <div className="sm:col-span-2">
    //               <label
    //                 htmlFor="last-name"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Phone
    //               </label>
    //               <div className="mt-1">
    //                 <input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   autoComplete="email"
    //                   placeholder="Phone"
    //                   required
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />
    //               </div>
    //             </div>

    //             <div className="sm:col-span-2">
    //               <label
    //                 htmlFor="last-name"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Email
    //               </label>
    //               <div className="mt-1">
    //                 <input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   autoComplete="email"
    //                   placeholder="Email"
    //                   required
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />
    //               </div>
    //             </div>

    //             <div className="">
    //               <label
    //                 htmlFor="country"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Thành phố
    //               </label>
    //               <div className="mt-1">
    //                 <select
    //                   id="country"
    //                   name="country"
    //                   autoComplete="country-name"
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 >
    //                   <option>Chọn thành phố</option>
    //                 </select>
    //               </div>
    //             </div>

    //             <div className="">
    //               <label
    //                 htmlFor="country"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Quận huyện
    //               </label>
    //               <div className="mt-1">
    //                 <select
    //                   id="country"
    //                   name="country"
    //                   autoComplete="country-name"
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 >
    //                   <option>Chọn quận huyện</option>
    //                 </select>
    //               </div>
    //             </div>

    //             <div className="sm:col-span-2">
    //               <label
    //                 htmlFor="country"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Phường xã
    //               </label>
    //               <div className="mt-1">
    //                 <select
    //                   id="country"
    //                   name="country"
    //                   autoComplete="country-name"
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 >
    //                   <option>Chọn phường xã</option>
    //                 </select>
    //               </div>
    //             </div>

    //             <div className="sm:col-span-2">
    //               <label
    //                 htmlFor="company"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Địa chỉ
    //               </label>
    //               <div className="mt-1">
    //                 <input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   autoComplete="email"
    //                   placeholder="Địa chỉ"
    //                   required
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />
    //               </div>
    //             </div>

    //             <div className="sm:col-span-2">
    //               <label
    //                 htmlFor="address"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Ghi chú
    //               </label>
    //               <div className="mt-1">
    //                 <textarea
    //                   id="address"
    //                   name="address"
    //                   rows={4}
    //                   placeholder="Ghi chú"
    //                   required
    //                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="mt-10 border-t border-gray-200 pt-10">
    //           <h2 className="text-lg font-medium text-gray-900">
    //             Phương thức thanh toán
    //           </h2>

    //           <fieldset className="mt-4">
    //             <legend className="sr-only">Phương thức thanh toán</legend>
    //             <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
    //               {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
    //                 <div key={paymentMethod.id} className="flex items-center">
    //                   {paymentMethodIdx === 0 ? (
    //                     <input
    //                       id={paymentMethod.id}
    //                       name="payment-type"
    //                       type="radio"
    //                       defaultChecked
    //                       className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
    //                     />
    //                   ) : (
    //                     <input
    //                       id={paymentMethod.id}
    //                       name="payment-type"
    //                       type="radio"
    //                       className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
    //                     />
    //                   )}

    //                   <label
    //                     htmlFor={paymentMethod.id}
    //                     className="ml-3 block text-sm font-medium text-gray-700"
    //                   >
    //                     {paymentMethod.title}
    //                   </label>
    //                 </div>
    //               ))}
    //             </div>
    //           </fieldset>
    //         </div>
    //       </div>

    //       {/* Order summary */}
    //       <div className="mt-10 lg:mt-0">
    //         <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

    //         <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    //           <h3 className="sr-only">Items in your cart</h3>
    //           <ul role="list" className="divide-y divide-gray-200">
    //             {productsTab1.map((product) => (
    //               <li key={product.id} className="flex py-6 px-4 sm:px-6">
    //                 <div className="flex-shrink-0">
    //                   <img
    //                     src={product.imageSrc}
    //                     alt={product.imageAlt}
    //                     className="w-20 rounded-md"
    //                   />
    //                 </div>

    //                 <div className="ml-6 flex-1 flex flex-col">
    //                   <div className="flex">
    //                     <div className="min-w-0 flex-1">
    //                       <h4 className="text-sm">
    //                         <a
    //                           href={product.href}
    //                           className="font-medium text-gray-700 hover:text-gray-800"
    //                         >
    //                           Tên sản phẩm: {product.name}
    //                         </a>
    //                       </h4>
    //                       <p className="mt-1 text-sm text-gray-500">
    //                         Màu sắc: {product.options}
    //                       </p>
    //                       <p className="mt-1 text-sm text-gray-500">
    //                         {product.description}
    //                       </p>
    //                     </div>

    //                     <div className="ml-4 flex-shrink-0 flow-root">
    //                       <button
    //                         type="button"
    //                         className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
    //                       >
    //                         <span className="sr-only">Remove</span>
    //                         {/* <TrashIcon className="h-5 w-5" aria-hidden="true" /> */}
    //                       </button>
    //                     </div>
    //                   </div>

    //                   <div className="flex-1 pt-2 flex items-end justify-between">
    //                     <p className="mt-1 text-sm font-medium text-gray-900">
    //                       Giá: {product.price}
    //                     </p>

    //                     <div className="ml-4">
    //                       <label htmlFor="quantity" className="sr-only">
    //                         Quantity
    //                       </label>
    //                       <select
    //                         id="quantity"
    //                         name="quantity"
    //                         className="px-5 py-2 rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                       >
    //                         <option value={1}>1</option>
    //                         <option value={2}>2</option>
    //                         <option value={3}>3</option>
    //                         <option value={4}>4</option>
    //                         <option value={5}>5</option>
    //                         <option value={6}>6</option>
    //                         <option value={7}>7</option>
    //                         <option value={8}>8</option>
    //                       </select>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </li>
    //             ))}
    //           </ul>
    //           <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
    //             <div className="flex items-center justify-between">
    //               <dt className="text-sm">Subtotal</dt>
    //               <dd className="text-sm font-medium text-gray-900">$64.00</dd>
    //             </div>
    //             <div className="flex items-center justify-between">
    //               <dt className="text-sm">Shipping</dt>
    //               <dd className="text-sm font-medium text-gray-900">$5.00</dd>
    //             </div>
    //             <div className="flex items-center justify-between">
    //               <dt className="text-sm">Taxes</dt>
    //               <dd className="text-sm font-medium text-gray-900">$5.52</dd>
    //             </div>
    //             <div className="flex items-center justify-between border-t border-gray-200 pt-6">
    //               <dt className="text-base font-medium">Total</dt>
    //               <dd className="text-base font-medium text-gray-900">
    //                 $75.52
    //               </dd>
    //             </div>
    //           </dl>

    //           <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
    //             <button
    //               type="submit"
    //               className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
    //             >
    //               Confirm order
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </Container>
  );
}
