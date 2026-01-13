import type {Estoque} from '../types/Estoque';
import { API_URL } from './api';

export async function createEstoque(data: Estoque): Promise<Estoque> {
    try{
  const response = await fetch(`${API_URL}/estoques`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json()
}catch (error) {
    console.log('Erro ao criar estoque:', error);
    }
}

export async function getEstoques(){
    try {
        const response = await fetch(`${API_URL}/estoques`);
        return response.json();
        }catch (error) {
    console.log('Erro ao buscar estoques:', error);
        }
    }