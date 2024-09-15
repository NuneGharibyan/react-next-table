"use client";

import { useParams } from "next/navigation";

export default function Brewery() {
  const params = useParams<{ id: string }>();
  return <div>hello, {params.id}</div>;
}
