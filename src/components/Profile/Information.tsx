import React from "react";

export default function Information(): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src="/images/logo/LOGO.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <button className="text-blue-600 text-sm">Change Avatar</button>
        </div>
      </div>

      {/* Profile Information Form */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            defaultValue="John"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            defaultValue="Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            defaultValue="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            defaultValue="+1234567890"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            Thành phố
          </label>
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            defaultValue="+1234567890"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            Quận huyện
          </label>
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            defaultValue="+1234567890"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            Phường xã
          </label>
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            defaultValue="+1234567890"
          />
        </div>
        <div className="space-y-2 ">
          <label className="flex items-center text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            className="w-full p-2 border rounded-lg"
            defaultValue="123 Main St, City, Country"
          />
        </div>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Save Changes
      </button>
    </div>
  );
}
