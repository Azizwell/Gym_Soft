package org.example.gym_soft.controller;

import lombok.RequiredArgsConstructor;
import org.example.gym_soft.dto.gym.GymAdminDto;
import org.example.gym_soft.dto.gym.GymDto;
import org.example.gym_soft.dto.gym.UpdateGymAdminDto;
import org.example.gym_soft.dto.gym.UpdateGymDto;
import org.example.gym_soft.dto.supAdm.SupAdmDto;
import org.example.gym_soft.service.superAdmin.SuperAdminService;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/super_admin")
@RequiredArgsConstructor
public class SuperAdminController {
  final SuperAdminService superAdminService;

  @PutMapping
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public HttpEntity<?> update(@RequestBody SupAdmDto supAdmDto, @RequestHeader String Authorization) {

    return superAdminService.update(supAdmDto, Authorization);
  }

  @PostMapping("/gym")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public HttpEntity<?> addGym(@RequestBody GymDto gymDto) {

    return superAdminService.addGym(gymDto);
  }

  @PostMapping("/admin")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public HttpEntity<?> addAdmin(@RequestBody GymAdminDto gymAdminDto) {
    return superAdminService.addAdmin(gymAdminDto);
  }

  @GetMapping("/gym")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public HttpEntity<?> getGym() {
    return superAdminService.getGym();
  }

  @DeleteMapping
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public HttpEntity<?> deleteGym(@RequestParam String gymId) {
    superAdminService.deleteGym(gymId);
    return ResponseEntity.ok("success");
  }

  @PutMapping("/gym")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public HttpEntity<?> updateGym(@RequestBody UpdateGymDto gymDto) {
    return superAdminService.updateGym(gymDto);
  }

  @PatchMapping("/gym_admin")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public HttpEntity<?> getGymAdmin(@RequestParam String gymId) {
    return superAdminService.getGymAdmin(gymId);
  }

  @PutMapping("/admin")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
 public HttpEntity<?> updateGymAdmin(@RequestBody UpdateGymAdminDto gymAdminDto) {
    return superAdminService.updateGymAdmin(gymAdminDto);
  }


}
