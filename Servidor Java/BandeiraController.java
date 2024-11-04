import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/validar-cartao")
public class bandeiraController {

    @PostMapping
    public boolean validarCartao(@RequestParam String numeroCartao) {
        return BandeiraValidacao.identificarBandeira(numeroCartao);
    }
}
