import promptSync from "prompt-sync";
export default class Entrada {
    private prompt = promptSync({ sigint: true })

    public receberNumero(mensagem: string): number {
        let valor = this.prompt(`${mensagem}: `)
        let numero = new Number(valor)
        return numero.valueOf()
    }

    public receberTexto(mensagem: string): string {
        let texto = this.prompt(`${mensagem}: `)
        return texto
    }

    public receberData(mensagem: string): Date {
        let texto = this.prompt(`${mensagem} (dd/MM/yyyy): `)
        let partes = texto.split('/')
        let ano = new Number(partes[2])
        let mes = new Number(partes[1])
        let dia = new Number(partes[0])
        let data = new Date(ano.valueOf(), mes.valueOf() - 1, dia.valueOf())
        return data
    }
}