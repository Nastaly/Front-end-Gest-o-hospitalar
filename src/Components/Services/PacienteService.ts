import type{Paciente} from '../types/Paciente';
import { API_URL } from './api';    
export async function createPaciente(data: Paciente): Promise<Paciente> {
    try{
  const response = await fetch(`${API_URL}/pacientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    return response.json()
}catch (error) {
    console.log('Erro ao criar paciente:', error);
    }
}

export async function getPacientes(){
    try {
        const response = await fetch(`${API_URL}/pacientes`);
        return response.json();
        }catch (error) {
    console.log('Erro ao buscar pacientes:', error);
        }
    }