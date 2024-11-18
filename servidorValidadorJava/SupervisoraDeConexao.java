import java.io.*;
import java.net.*;
import java.util.*;

public class SupervisoraDeConexao extends Thread {
    private Parceiro usuario;
    private Socket conexao;
    private ArrayList<Parceiro> usuarios;

    public SupervisoraDeConexao(Socket conexao, ArrayList<Parceiro> usuarios) throws Exception {
        if (conexao == null)
            throw new Exception("Conexao ausente");

        if (usuarios == null)
            throw new Exception("Usuarios ausentes");

        this.conexao = conexao;
        this.usuarios = usuarios;
    }

    public void run() {
        ObjectOutputStream transmissor = null;
        ObjectInputStream receptor = null;

        try {
            transmissor = new ObjectOutputStream(this.conexao.getOutputStream());
            receptor = new ObjectInputStream(this.conexao.getInputStream());
            this.usuario = new Parceiro(this.conexao, receptor, transmissor);
        } catch (Exception erro) {
            System.err.println("Erro ao inicializar streams ou criar usuario: " + erro.getMessage());
            try {
                if (transmissor != null)
                    transmissor.close();
                if (receptor != null)
                    receptor.close();
                this.conexao.close();
            } catch (IOException e) {
                System.err.println("Erro ao fechar conexao: " + e.getMessage());
            }
            return;
        }

        try {
            synchronized (this.usuarios) {
                this.usuarios.add(this.usuario);
            }

            while (true) {
                Comunicado comunicado = this.usuario.envie();

                if (comunicado == null) {
                    System.out.println("Comunicado nulo recebido, encerrando conexão");
                    break;
                }

                if (comunicado instanceof ValidarCpf) {
                    ValidarCpf cpf = (ValidarCpf) comunicado;
                    boolean valido = cpf.isValid();
                    Resultado resultado = new Resultado(valido);
                    this.usuario.receba(resultado);
                } else if (comunicado instanceof ValidarSenha) {
                    ValidarSenha senha = (ValidarSenha) comunicado;
                    boolean valido = senha.isValid();
                    Resultado resultado = new Resultado(valido);
                    this.usuario.receba(resultado);
                } else if (comunicado instanceof ValidarCartao) {
                    ValidarCartao cartao = (ValidarCartao) comunicado;
                    boolean valido = cartao.isValid();
                    Resultado resultado = new Resultado(valido);
                    this.usuario.receba(resultado);
                } else if (comunicado instanceof PedidoParaSair) {
                    synchronized (this.usuarios) {
                        this.usuarios.remove(this.usuario);
                    }
                    this.usuario.adeus();
                    break;
                }
            }
        } catch (Exception erro) {
            System.err.println("Erro durante comunicacao: " + erro.getMessage());
        } finally {
            try {
                if (transmissor != null)
                    transmissor.close();
                if (receptor != null)
                    receptor.close();
                this.conexao.close();
            } catch (IOException e) {
                System.err.println("Erro ao fechar recursos: " + e.getMessage());
            }
        }
    }
}
