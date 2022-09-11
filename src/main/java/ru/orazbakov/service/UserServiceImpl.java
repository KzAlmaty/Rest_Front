package ru.orazbakov.service;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.orazbakov.model.User;
import ru.orazbakov.repository.UserRepository;

import java.security.InvalidParameterException;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void addUser(User user) {
        User userForDB = userRepository.findByUsername(user.getUsername());
        if (userForDB == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    @Transactional
    public void updateUserById(User user) {
        //Если юзернейм не пустой и если юзернейм не свободный то исключение
        if (userRepository.findByUsername(user.getUsername()) != null &&
                !userRepository.findByUsername(user.getUsername()).getId().equals(user.getId())) {
            throw new InvalidParameterException("Can not save user such email exists!!!"+user.getUsername());
        }

        //Пароль не должен быть пустым
        if (user.getPassword().isEmpty()) {
            user.setPassword(userRepository.findById(user.getId()).get().getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        userRepository.save(user);

    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUserByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found!!!");
        }
        return user;
    }
}















