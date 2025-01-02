import React, { useEffect, useState } from "react";
import { useUpdateGymMutation } from "../store/services/superAdminServices";

const UpdateGym = ({ setVisible, visible, selectGym, refetch }) => {
  const [action, setAction] = useState({ name: "", location: "", gymId: "" });
  const [updateGym] = useUpdateGymMutation();
  useEffect(() => {
    if (!visible) {
      setAction({ name: "", location: "", gymId: "" });
    }
  }, [visible]);

  useEffect(() => {
    if (selectGym) {
      setAction({
        name: selectGym.name,
        location: selectGym.location,
        gymId: selectGym.id,
      });
    }
  }, [selectGym, visible]);

  const updateGymHandler = () => {
    updateGym(action).then(() => {
      refetch();
      setVisible(false);
    });
  };
  return (
    <div className="space-y-6 mt-10 ">
      <div className="">
        <input
          type="text"
          value={action.name}
          onChange={(e) => setAction({ ...action, name: e.target.value })}
          placeholder="Gym name"
          className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-300" // Замените w-full на w-1/3 или аналог для уменьшения ширины
        />
      </div>
      <div className="">
        <input
          type="text"
          value={action.location}
          onChange={(e) => setAction({ ...action, location: e.target.value })}
          placeholder="Location"
          className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-300" // Также уменьшите ширину
        />
      </div>
      <div className="text-end">
        <button
          onClick={updateGymHandler}
          className="bg-purple-500 text-white px-6 py-2 rounded-3xl hover:bg-purple-400 shadow-md"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateGym;
