package com.servidorjava.bagview.controller;

public class SenhaValidacao {

    public static boolean validarSenha(String senha) {
        // Nao pode ser nula nem ter menos de 8 caracteres
        if (senha == null || senha.length() < 8) {
            return false;
        }

        // Como vai responder no cod
        boolean temNumero = false;
        boolean temLetraMaiuscula = false;
        boolean temCaractereEspecial = false;

        // REGRAS:
        // - Precisa ter pelo menos uma letra maiuscula
        // - Precisa ter pelo menos um caracter especial: @, !, *, &...
        // - Precisa ter pelo menos um numero
        for (char c : senha.toCharArray()) {
            if (Character.isDigit(c)) {
                temNumero = true;
            } else if (Character.isUpperCase(c)) {
                temLetraMaiuscula = true;
            } else if (!Character.isLetterOrDigit(c)) {
                temCaractereEspecial = true;
            }

            // Se todas as condições forem atendidas entao a senha foi atendida e o servidor
            // vai retornar true, prosseguindo
            if (temNumero && temLetraMaiuscula && temCaractereEspecial) {
                return true;
            }
        }

        // So para ter certeza fora do for :) - talvez seja retirado depois
        return temNumero && temLetraMaiuscula && temCaractereEspecial;
    }
}
