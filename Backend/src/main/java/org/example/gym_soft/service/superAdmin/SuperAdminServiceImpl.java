package org.example.gym_soft.service.superAdmin;

import lombok.RequiredArgsConstructor;
import org.example.gym_soft.dto.gym.GymAdminDto;
import org.example.gym_soft.dto.gym.GymDto;
import org.example.gym_soft.dto.gym.UpdateGymAdminDto;
import org.example.gym_soft.dto.gym.UpdateGymDto;
import org.example.gym_soft.dto.supAdm.SupAdmDto;
import org.example.gym_soft.entity.Gym;
import org.example.gym_soft.entity.Role;
import org.example.gym_soft.entity.User;
import org.example.gym_soft.repository.GymRepo;
import org.example.gym_soft.repository.RoleRepo;
import org.example.gym_soft.repository.UserRepo;
import org.example.gym_soft.service.jwt.JwtServiceImpl;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SuperAdminServiceImpl implements SuperAdminService {
  final UserRepo userRepo;
  final JwtServiceImpl jwtService;
  final PasswordEncoder passwordEncoder;
  final GymRepo gymRepo;
  final RoleRepo roleRepo;

  @Override
  public HttpEntity<?> update(SupAdmDto supAdmDto, String authorization) {

    String id = jwtService.extractJwtToken(authorization);

    User user = userRepo.findById(UUID.fromString(id)).orElseThrow();
    user.setPassword(passwordEncoder.encode(supAdmDto.password()));
    user.setFullName(supAdmDto.fullName());
    user.setUsername(supAdmDto.username());
    User save = userRepo.save(user);
    String jwtToken = jwtService.generateJwtToken(user);
    HashMap<String, String> map = new HashMap<>();
    map.put("accessToken", jwtToken);
    map.put("login", user.getUsername());
    map.put("fullName", user.getFullName());
    map.put("role", "ROLE_SUPER_ADMIN");

    return ResponseEntity.ok(map);
  }

  @Override
  public HttpEntity<?> addGym(GymDto gymDto) {
    Gym gym = Gym.builder().location(gymDto.location()).name(gymDto.name()).build();
    gymRepo.save(gym);
    return ResponseEntity.ok(gym);
  }

  @Override
  public HttpEntity<?> addAdmin(GymAdminDto gymAdminDto) {
    List<Role> roleAdmin = roleRepo.findAllByName("ROLE_ADMIN");

    User admin = User.builder().username(gymAdminDto.username()).password(passwordEncoder.encode(gymAdminDto.password()))
            .fullName(gymAdminDto.fullName()).roles(roleAdmin).isEnabled(true).build();
    User saveAdmin = userRepo.save(admin);
    Gym gym = gymRepo.findById(UUID.fromString(gymAdminDto.GymId())).orElseThrow();
    gym.setAdmin(saveAdmin);
    Gym save = gymRepo.save(gym);
    return ResponseEntity.ok(save);
  }

  @Override
  public HttpEntity<?> getGym() {
    List<Gym> gyms = gymRepo.findAll();
    return ResponseEntity.ok(gyms);
  }

  @Override
  public void deleteGym(String gymId) {
    gymRepo.deleteById(UUID.fromString(gymId));
  }

  @Override
  public HttpEntity<?> updateGym(UpdateGymDto gymDto) {
    Gym gym = gymRepo.findById(UUID.fromString(gymDto.gymId())).orElseThrow();
    gym.setName(gymDto.name());
    gym.setLocation(gymDto.location());
    Gym save = gymRepo.save(gym);
    return ResponseEntity.ok(save);
  }

  @Override
  public HttpEntity<?> getGymAdmin(String gymId) {
    Gym gym = gymRepo.findById(UUID.fromString(gymId)).orElseThrow();
    return ResponseEntity.ok(gym.getAdmin());
  }

  @Override
  public HttpEntity<?> updateGymAdmin(UpdateGymAdminDto gymAdminDto) {
    Gym gym = gymRepo.findById(UUID.fromString(gymAdminDto.GymId())).orElseThrow();
    User user = userRepo.findById(gym.getAdmin().getId()).orElseThrow();
    user.setFullName(gymAdminDto.fullName());
    user.setUsername(gymAdminDto.username());
    user.setPassword(passwordEncoder.encode(gymAdminDto.password()));
    User save = userRepo.save(user);

    return ResponseEntity.ok(save);
  }
}
