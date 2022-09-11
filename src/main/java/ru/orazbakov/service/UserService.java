package ru.orazbakov.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.orazbakov.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    void addUser(User user);

    User getUserById(Long id);

    void updateUserById(User user);

    void deleteUserById(Long id);

    List<User> getAllUsers();

    User getUserByName(String name);

}
