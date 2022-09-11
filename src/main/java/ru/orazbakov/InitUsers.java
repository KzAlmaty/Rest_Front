package ru.orazbakov;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.orazbakov.model.Role;
import ru.orazbakov.model.User;
import ru.orazbakov.repository.RoleRepository;
import ru.orazbakov.repository.UserRepository;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class InitUsers {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    public InitUsers(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void addUsersToDb() {

        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");


        roleRepository.save(roleAdmin);
        roleRepository.save(roleUser);

        User userAdmin = new User("admin@gmail.com",
                new BCryptPasswordEncoder().encode("100"), "Admin", "Adminov", 100);

        User userUser = new User("user@gmail.com",
                new BCryptPasswordEncoder().encode("200"), "User", "Userov", 200);


        userAdmin.setRoles(new HashSet<>(Set.of(roleAdmin)));
        userUser.setRoles(new HashSet<>(Set.of(roleUser)));

        userRepository.save(userAdmin);
        userRepository.save(userUser);


    }



}
