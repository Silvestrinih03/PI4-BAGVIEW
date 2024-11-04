import org.springframework.web.bind.annotation.*;

@RestController
public class SenhaController {

    @PostMapping("/validar-senha")
    public boolean validarSenha(@RequestBody String senha) {
        return ValidadorSenha.validarSenha(senha);
    }
}