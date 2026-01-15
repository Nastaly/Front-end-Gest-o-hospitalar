import type { Consulta } from '../../types/Consulta';
import { API_URL } from './api';

export async function createConsulta(data: Consulta): Promise<Consulta> {
    try{
  const response = await fetch(`${API_URL}/consultas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    return response.json()
}catch (error) {
    console.log('Erro ao criar consulta:', error);
    }
}

export async function getConsultas(){
    try {
        const response = await fetch(`${API_URL}/consultas`);
        return response.json();
        }catch (error) {
    console.log('Erro ao buscar consultas:', error);
        }
    }
