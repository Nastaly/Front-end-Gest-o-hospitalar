import type {Prontuario} from '../types/Prontuario';
import { API_URL } from './api';

export async function createProntuario(data: Prontuario): Promise<Prontuario> {
    try{
  const response = await fetch(`${API_URL}/prontuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    return response.json()
}catch (error) {
    console.log('Erro ao criar prontuario:', error);
    }
}

export async function getProntuarios(){
    try {
        const response = await fetch(`${API_URL}/prontuarios`);
        return response.json();
        }catch (error) {
    console.log('Erro ao buscar prontuarios:', error);
        }
    }