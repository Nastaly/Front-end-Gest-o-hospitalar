import type {Usuario} from '../types/Usuario';
import { API_URL } from './api';

export async function createUsuario(data: Usuario): Promise<Usuario> {
    try{
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    return response.json()
}catch (error) {
    console.log('Erro ao criar usuario:', error);
    }
}

export async function getUsuarios(){
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        return response.json();
        }catch (error) {
    console.log('Erro ao buscar usuarios:', error);
        }
    }