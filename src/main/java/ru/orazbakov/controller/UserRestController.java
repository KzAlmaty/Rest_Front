package ru.orazbakov.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.orazbakov.model.User;
import ru.orazbakov.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/user_api")
public class UserRestController {

    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<User> getUser(Principal principal) {
        return new ResponseEntity<User>(userService.getUserByName(principal.getName()), HttpStatus.OK);
    }

}
