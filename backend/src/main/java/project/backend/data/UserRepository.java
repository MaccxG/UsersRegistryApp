package project.backend.data;

import org.springframework.data.jpa.repository.JpaRepository;

import project.backend.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {}