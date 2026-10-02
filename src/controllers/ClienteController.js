import ClienteService from "../services/clienteService.js";

class ClienteController {

    #clienteService;

    constructor(){
        this.#clienteService = new ClienteService();
    }

    salvar = async (req, res) => {
        try{
            const {nome, cpf, qntde_pontos, idusuario} = req.body;

            if(!nome || !cpf || !idusuario){
                res.status(500).json({
                    message: "Dados inválidos!!!"
                });
            }

            const resultado = await this.#clienteService.cadastrarCliente(req.body);

            res.status(201).json({
                message: "Sucesso ao cadastrar novo cliente.",
                data: resultado
            });
        }
        catch(error) {
            console.error(error);
            res.status(500).json({
                message: "Algo deu errado!",
                error: error.message
            });
        }
    }

    listar = async (req, res) => {
        try{
            const resultado = await this.#clienteService.listarCliente();

            res.status(201).json({
                message: "Sucesso ao listar clientes.",
                data: resultado
            });
        }
        catch(error) {
            console.error(error);
            res.status(500).json({
                message: "Algo deu errado!",
                error: error.message
            });
        }
    }

    listarCpf = async (req, res) => {
        try{
            const cpf = req.params.cpf;
            const resultado = await this.#clienteService.listarClienteCpf(cpf);
            
            res.status(201).json({
                message: "Sucesso ao listar cliente.",
                data: {
                    idcliente: resultado.idcliente,
                    nome: resultado.nome,
                    cpf: resultado.cpf,
                    qntde_pontos: resultado.qntde_pontos,
                    idusuario: resultado.idusuario
                }
            });
        }
        catch(error) {
            console.error(error);
            res.status(500).json({
                message: "Algo deu errado!",
                error: error.message
            });
        }
    }

    deletar = async (req, res) => {
        try{
            const idcliente = req.params.idcliente;
            const resultado = await this.#clienteService.deletarCliente(idcliente);
            
            res.status(201).json({
                message: "Sucesso ao deletar cliente."
            });
        }
        catch(error) {
            console.error(error);
            res.status(500).json({
                message: "Algo deu errado!",
                error: error.message
            });
        }
    }

    atualizar = async (req, res) => {
        
        const idcliente = req.params.idcliente;
        const resultado = await this.#clienteService.atualizar(idcliente);
            
            res.status(201).json({
                message: "Sucesso ao listar cliente.",
                data: {
                    idcliente: resultado.idcliente,
                    nome: resultado.nome,
                    cpf: resultado.cpf,
                    qntde_pontos: resultado.qntde_pontos,
                    idusuario: resultado.idusuario
                }
            });
    };

   
        
}

export default ClienteController;