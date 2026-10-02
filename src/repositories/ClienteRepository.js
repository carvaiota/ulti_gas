import pool from '../configs/Database.js';
import Cliente from '../models/Cliente.js'; 

class ClienteRepository{
    async salvar (cliente) {
        const sql = "INSERT INTO cliente (idcliente, cpf, nome, qntde_pontos, idusuario) VALUE(null,?,?,?,?)"; 
        const [resultado] = await pool.execute(sql, [cliente.cpf, cliente.nome, 0, cliente.idusuario]);
        return resultado;   
    }

    async buscar (){
        const sql = 'SELECT * FROM cliente';
        const [linhas] = await pool.execute(sql);
        return linhas;
    }

    async buscarPorId (idcliente){
        const sql = 'SELECT * FROM cliente WHERE idcliente = ?';
        const [linhas] = await pool.execute(sql, [idcliente]);
        if(linhas.length === 0) return null;
        const dados = linhas[0];
        return new Cliente(dados.idcliente, dados.cpf, dados.nome, dados.qntde_pontos, dados.idusuario);
    }

    async deletarCliente (idcliente){
        const sql = 'DELETE FROM cliente WHERE idcliente = ?';
        const [linhas] = await pool.execute(sql, [idcliente]);
        return linhas.affectedRows > 0
    }

    async buscarPorCpf(cpf){
        const sql = 'SELECT * FROM cliente WHERE cpf = ?';
        const [linhas] = await pool.execute(sql, [cpf]);
        if(linhas.length === 0) return null;
        const dados = linhas[0];
        return new Cliente(dados.idcliente, dados.cpf, dados.nome, dados.qntde_pontos, dados.idusuario);
    }

    async atualizarCliente (cliente){
        const sql = 'UPDATE cliente SET cpf = ?, nome = ?, qntde_pontos = ? WHERE idcliente = ?';
        const [resultado] = await pool.execute (sql, [cliente.cpf, cliente.nome, cliente.qntde_pontos, cliente.idcliente]);
        return resultado.affectedRows > 0;
    }

    async buscarPorPontos (qntde_pontos ){
        const sql = 'SELECT * FROM cliente WHERE qntde_pontos = ?';
        const [resultado] = await pool.execute (sql, [qntde_pontos]);
        return resultado;
    }
};

export default ClienteRepository;