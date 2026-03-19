import { TipoDocumento } from "../enumeracoes/tipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";

// Endereço Cliente Titular

let enderecoVal = new Endereco()
enderecoVal.rua = `Av. Jupira`
enderecoVal.bairro = `Paraíso Castanheiras`
enderecoVal.cidade = `São José dos Campos`
enderecoVal.estado = `São Paulo`
enderecoVal.pais = `Brasil`
enderecoVal.codigoPostal = `12345-000`

// Documento Titular

let documentoVal = new Documento()
documentoVal.tipo = TipoDocumento.CPF
documentoVal.dataExpedicao = new Date('2020-12-10')
documentoVal.numero = '12345678901'

// Telefone Titular

let telefoneVal = new Telefone()
telefoneVal.ddd = '12'
telefoneVal.numero = '98179-0173'

// Cliente Titular

let clienteTitular = new Cliente()
clienteTitular.nome = 'Valdirene Montuani'
clienteTitular.nomeSocial = 'Val'
clienteTitular.endereco = enderecoVal
clienteTitular.documentos = [documentoVal]
clienteTitular.dataNascimento = new Date('1982-07-13')
clienteTitular.telefones = [telefoneVal]
clienteTitular.dataCadastro = new Date('2026-03-19')

// console.log(clienteTitular)

// Cliente dependente

let clienteDependente = new Cliente()
clienteDependente.nome = 'Sarah Montuani'
clienteDependente.nomeSocial = 'Sarão'
clienteDependente.endereco = (clienteTitular.endereco.clonar() as Endereco) // copiar endereço do titular
clienteDependente.dataNascimento = new Date('2006-03-29')
clienteDependente.telefones = clienteTitular.telefones.map(t => t.clonar() as Telefone) // copiar telefone do titular
clienteDependente.titular = clienteTitular // Vincular 'Val' como titular
clienteDependente.dataCadastro = new Date('2026-03-19')

// Vincular 'Sarão' como dependente
clienteTitular.dependentes.push(clienteDependente)

// Imprimir o cadastro do titular e dependente
console.log(clienteTitular)
console.log(clienteDependente)

// Validação se foi clonado realmente o telefone
console.log(`Telefone titular: (${clienteTitular.telefones[0].ddd}) ${clienteTitular.telefones[0].numero}`)
console.log(`Telefone dependente: (${clienteDependente.telefones[0].ddd}) ${clienteDependente.telefones[0].numero}`)

// Deverá dar falso, já que é um cópia - objetos diferentes na memória
console.log("Mesmo objeto de telefone?", clienteTitular.telefones[0] === clienteDependente.telefones[0])

// Validação de alterar somente o do dependente, para provar independência entre os objetos
/*clienteDependente.telefones[0].numero = "99999-0000"

console.log("Após alterar dependente:")
console.log("Número titular:", clienteTitular.telefones[0].numero)
console.log("Número dependente:", clienteDependente.telefones[0].numero) */
