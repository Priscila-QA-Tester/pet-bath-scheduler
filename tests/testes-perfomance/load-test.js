import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Configuração da simulação e regras de qualidade
export const options = {
  stages: [
    { duration: '5s', target: 5 },  // Rampa de subida: sobe para 5 robôs em 5 segundos
    { duration: '10s', target: 5 }, // Carga constante: mantém 5 robôs por 10 segundos
    { duration: '5s', target: 0 },  // Rampa de descida: reduz para 0 robôs em 5 segundos
  ],
  thresholds: {
    // Regra: 95% das requisições devem responder em menos de 1000ms (1 segundo)
    http_req_duration: ['p(95)<1000'],
    // Regra: a taxa de erro nas requisições deve ser menor que 1%
    http_req_failed: ['rate<0.01'],
  },
};
// 2. O Cenário de teste que os robôs vão executar
export default function () {
  const url = 'http://localhost:3000/api/appointments';
  
  // --- AÇÃO 1: Listar agendamentos (GET) ---
  const getResponse = http.get(url);
  
  // Validação do GET (Status deve ser 200 e responder rápido)
  check(getResponse, {
    'GET status is 200': (r) => r.status === 200,
    'GET response time is under 1s': (r) => r.timings.duration < 1000,
  });
  
  // Dá uma pausa de 1 segundo antes de tentar novamente
  sleep(1); 
}