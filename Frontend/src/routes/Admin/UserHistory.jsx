import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetRateHistoryQuery } from "../../store/services/adminService";
import { setRateHistory } from "../../store/slices/appSlices";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const UserHistory = () => {
  const { rateId, rateHistory } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { data, isSuccess, refetch } = useGetRateHistoryQuery(rateId);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(rateId);
  }, [rateId]);

  useEffect(() => {
    dispatch(setRateHistory(data));
    console.log(data);
  }, [isSuccess, data]);

  return (
    <div className="flex-1 p-6">
      <div className="flex  justify-between mb-5">
        <div className="flex gap-10">
          <div className="font-semibold text-lg">{rateId?.fullName}</div>
          <div className="font-semibold text-lg">{rateId?.userName}</div>
        </div>
        <div>
          <button
            onClick={() => navigate("/admin/users/history/payment")}
            className="bg-purple-500 text-white px-4 py-2 rounded-full shadow hover:bg-pur[le-600"
          >
            Payment history
          </button>
        </div>
      </div>
      <div className="space-y-4 text-start">
        {rateHistory?.map((user, index) => (
          <div key={index} className="flex items-center gap-32 border-b pb-4">
            <div className="text-gray-700">
              <p>
                <FontAwesomeIcon icon={faCalendarCheck} />
                &nbsp; {user.localDate.join(" ")}
              </p>
            </div>

            <div className="text-gray-700">
              <p>
                <FontAwesomeIcon icon={faClock} />
                &nbsp; {user.localTime.slice(0, 3).join(" : ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHistory;
