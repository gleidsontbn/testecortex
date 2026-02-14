# Sistema web de controle de instalações

Aplicação web simples (HTML/CSS/JS) com:

- Login de acesso (`admin` / `1234`)
- Mapa das instalações com Leaflet + OpenStreetMap
- Lista de instalações com atualização automática de status em tempo real (simulado)
- Indicadores de instalações concluídas, em andamento e pendentes

---

## Passo a passo para testar (explicado para iniciantes)

> Este guia foi feito para quem é **100% leigo**.

### O que você precisa antes

- Um computador com internet.
- Navegador instalado (Chrome, Edge ou Firefox).
- Python 3 instalado.

Se você não sabe se tem Python 3, teste assim:

1. Abra o terminal:
   - **Windows**: menu iniciar → digite `cmd` → Enter.
   - **Mac**: abra o app `Terminal`.
   - **Linux**: abra o `Terminal`.
2. Digite este comando e aperte Enter:

```bash
python3 --version
```

Se aparecer algo como `Python 3.x.x`, está tudo certo.

---

### 1) Abrir a pasta do projeto

No terminal, entre na pasta do projeto com este comando:

```bash
cd /workspace/testecortex
```

---

### 2) Ligar o sistema

Ainda no terminal, rode:

```bash
python3 -m http.server 8000
```

✅ Se deu certo, vai aparecer uma mensagem parecida com:

`Serving HTTP on 0.0.0.0 port 8000`

**Importante:**
- Deixe essa janela do terminal aberta.
- Enquanto ela estiver aberta, o sistema estará no ar.

---

### 3) Abrir no navegador

No navegador, digite na barra de endereço:

```text
http://localhost:8000
```

Você deve ver a tela de login com o título **Controle de Instalações**.

---

### 4) Testar o login

Use estes dados:

- Usuário: `admin`
- Senha: `1234`

Clique em **Entrar**.

✅ Resultado esperado:
- Deve abrir o **Painel Operacional**.

Teste também login errado (por exemplo `admin` / `0000`).

✅ Resultado esperado:
- Deve aparecer a mensagem: **Usuário ou senha inválidos.**

---

### 5) Testar o painel (dashboard)

Depois de entrar, verifique estes 4 pontos:

1. **Contadores**
   - Concluídas
   - Em andamento
   - Pendentes

2. **Mapa**
   - Deve aparecer um mapa com marcadores.

3. **Lista de instalações**
   - Deve aparecer lista com cliente, equipe e status.

4. **Hora da última atualização**
   - Deve mostrar um horário.

---

### 6) Testar “tempo real” (simulado)

Aguarde alguns segundos na tela.

✅ Resultado esperado:
- A cada ~3 segundos, alguns status mudam sozinhos.
- Os contadores também mudam junto.

---

### 7) Testar sair (logout)

Clique no botão **Sair**.

✅ Resultado esperado:
- Volta para a tela de login.

---

### 8) Encerrar o sistema

Volte no terminal onde está rodando o servidor e aperte:

- `Ctrl + C`

✅ Resultado esperado:
- O servidor para de rodar.

---

## Problemas comuns (e solução rápida)

### Não abre `http://localhost:8000`
- Confirme se o comando `python3 -m http.server 8000` está rodando sem erro.
- Veja se você digitou o endereço exatamente igual.

### Erro “python3: command not found”
- Python 3 não está instalado ou não está no PATH.
- Instale Python 3 e tente novamente.

### Porta 8000 ocupada
- Rode em outra porta, por exemplo:

```bash
python3 -m http.server 8080
```

Depois abra:

`http://localhost:8080`
