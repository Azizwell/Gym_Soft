import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserRatePaymentHistoryQuery } from "../../store/services/adminService";
import { setPaymentHistory } from "../../store/slices/appSlices";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const UserPaymentHistory = () => {
  const { rateId, paymentHistory } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { data, isSuccess, refetch } = useGetUserRatePaymentHistoryQuery(
    rateId.userId
  );

  useEffect(() => {
    console.log(rateId);
  }, [rateId]);

  useEffect(() => {
    dispatch(setPaymentHistory(data));
    console.log(data);
  }, [isSuccess, data]);

  const sum = paymentHistory?.reduce((sum, user) => sum + user.price, 0);

  // const totalCount = regionStat.reduce((sum, reg) => sum + reg.entityCount, 0);

  return (
    <div className="flex-1 p-6">
      <div className="flex  justify-between mb-5">
        <div className="flex gap-10">
          <div className="font-semibold text-lg">{rateId?.fullName}</div>
          <div className="font-semibold text-lg">{rateId?.userName}</div>
        </div>
        <div className="text-purple-500 text-xl">
          keltirilgan daromadi: &nbsp;<strong> {sum} &nbsp; </strong>
          ming
        </div>
      </div>
      <div className="space-y-4 text-start">
        {paymentHistory?.map((user, index) => (
          <div key={index} className="flex items-center gap-32 border-b pb-4">
            <div className="">
              <p>sotib olgan vaxti: &nbsp; {user.startTime}</p>
            </div>
            <div className="">
              <p>amal qilish muddati: &nbsp; {user.endTime}</p>
            </div>

            <div className="">
              <p>tarif nomi: &nbsp; {user.name}</p>
            </div>
            <div className="">
              <p>narxi: &nbsp; {user.price} &nbsp; min so'm </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPaymentHistory;
