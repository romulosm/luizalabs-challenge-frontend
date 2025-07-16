# 🎵 Artista Front Spotify — Frontend

Este projeto é o frontend do **Artista Front Spotify**, uma plataforma que integra com a API do Spotify para gerenciar usuários, artistas favoritos, playlists e muito mais. Foi desenvolvido com **React + TypeScript**, seguindo boas práticas de arquitetura moderna, modular e escalável.

**Repositório:** [https://github.com/romulosm/luizalabs-challenge-frontend](https://github.com/romulosm/luizalabs-challenge-frontend)

---

## 🚀 Visão geral

Este frontend permite ao usuário:

- Autenticar via Spotify (OAuth 2.0)
- Visualizar artistas e playlists
- Navegar em álbuns
- Gerenciar playlists
- **Criar novas playlists**
- Visualizar perfil e informações pessoais

---

## 🔗 Dependência do backend

⚠️ Este projeto depende do backend disponível em:  
[https://github.com/romulosm/luizalabs-challenge](https://github.com/romulosm/luizalabs-challenge)

> O backend gerencia autenticação, lógica de integração com a API do Spotify, persistência de dados, entre outros fluxos.

---

## 💡 Por que usar Vite?

Escolhemos o **Vite** como bundler e dev server por diversos motivos:

- ⚡ **Velocidade**: inicialização extremamente rápida e HMR imediato.
- ✅ **Configuração simples**: zero-config na maioria dos casos.
- 🧩 **Suporte moderno**: otimizado para ES Modules e frameworks como React.
- 🌱 **Desempenho superior no build**: usa Rollup internamente para builds leves e rápidos.

---

## 🏛️ Por que essa arquitetura?

Optamos por uma **arquitetura modular e desacoplada**, dividindo responsabilidades em:

- **Components**: componentes reutilizáveis e isolados.
- **Contexts**: gerenciamento de estado global (ex.: autenticação).
- **Pages**: cada rota ou tela principal.
- **Services**: abstração das chamadas para APIs externas.
- **Hooks**: lógica compartilhada e reaproveitável.
- **Types**: tipagens consistentes com TypeScript.
- **Tests co-located**: testes ao lado do código original, facilitando manutenção.

Essa organização permite evoluir rapidamente, adicionar novas funcionalidades e manter o projeto escalável.

---

## ⚙️ Tech Stack

- **React** (com TypeScript)
- **Vite**
- **React Router**
- **Vitest** (testes unitários)
- **ESLint + Prettier**
- **PWA Support**

---

## 💻 Como rodar o projeto

1️⃣ Clone o repositório:

```bash
git clone https://github.com/romulosm/luizalabs-challenge-frontend.git
cd luizalabs-challenge-frontend
```

2️⃣ Instale as dependências:

```bash
npm install
```

3️⃣ Configure as variáveis de ambiente:  
Crie um arquivo `.env` na raiz com:

```
VITE_API_URL=http://localhost:3000
VITE_SPOTIFY_LOGOUT_URL=https://accounts.spotify.com/logout
```

4️⃣ Rode em modo desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

---

## 🏃‍♂️ Scripts

| Script               | Descrição                            |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Inicia o servidor de desenvolvimento |
| `npm run build`      | Gera o build para produção           |
| `npm run preview`    | Visualiza o build local              |
| `npm run lint`       | Executa lint nos arquivos            |
| `npm run format`     | Formata o código com Prettier        |
| `npm run test`       | Executa todos os testes              |
| `npm run test:watch` | Executa os testes em modo observação |

---

## 🧪 Testes

Este projeto utiliza **Vitest** para testes unitários, garantindo qualidade e segurança.

### 📄 Localização

Os testes ficam ao lado do código (co-located):

```
src/
├── components/__tests__/
├── contexts/__tests__/
├── pages/__tests__/
├── services/__tests__/
```

### ✅ O que é testado?

- Componentes: renderização, interações, estados.
- Contextos: lógica de provedores e hooks.
- Páginas: fluxo e integração.
- Serviços: chamadas de API, tratamento de erros.

### 💡 Rodar os testes

```bash
npm run test
```

Modo observação:

```bash
npm run test:watch
```

---

## 🟢 Autenticação com Spotify

A autenticação usa OAuth 2.0 com a API do Spotify.

Fluxo:
1️⃣ O usuário clica em **Login com Spotify**.  
2️⃣ Redirecionamento para a autorização do Spotify.  
3️⃣ Recebimento de **access token** e **refresh token**.  
4️⃣ Salvamento local (localStorage).  
5️⃣ Uso do token no header `Authorization` em todas as chamadas.

---

## ✅ Requisitos

- Node.js v18 ou superior
- Conta Spotify Developer (para obter client_id e client_secret)
- Callback URL configurado no painel do Spotify

---

## 📝 Contribuição

Contribuições são super bem-vindas! Abra issues ou envie pull requests.

---

## 📄 Licença

MIT

---

## 🌟 Agradecimentos

Obrigado por explorar este projeto!  
Feito com 💙 e muito café.
