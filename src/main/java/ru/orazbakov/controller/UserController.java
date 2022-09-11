package ru.orazbakov.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.orazbakov.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String showUserPage() {
        return "user";
    }


}
