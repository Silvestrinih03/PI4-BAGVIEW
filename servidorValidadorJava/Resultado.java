public class Resultado extends Comunicado {
    private boolean valorResultante;

    public Resultado(boolean valorResultante) {
        this.valorResultante = valorResultante;
    }

    public boolean getValorResultante() {
        return this.valorResultante;
    }

    public String toString() {
        return ("" + this.valorResultante);
    }

}
