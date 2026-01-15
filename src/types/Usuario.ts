export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    papel: 'ADMIN' | 'MEDICO' | 'ENFERMEIRO' | 'RECEPCIONISTA';
}