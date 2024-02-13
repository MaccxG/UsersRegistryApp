package project.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus; 
import jakarta.persistence.EntityNotFoundException;

import project.backend.data.UserRepository;
import project.backend.models.User;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) {
        return userRepo.save(user);
    }

    @GetMapping("/getUsers")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @PostMapping("/searchUser")
    public ResponseEntity<User> searchUser(@RequestBody User user) {
        return ResponseEntity.of(userRepo.findById(user.getId()));
    }

    @PostMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody User updatedUser) {
        try {
            User user = userRepo.getById(updatedUser.getId());

            // Apply changes from JSON
            user.setName(updatedUser.getName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());

            userRepo.save(user);

            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Error updating user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/deleteUser")
    public ResponseEntity<String> deleteUser(@RequestBody User user) {
        try {
            userRepo.deleteById(user.getId());
            
            return ResponseEntity.ok("User deleted successfully");
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting user");
        }
    }
}
