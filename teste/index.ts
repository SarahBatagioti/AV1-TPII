import { TipoDocumento } from "../enumeracoes/tipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import Entrada from "./entrada";

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


//////////////////////////////////////////////////////////

// Condição para pular o bloco interativo caso rode o CI 

const emCI = !!process.env.CI && process.env.CI.toLowerCase() !== 'false'

if (emCI) {
	console.log('\nExecucao em CI. Cadastro interativo ignorado.')
} else {
	console.log('\n===== Cadastro adicional via terminal =====')
	let entrada = new Entrada()
	let desejaCadastrarOutro = entrada.receberTexto('Deseja cadastrar outro cliente? (s/n)').trim().toLowerCase()

	if (desejaCadastrarOutro === 's' || desejaCadastrarOutro === 'sim') {
		let enderecoNovo = new Endereco()
		enderecoNovo.rua = entrada.receberTexto('Rua')
		enderecoNovo.bairro = entrada.receberTexto('Bairro')
		enderecoNovo.cidade = entrada.receberTexto('Cidade')
		enderecoNovo.estado = entrada.receberTexto('Estado')
		enderecoNovo.pais = entrada.receberTexto('Pais')
		enderecoNovo.codigoPostal = entrada.receberTexto('Codigo postal')

		let documentoNovo = new Documento()
		let tipoDocumentoTexto = entrada.receberTexto('Tipo de documento (CPF, RG ou Passaporte)').trim().toLowerCase()
		if (tipoDocumentoTexto === 'rg') {
			documentoNovo.tipo = TipoDocumento.RG
		} else if (tipoDocumentoTexto === 'passaporte') {
			documentoNovo.tipo = TipoDocumento.Passaporte
		} else {
			documentoNovo.tipo = TipoDocumento.CPF
		}
		documentoNovo.dataExpedicao = entrada.receberData('Data de expedicao do documento')
		documentoNovo.numero = entrada.receberTexto('Numero do documento')

		let telefoneNovo = new Telefone()
		telefoneNovo.ddd = entrada.receberTexto('DDD')
		telefoneNovo.numero = entrada.receberTexto('Numero de telefone')

		let clienteNovo = new Cliente()
		clienteNovo.nome = entrada.receberTexto('Nome do cliente')
		clienteNovo.nomeSocial = entrada.receberTexto('Nome social do cliente')
		clienteNovo.dataNascimento = entrada.receberData('Data de nascimento do cliente')
		clienteNovo.dataCadastro = new Date()
		clienteNovo.endereco = enderecoNovo
		clienteNovo.documentos = [documentoNovo]
		clienteNovo.telefones = [telefoneNovo]

		let desejaCadastrarDependentes = entrada.receberTexto('Deseja cadastrar dependente(s) para este cliente? (s/n)').trim().toLowerCase()
		if (desejaCadastrarDependentes === 's' || desejaCadastrarDependentes === 'sim') {
			let quantidadeDependentes = entrada.receberNumero('Quantidade de dependentes')
			for (let i = 0; i < quantidadeDependentes; i++) {
				console.log(`\nCadastro do dependente ${i + 1}:`)

				let documentoDependente = new Documento()
				let tipoDocumentoDependenteTexto = entrada.receberTexto('Tipo de documento do dеpеndеntе (CPF, RG ou Passaporte)').trim().toLowerCase()
				if (tipoDocumentoDependenteTexto === 'rg') {
					documentoDependente.tipo = TipoDocumento.RG
				} else if (tipoDocumentoDependenteTexto === 'passaporte') {
					documentoDependente.tipo = TipoDocumento.Passaporte
				} else {
					documentoDependente.tipo = TipoDocumento.CPF
				}
				documentoDependente.dataExpedicao = entrada.receberData('Data de expedicao do documento do dependente')
				documentoDependente.numero = entrada.receberTexto('Numero do documento do dependente')

				let dependente = new Cliente()
				dependente.nome = entrada.receberTexto('Nome do dependente')
				dependente.nomeSocial = entrada.receberTexto('Nome social do dependente')
				dependente.dataNascimento = entrada.receberData('Data de nascimento do dependente')
				dependente.dataCadastro = new Date()
				dependente.endereco = clienteNovo.endereco.clonar() as Endereco
				dependente.telefones = clienteNovo.telefones.map(t => t.clonar() as Telefone)
				dependente.documentos = [documentoDependente]
				dependente.titular = clienteNovo

				clienteNovo.dependentes.push(dependente)
			}
		}

		console.log('\nNovo cliente cadastrado:')
		console.log(clienteNovo)
	} else {
		console.log('Cadastro adicional nao realizado.')
	}
}
