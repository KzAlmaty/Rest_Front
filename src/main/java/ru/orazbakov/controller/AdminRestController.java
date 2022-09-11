package ru.orazbakov.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.orazbakov.model.User;
import ru.orazbakov.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("rest_admin")
public class AdminRestController {

    private final UserService userService;

    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<User> getUser(Principal principal) {
        return new ResponseEntity<User>(userService.getUserByName(principal.getName()), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<HttpStatus> saveUser(@RequestBody User user) {
        userService.addUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping("/patch")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user) {
        userService.updateUserById(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
