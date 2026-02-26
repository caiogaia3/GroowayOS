import { redirect } from 'next/navigation';

export default function Home() {
  // Para simplificar no MVP, a landing principal joga direto pro Dashboard Administrativo do OS
  // Futuramente aqui poderia ser a página de login
  redirect('/dashboard');
}
