# Sistema web de controle de instalações

Aplicação web simples (HTML/CSS/JS) com:

- Login de acesso (`admin` / `1234`)
- Mapa das instalações com Leaflet + OpenStreetMap
- Lista de instalações com atualização automática de status em tempo real (simulado)
- Indicadores de instalações concluídas, em andamento e pendentes

## Como executar

Basta abrir o `index.html` no navegador, ou servir com um servidor local:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.
