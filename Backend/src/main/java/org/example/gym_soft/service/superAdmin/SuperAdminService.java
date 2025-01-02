package org.example.gym_soft.service.superAdmin;

import org.example.gym_soft.dto.gym.GymAdminDto;
import org.example.gym_soft.dto.gym.GymDto;
import org.example.gym_soft.dto.gym.UpdateGymAdminDto;
import org.example.gym_soft.dto.gym.UpdateGymDto;
import org.example.gym_soft.dto.supAdm.SupAdmDto;
import org.springframework.http.HttpEntity;

public interface SuperAdminService {
  HttpEntity<?> update(SupAdmDto supAdmDto, String authorization);

  HttpEntity<?> addGym(GymDto gymDto);

  HttpEntity<?> addAdmin(GymAdminDto gymAdminDto);

  HttpEntity<?> getGym();

  void deleteGym(String gymId);

  HttpEntity<?> updateGym(UpdateGymDto gymDto);

  HttpEntity<?> getGymAdmin(String gymId);

  HttpEntity<?> updateGymAdmin(UpdateGymAdminDto gymAdminDto);
}
