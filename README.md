# ⚽ Sorteio de Jogadores - Futebol dos Amigos

Uma aplicação simples e eficiente para realizar sorteios automáticos de jogadores de futebol. Ideal para jogos entre amigos, peladas de fim de semana e torneios amadores.

## 📸 Preview

![preview](./src/assets/logo.png)

## 🚀 Funcionalidades

- ✅ Inserção de jogadores manualmente ou via colagem de listas
- ✅ Tratamento automático de nomes duplicados e entradas inválidas
- ✅ Sorteio aleatório em tempo real
- ✅ Compartilhamento do resultado via **WhatsApp**
- ✅ Layout responsivo com **TailwindCSS**
- ✅ Animação de loading entre sorteios
- ✅ Suporte a captura de tela (screenshot)

## 🧪 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [html2canvas](https://www.npmjs.com/package/html2canvas) (para gerar imagem do sorteio)
- [TypeScript](https://www.typescriptlang.org/)

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/sorteio-futebol.git
cd sorteio-futebol
npm install
npm run dev
```

Acesse em: `http://localhost:3000`

## 📱 Compartilhamento via WhatsApp

Após o sorteio, você pode gerar uma imagem do resultado e compartilhar com os amigos diretamente no WhatsApp com um clique.

## ✍️ Personalização

Você pode alterar o título, tema, animações e adicionar regras de montagem dos times conforme as preferências do grupo.

## 🖼️ Captura de Tela

A função de screenshot usa `html2canvas` para transformar o resultado do sorteio em imagem:

```ts
const canvas = await html2canvas(refElement);
const imageUrl = canvas.toDataURL("image/png");
```

## 📄 Licença

Este projeto é de código aberto e gratuito para uso e modificação.

---

Desenvolvido com ❤️ para a comunidade boleira.
