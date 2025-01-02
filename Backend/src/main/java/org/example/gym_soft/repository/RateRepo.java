package org.example.gym_soft.repository;

import org.example.gym_soft.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RateRepo extends JpaRepository<Rate, UUID> {

  List<Rate> findByAdminId(UUID adminId);

}
