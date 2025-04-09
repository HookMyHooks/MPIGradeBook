package dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {
    private String username;
    private String userPassword;
    private String email;
    private String role;       // "STUDENT" or "TEACHER"
    private String firstName;
    private String lastName;
}
