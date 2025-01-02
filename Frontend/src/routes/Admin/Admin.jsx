import React, { useEffect } from "react";
import { useControlQuery } from "../../store/services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";
import { faCalculator, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { setActiveClass } from "../../store/slices/appSlices";

const Admin = () => {
  const { data, isSuccess, refetch } = useControlQuery();
  const { user, activeClass } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      refetch()
        .then((res) => {
          if (res.data[0].authority != "ROLE_ADMIN") {
            navigate("/");
            localStorage.removeItem("user");
          }
        })
        .catch((e) => {
          console.log(e);
          navigate("/");
          localStorage.removeItem("user");
        });
    }
  }, [isSuccess]);

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (localStorage.getItem("user")) {
  } else {
    navigate("/");
  }
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
            <span className="text-lg font-semibold">{user?.fullName}</span>
          </div>

          <div>
            <span
              onClick={() => {
                navigate("/admin/index");
                dispatch(setActiveClass(""));
              }}
              className="text-2xl  font-semibold cursor-pointer me-20 p-2 text-black 
         "
            >
              {user?.gymName}
            </span>
          </div>

          <button
            onClick={logOut}
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-500"
          >
            Log out
          </button>
        </div>

        <div className="flex ">
          {/* Sidebar */}
          <div className="w-1/4 bg-purple-100 p-4 space-y-6">
            <div
              onClick={() => {
                navigate("/admin/users");
                dispatch(setActiveClass("users"));
              }}
              className={`flex-auto content-center text-center items-center space-x-4 p-3 rounded-lg hover:bg-purple-300 ${
                activeClass === "users" ? "bg-purple-300" : ""
              }`}
            >
              <p className="font-medium text-2xl ">Foydalanuvchilar</p>
              <br />
              <span className="text-2xl">
                <FontAwesomeIcon icon={faUsers} size="3x" />
              </span>
            </div>
            <div
              onClick={() => {
                navigate("/admin/rate");
                dispatch(setActiveClass("rate"));
              }}
              className={`flex-auto content-center text-center items-center space-x-4 p-3 rounded-lg hover:bg-purple-300 ${
                activeClass === "rate" ? "bg-purple-300" : ""
              }`}
            >
              <p className="font-medium text-2xl ">Tarif</p>
              <br />
              <span className="text-2xl">
                <FontAwesomeIcon icon={faBuffer} size="4x" />
              </span>
            </div>
            <div
              onClick={() => {
                navigate("/admin/history");
                dispatch(setActiveClass("calculate"));
              }}
              className={`flex-auto content-center text-center items-center space-x-4 p-3 rounded-lg hover:bg-purple-300 ${
                activeClass === "calculate" ? "bg-purple-300" : ""
              }`}
            >
              <p className="font-medium text-2xl ">Hisobot</p>
              <br />
              <span className="text-2xl">
                <FontAwesomeIcon icon={faCalculator} size="3x" />
              </span>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
