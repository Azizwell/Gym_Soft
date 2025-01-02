package org.example.gym_soft.service.auth;

import lombok.RequiredArgsConstructor;
import org.example.gym_soft.dto.user.LoginUserDto;
import org.example.gym_soft.dto.user.UserDto;
import org.example.gym_soft.entity.Gym;
import org.example.gym_soft.entity.Role;
import org.example.gym_soft.entity.User;
import org.example.gym_soft.repository.GymRepo;
import org.example.gym_soft.repository.RoleRepo;
import org.example.gym_soft.repository.UserRepo;
import org.example.gym_soft.service.jwt.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  final RoleRepo roleRepo;
  final UserRepo userRepo;
  final PasswordEncoder passwordEncoder;
  final AuthenticationManager authenticationManager;
  final JwtService jwtService;
  final GymRepo gymRepo;


  @Override
  public ResponseEntity<?> registerUser(UserDto userDto) {
    List<Role> roleUser = roleRepo.findAllByName("ROLE_USER");

    User user = User.builder().username(userDto.username()).fullName(userDto.fullName())
            .password(passwordEncoder.encode(userDto.password()))
            .roles(roleUser)
            .isEnabled(true).build();
    userRepo.save(user);

    return ResponseEntity.ok("registered");
  }

  @Override
  public ResponseEntity<?> loginUser(LoginUserDto loginUserDto) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginUserDto.username(), loginUserDto.password())
    );

    User users = userRepo.findByUsername(loginUserDto.username()).orElseThrow();
    String jwtToken = jwtService.generateJwtToken(users);

    String rollName = users.getRoles() != null && !users.getRoles().isEmpty()
            ? users.getRoles().get(0).getName()
            : "UNKNOWN_ROLE";

    HashMap<String, String> map = new HashMap<>();
    map.put("accessToken", jwtToken);
    map.put("login", users.getUsername());
    map.put("fullName", users.getFullName());
    map.put("role", rollName);
    if (rollName.equals("ROLE_ADMIN")) {
      Gym gym = gymRepo.findAllByAdmin(users);
      map.put("gymName", gym.getName());
    }

    return ResponseEntity.ok(map);
  }


}
