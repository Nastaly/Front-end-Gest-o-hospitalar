import type { Auditoria } from '../../types/Auditoria';
import { API_URL } from './api';

export async function createauditoria(data: Auditoria): Promise<Auditoria> {
    try{
  const response = await fetch(`${API_URL}/auditorias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}catch (error) {
    console.log('Erro ao criar auditoria:', error);
    throw error;
    }

}

export async function getAuditorias(){
    try {
        const response = await fetch(`${API_URL}/auditorias`);
        return response.json();
        }catch (error) {
    console.log('Erro ao buscar auditorias:', error);
        }
    }