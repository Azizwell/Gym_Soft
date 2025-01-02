import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddRateDayMutation,
  useGetAllUsersQuery,
  useGetReportQuery,
  useStartUserRateMutation,
} from "../../store/services/adminService";
import { setUsers } from "../../store/slices/appSlices";
import RegisterUser from "./RegisterUser";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import AddRate from "./AddRate";
import { toast } from "react-toastify";
import { use } from "react";
const AdminIndex = () => {
  const [keyword, setKeyword] = useState("");
  const [userId, setUserId] = useState("");
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState("");
  const { users, rateId } = useSelector((state) => state.app);
  const { data, isSuccess, refetch } = useGetAllUsersQuery(keyword);
  const { refetch: reportRefetch } = useGetReportQuery(rateId.userId);

  const [addRateDay] = useAddRateDayMutation();
  const [startUserRate] = useStartUserRateMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUsers(data));
    console.log(data);
  }, [isSuccess, data]);

  const addUserRateDay = (userRateId) => {
    addRateDay(userRateId).then((res) => {
      refetch();
      reportRefetch();
      toast.info("The operation was completed successfully!");
    });
  };
  const addUserRate = (userRateId) => {
    setAction("addRate");
    setVisible(true);
    setUserId(userRateId);
  };

  useEffect(() => {
    if (!visible) {
      setAction("");
    }
  }, [visible]);

  const started = (userRateId) => {
    startUserRate(userRateId).then(() => {
      refetch();
      reportRefetch();
      toast.info("Started!");
    });
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Phone number"
          className="border px-4 py-2 rounded-md w-1/3 focus:outline-none focus:ring focus:ring-gray-300"
        />
        <button
          onClick={() => {
            setAction("register");
            setVisible(true);
          }}
          className="bg-purple-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-purple-600"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {users?.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-semibold text-lg">{user.fullName}</h3>
                <p className="text-gray-500">{user.username}</p>
              </div>
            </div>
            {/* start date */}
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-semibold text-lg">{user.startDate}</h3>
              </div>
            </div>
            {/* Time Info */}
            <div className="text-gray-700">
              {user.startDate ? (
                ""
              ) : (
                <div>
                  <p>
                    {user.userRateId ? `Start time: ${user.startTime}` : ""}
                  </p>
                  <p>{user.userRateId ? `End time: ${user.endTime}` : ""}</p>
                </div>
              )}
            </div>
            {/* Days */}
            <p className="text-gray-700">
              {user.startDate ? "" : user.userRateId ? `Day: ${user.day}` : ""}
            </p>
            {/* Action Button */}
            <button
              onClick={
                user.startDate
                  ? () => started(user.userRateId)
                  : user.startDate == null && user.day > 0
                  ? //  ||
                    //   !user.active ||
                    //   user.userRateId == null
                    () => addUserRateDay(user.userRateId)
                  : () => addUserRate(user.usersId)
              }
              className="bg-purple-500 text-white px-4 py-2 rounded-full shadow hover:bg-purple-600"
            >
              {user.startDate
                ? "Start"
                : user.startDate == null && user.day > 0
                ? "Tasdiqlash"
                : "Obuna qo'shish"}
            </button>
          </div>
        ))}
      </div>
      <Rodal
        height={action == "register" ? 400 : 200}
        visible={visible}
        onClose={() => setVisible(!visible)}
      >
        <div>
          {action === "register" ? (
            <RegisterUser refetch={refetch} setVisible={setVisible} />
          ) : action === "addRate" ? (
            <AddRate
              refetch={refetch}
              userId={userId}
              setVisible={setVisible}
            />
          ) : (
            ""
          )}
        </div>
      </Rodal>
    </div>
  );
};

export default AdminIndex;
