public class ValidarSenha extends Comunicado {
    private String senha;

    public ValidarSenha(String senha) {
        this.senha = senha;
    }

    public boolean isValid() {
        // A senha não pode ser nula, nem ter menos de 8 caracteres
        if (this.senha == null || this.senha.trim().isEmpty() || this.senha.length() < 8) {
            return false;
        }

        // REGRAS:
        // - Precisa ter pelo menos uma letra maiúscula
        // - Precisa ter pelo menos uma letra minúscula
        // - Precisa ter pelo menos um número
        // - Precisa ter pelo menos um caractere especial: @, !, *, &, etc.
        String regex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$";
        return senha.matches(regex);
    }
}