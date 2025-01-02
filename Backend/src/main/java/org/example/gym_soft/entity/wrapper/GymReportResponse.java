package org.example.gym_soft.entity.wrapper;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.gym_soft.projection.calculate.DailySubscriptionCount;
import org.example.gym_soft.projection.calculate.MonthsProfitOverview;
import org.example.gym_soft.projection.calculate.UsersVisitedGymToday;

import java.util.List;

@Data
@NoArgsConstructor
@Builder
public class GymReportResponse {
  private List<DailySubscriptionCount> dailySubscriptionCount;
  private List<UsersVisitedGymToday> usersVisitedGymToday;
  private List<MonthsProfitOverview> monthsProfitOverview;

  public GymReportResponse(List<DailySubscriptionCount> dailySubscriptionCount,
                           List<UsersVisitedGymToday> usersVisitedGymToday,
                           List<MonthsProfitOverview> monthsProfitOverview) {
    this.dailySubscriptionCount = dailySubscriptionCount;
    this.usersVisitedGymToday = usersVisitedGymToday;
    this.monthsProfitOverview = monthsProfitOverview;
  }
}
