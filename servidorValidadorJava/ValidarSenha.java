public class ValidarSenha extends Comunicado {
    private String senha;

    public ValidarSenha(String senha) {
        this.senha = senha;
    }

    public boolean isValid() {
        // Nao pode ser nula nem ter menos de 8 caracteres
        if (this.senha == null || this.senha.trim().isEmpty() || this.senha.length() < 8)
            return false;

        // REGRAS:
        // - Precisa ter pelo menos uma letra maiuscula
        // - Precisa ter pelo menos um caracter especial: @, !, *, &...
        // - Precisa ter pelo menos um numero
        String regex = "^(?=.\\d)(?=.[A-Z])(?=.*[^a-zA-Z0-9]).+$";
        return senha.matches(regex);
    }
}
