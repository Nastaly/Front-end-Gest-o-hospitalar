import type {Prescricao} from '../types/Prescricao';
import { API_URL } from './api';
export async function createPrescricao(data: Prescricao): Promise<Prescricao> {
    try{
  const response = await fetch(`${API_URL}/prescricoes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json()
}catch (error) {
    console.log('Erro ao criar prescrição:', error);
    }
}

export async function getPrescricoes(){
    try {
        const response = await fetch(`${API_URL}/prescricoes`);
        return response.json();
        }catch (error) {
    console.log('Erro ao buscar prescrições:', error);
        }
    }