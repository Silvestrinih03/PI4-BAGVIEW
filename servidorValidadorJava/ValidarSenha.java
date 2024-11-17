public class ValidarSenha extends Comunicado {
    private String senha;

    public ValidarSenha(String senha) {
        this.senha = senha;
    }

    public boolean isValid() {
        // Nao pode ser nula nem ter menos de 8 caracteres
        if (this.senha == null || this.senha.trim().isEmpty() || this.senha.length() < 8)
            return false;

        // Como vai responder no cod
        boolean temNumero = false;
        boolean temLetraMaiuscula = false;
        boolean temCaractereEspecial = false;

        // REGRAS:
        // - Precisa ter pelo menos uma letra maiuscula
        // - Precisa ter pelo menos um caracter especial: @, !, *, &...
        // - Precisa ter pelo menos um numero
        for (char c : this.senha.toCharArray()) {
            if (Character.isDigit(c)) {
                temNumero = true;
            } else if (Character.isUpperCase(c)) {
                temLetraMaiuscula = true;
            } else if (!Character.isLetterOrDigit(c)) {
                temCaractereEspecial = true;
            }
        }

        // So para ter certeza fora do for :) - talvez seja retirado depois
        return temNumero && temLetraMaiuscula && temCaractereEspecial;
    }
}
