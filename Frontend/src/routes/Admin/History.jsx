import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetReportQuery } from "../../store/services/adminService";
import { setReport } from "../../store/slices/appSlices";

const UserPaymentHistory = () => {
  const { rateId, report } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { data, isSuccess, refetch } = useGetReportQuery(rateId.userId);

  useEffect(() => {
    dispatch(setReport(data));
    console.log(data);
  }, [isSuccess, data]);

  return (
    <div className="flex-1 p-6">
      <div className="flex  justify-between mb-5">
        <div className="flex gap-10">
          <div className="font-semibold text-lg">{rateId?.fullName}</div>
          <div className="font-semibold text-lg">{rateId?.userName}</div>
        </div>
      </div>
      <div className="text-purple-500 text-xl">
        Bugungi kun uchun obunasi bor bo'lgan foydalanuvchilar soni : &nbsp;
        {report?.dailySubscriptionCount ? (
          <strong> {report.dailySubscriptionCount.length} &nbsp; </strong>
        ) : (
          ""
        )}
        ta
      </div>

      <div className="text-purple-500 text-xl">
        Bugung zaldan foydalangan foydalanuvchilar soni: &nbsp;
        {report?.dailySubscriptionCount ? (
          <strong> {report.usersVisitedGymToday.length} &nbsp; </strong>
        ) : (
          ""
        )}
        ta
      </div>
      {report?.monthsProfitOverview?.map((item, index) => (
        <div key={index} className="text-purple-500 text-xl">
          {item.month} oy uchun daromad: &nbsp;
          <strong> {item.totalRevenue} &nbsp; </strong>
          so'm
        </div>
      ))}
    </div>
  );
};

export default UserPaymentHistory;
