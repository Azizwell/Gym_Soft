import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteUserRateMutation,
  useGetUsersRateQuery,
} from "../../store/services/adminService";
import { setRateId, setRateUsers } from "../../store/slices/appSlices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GymUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rateUsers, rateId } = useSelector((state) => state.app);
  const { data, isSuccess, refetch } = useGetUsersRateQuery();
  const [deleteUserRate] = useDeleteUserRateMutation();
  useEffect(() => {
    dispatch(setRateUsers(data));
    console.log(data);
  }, [isSuccess, data]);

  function deleteUserRateHandler(userRateId) {
    deleteUserRate(userRateId).then((res) => {
      toast.success("user deleted");
      refetch();
    });
  }

  return (
    <div className="flex-1 p-6">
      {rateUsers?.map((user, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b pb-4"
        >
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-semibold text-lg">{user.fullName}</h3>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-semibold text-lg">{user.username}</h3>
            </div>
          </div>

          {/* Time Info */}
          <div className="font-semibold text-lg flex-row">
            <p> StartTime: &nbsp; {user.startTime} </p>
            <p> EndTime: &nbsp; {user.endTime} </p>
          </div>

          {/* Days */}
          <p className="text-gray-700">{user.day} &nbsp; kun</p>
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
            </div>
          </div>
          {/* Action Button */}
          <div>
            <button
              onClick={() => {
                dispatch(
                  setRateId({
                    ...rateId,
                    rateId: user.rateId,
                    userName: user.username,
                    fullName: user.fullName,
                    userId: user.userId,
                  })
                );
                navigate("/admin/users/history");
              }}
              className="bg-purple-500 me-1 text-white px-4 py-2 rounded-full shadow hover:bg-purple-600"
            >
              History
            </button>
            <button
              onClick={() => deleteUserRateHandler(user.rateId)}
              className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GymUsers;
