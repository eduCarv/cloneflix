import React from "react";

export default function NotAvailable({ type = null }) {
  if (type === null) {
    return (
      <h1 className="not-available">
        Ops, nenhum filme encontrado com este gênero.
      </h1>
    );
  } else {
    return (
      <h1 className="not-available">
        Ops, nenhuma série encontrada com este gênero.
      </h1>
    );
  }
}
