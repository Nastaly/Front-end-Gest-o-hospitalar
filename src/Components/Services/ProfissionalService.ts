import type {Profissional} from '../types/Profissional';
import { API_URL } from './api';

export async function createProfissional(data: Profissional): Promise<Profissional> {
    try{
  const response = await fetch(`${API_URL}/profissionais`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    return response.json()
}catch (error) {
    console.log('Erro ao criar profissional:', error);
    }
}

export async function getProfissionais(){
    try {
        const response = await fetch(`${API_URL}/profissionais`);
        return response.json();
        }catch (error) {
    console.log('Erro ao buscar profissionais:', error);
        }
    }