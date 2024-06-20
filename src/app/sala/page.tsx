'use client'

import { SalaPage } from "@/componentes/SalaPage";
import { useSearchParams } from "next/navigation";

export default function Sala(){
  const searchParams = useSearchParams()
  const nome = searchParams.get('nome')!
  const sala = searchParams.get('sala')!
  return (
    <SalaPage nome={nome} sala={sala} />
  );
}