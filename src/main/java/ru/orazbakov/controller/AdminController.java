package ru.orazbakov.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.orazbakov.model.User;
import ru.orazbakov.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String getUsersInfoList() {
        return "admin";
    }

    @PostMapping("/save")
    public String getSaveUserForm() {
        return "redirect:/admin";
    }

    @PatchMapping("/{id}")
    public String getUpdateUserForm() {
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String getRemoveUserForm() {
        return "redirect:/admin";
    }

}
