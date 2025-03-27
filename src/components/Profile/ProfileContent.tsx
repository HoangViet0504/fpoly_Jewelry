import React, { useState } from "react";
import Information from "./Information";
import HistoryOrder from "./HistoryOrder";
import ChangePassword from "./ChangePassword";

const ProfileContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("info");

  const sidebarItems = [
    { id: "info", label: "Information" },
    { id: "orders", label: "Order History" },
    { id: "password", label: "Change Password" },
    { id: "logout", label: "Logout" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar - 4 columns */}
        <div className="col-span-3 bg-white rounded-lg shadow py-6">
          <div className="flex flex-col space-y-4">
            {sidebarItems.map((item) => (
              <button
                style={{ cursor: "pointer" }}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 py-3 px-4 rounded-lg w-full ${
                  activeTab === item.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {/* {item.icon} */}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - 8 columns */}
        <div className="col-span-9 bg-white rounded-lg shadow p-6">
          {activeTab === "info" && <Information />}
          {activeTab === "orders" && <HistoryOrder />}
          {activeTab === "password" && <ChangePassword />}

          {/* Other tab contents can be added here */}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
