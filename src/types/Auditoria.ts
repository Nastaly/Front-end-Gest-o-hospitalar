export interface Auditoria {
    tabela: string;
    regisstroId: number;
    ipOrigem: string;
    usuarioId: number;
    acao: string;
    dataHora: string;
}