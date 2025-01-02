import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useControlQuery } from "../../store/services/userServices";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const SuperAdmin = () => {
  const { data, isSuccess, refetch } = useControlQuery();
  const { user } = useSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      refetch()
        .then((res) => {
          if (res.data[0].authority != "ROLE_SUPER_ADMIN") {
            navigate("/");
            localStorage.removeItem("user");
          }
        })
        .catch((e) => {
          navigate("/");
          localStorage.removeItem("user");
        });
    }
  }, [isSuccess]);

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div>
      <div className="h-screen w-full bg-white p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 border-2 rounded-full flex justify-center items-center text-black">
              <span className="text-2xl">
                <FontAwesomeIcon icon={faUser} size="1x" />
              </span>
            </div>
            <span className="text-lg font-semibold">{user.fullName}</span>
          </div>

          <div className="  ">
            <span
              onClick={() => navigate("/super_admin/gym")}
              className="text-2xl  font-semibold cursor-pointer me-20 p-2 text-black 
             "
            >
              Gym
            </span>

            <span
              onClick={() => navigate("/super_admin/setting")}
              className="text-2xl font-semibold cursor-pointer  text-red-600"
            >
              Settings
            </span>
          </div>

          <button
            onClick={logOut}
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-500"
          >
            Log out
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdmin;
