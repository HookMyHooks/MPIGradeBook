package dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {
    private int id;
    private String username;
    private String userPassword;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
}
