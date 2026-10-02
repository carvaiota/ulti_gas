import pool from '../configs/database.js';
import usuario from '../models/usuario.js'

class usuarioRepository{
    //salva o usuario no banco de dados 
    async salvar (usuario){
        const sql = 'INSERT INTO usuario (email,senha_hash) VALUES(?,?)';
        const [resultado] = await pool.execute(sql, [usuario.email,usuario.senha_hash])
    return resultado.insertId
    }
    //busca o usuario por id 
    async buscarPorId(idusuario){
        const sql = ' SELECT * FROM usuario WHERE idusuario = ?';
        const [linhas] = await pool.execute(sql,[idusuario])
        if (linhas.length === 0) return null
        const dados = linhas[0]
        return new usuario(dados.senha_hash,dados.idusuario, dados.email,)
    }

    //buscar por email
    async buscarPorEmail(email){
        const sql = 'SELECT * FROM usuario WHERE email = ?';
        const [linhas] = await pool.execute(sql,[email])
        if (linhas.length ===0) return null
        const dados = linhas[0]

        return new usuario (dados.senha_hash,dados.idusuario, dados.email,)
    }
    //atualizar o usuario
    async atualizaSenha (usuario){
        const sql = 'UPDATE usuario SET senha_hash = ?, email =?  WHERE idusuario =? '
        const [resultado] = await pool.execute(sql,[usuario.senha_hash,usuario.idusuario,])
        return resultado.affectedRows > 0
    }

    async atualizaEmail (usuario){
        const sql = 'UPDATE usuario SET, email =?  WHERE idusuario =? '
        const [resultado] = await pool.execute(sql,[,usuario.email,usuario.idusuario,])
        return resultado.affectedRows > 0
    }

    async atualizaEmaileSenha (usuario){
        const sql = 'UPDATE usuario SET senha_hash = ?, email =?  WHERE idusuario =? '
        const [resultado] = await pool.execute(sql,[usuario.senha_hash,usuario.email,usuario.idusuario,])
        return resultado.affectedRows > 0
    }
}
 export default new usuarioRepository()