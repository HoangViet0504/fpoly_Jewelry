// import React from "react";

// export default function ChangeImage() {
//   return (
//     <div
//       className="relative z-10"
//       aria-labelledby="modal-title"
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className="shadow  border-b border-gray-200 sm:rounded-lg">
//         <table className="min-w-full min-h-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
//               >
//                 Số thứ tự
//               </th>

//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
//               >
//                 Họ Tên
//               </th>

//               <th
//                 scope="col"
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Số điện thoại
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Ngày sinh
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Trạng thái
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Quyền
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Hành động
//               </th>
//               {/* <th scope="col" className="relative px-6 py-3">
//                        <span className="sr-only">Edit</span>
//                      </th> */}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {listUser.length !== 0 ? (
//               listUser.map((person, index) => (
//                 <tr key={person.email}>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <div className="text-sm text-gray-900">{index + 1}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap ">
//                     <div className="flex items-center ">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={
//                             person.avatar_img ??
//                             "/images/avatar/avatar_default.jpeg"
//                           }
//                           alt=""
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {person.first_name} {person.last_name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {person.email}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <div className="text-sm text-gray-900">{person.phone}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <div className="text-sm text-gray-900">
//                       {new Date(person.birthdate).toLocaleDateString("vi-VN", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                       })}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         person.is_active === 1
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {person.is_active === 1 ? "Hoạt động" : "Tạm khóa"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
//                     <span
//                       className={
//                         person.role === 1 ? "text-green-600" : "text-gray-600"
//                       }
//                     >
//                       {person.role === 1 ? "Quản lý" : "Khách hàng"}
//                     </span>
//                   </td>

//                   <td
//                     style={{ cursor: "pointer", position: "relative" }}
//                     className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
//                   >
//                     <DropDownHandle
//                       id={person.id_user}
//                       setId={setIdUser}
//                       setOpenDelete={setOpenDelete}
//                       setOpenForm={setOpenCreate}
//                       setIsEdit={setIsEdit}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <td
//                 colSpan={6} // Số lượng cột phù hợp với bảng
//                 className="px-6 py-4 text-center text-gray-500"
//               >
//                 Không có dữ liệu
//               </td>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
