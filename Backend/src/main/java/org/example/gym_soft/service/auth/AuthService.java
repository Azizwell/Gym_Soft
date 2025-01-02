package org.example.gym_soft.service.auth;

import org.example.gym_soft.dto.user.LoginUserDto;
import org.example.gym_soft.dto.user.UserDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
  ResponseEntity<?> registerUser(UserDto userDto);


  ResponseEntity<?> loginUser(LoginUserDto loginUserDto);
}
