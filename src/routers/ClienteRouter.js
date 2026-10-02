import { Router } from "express";
import ClienteController from "../controllers/clienteController.js";

const ClienteRoutes = Router();
const cliente = new ClienteController();

ClienteRoutes.get("/", cliente.listar);
ClienteRoutes.get("/:cpf", cliente.listarCpf);
ClienteRoutes.post("/", cliente.salvar);
ClienteRoutes.delete("/:idcliente", cliente.deletar);

export default ClienteRoutes;