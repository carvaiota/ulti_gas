import ClienteRepository from "../repositories/ClienteRepository.js";
import Cliente from "../models/Cliente.js";

class ClienteService{
    #clienteRepository;

    //aqui ele tras os dados do clienteRepository pronto.
    constructor(){
        this.#clienteRepository = new ClienteRepository();
    }

    //metodo que executa o fluxo para criar um novo cliente.
    async cadastrarCliente(dadosCliente){
        const {cpf, nome, idusuario} = dadosCliente;
        
        //regra de negocio com busca no banco de dados.
        const clienteExistente = await this.#clienteRepository.buscarPorCpf(cpf);
        if(clienteExistente){
            throw new Error("Já existe um cliente cadastrado com este CPF.");
        }

        const novoCliente = new Cliente(null,cpf, nome, 0, idusuario);
        const clienteSalvo = await this.#clienteRepository.salvar(novoCliente);
        return clienteSalvo;
    }

    async listarCliente(){
        const clienteSalvo = await this.#clienteRepository.buscar();
        return clienteSalvo;
    }

    async listarClienteCpf(cpf){
        const clienteSalvo = await this.#clienteRepository.buscarPorCpf(cpf);
        return clienteSalvo;
    }

    async deletarCliente(idcliente){
        const clienteExistente = await this.#clienteRepository.buscarPorId(idcliente);
        if(!clienteExistente){
            throw new Error("Cliente não encontrado.");
        }

        const clienteSalvo = await this.#clienteRepository.deletarCliente(idcliente);
        return clienteSalvo;
    }

    async atualizarCliente(idcliente){
        const clienteExistente = await this.#clienteRepository.buscarPorId(idcliente);
        if(!clienteExistente){
            throw new Error("Cliente não encontrado.");
        }

        const clienteSalvo = await this.#clienteRepository.atualizarCliente(idcliente);
        return clienteSalvo;
    }


}

export default ClienteService;