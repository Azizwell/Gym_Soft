package org.example.gym_soft.config;

import lombok.RequiredArgsConstructor;
import org.example.gym_soft.entity.Role;
import org.example.gym_soft.entity.User;
import org.example.gym_soft.repository.RoleRepo;
import org.example.gym_soft.repository.UserRepo;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class CommandLineRunner implements org.springframework.boot.CommandLineRunner {

  final UserRepo userRepo;
  final PasswordEncoder passwordEncoder;
  final RoleRepo roleRepo;


  @Override
  public void run(String... args) throws Exception {
    List<Role> all = roleRepo.findAll();
    if (all.isEmpty()) {
      roleRepo.saveAll(List.of(
              new Role("ROLE_ADMIN"),
              new Role("ROLE_SUPER_ADMIN"),
              new Role("ROLE_USER")
      ));
      List<Role> adminRoles = roleRepo.findAdminRoles();
      User user = User.builder().username("superadmin").fullName("superadmin")
              .password(passwordEncoder.encode("123")).isEnabled(true)
              .roles(adminRoles).build();
      userRepo.save(user);

    }



  }
}
