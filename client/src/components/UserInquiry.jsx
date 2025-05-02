import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const UserInquiry = ({ setIsModalOpen }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue) {
      window.location.assign(`${import.meta.env.VITE_FRONT_URL}${searchValue}`);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        استعلام المستخدم
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="أدخل رقم الهوية"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 px-4 py-3 text-[15px] rounded-xl border border-gray-300 focus:outline-none  transition-all"
        />
        <Button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all"
        >
          استعلام
        </Button>
      </div>
    </div>
  );
};

export default UserInquiry;
