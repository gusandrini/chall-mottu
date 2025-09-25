# 🛵 Sistema de Gestão de Frotas - Mottu

> Solução inteligente para rastreamento e organização de motos nos pátios da Mottu, com visão computacional e aplicativo mobile.

---

## 👥 Integrantes

| Nome Completo        | RM       | Turma   |
|----------------------|----------|---------|
| Gustavo Sandrini     | 557505   | 2TDSPW  |
| Eduarda Tiemi        | 554756   | 2TDSPH  |
| Felipe Pizzinato     | 555141   | 2TDSPH  |

---

## 💡 Descrição da Solução

A Mottu enfrenta dificuldades na gestão de frotas em suas filiais. Para resolver isso, desenvolvemos uma solução inovadora que integra:

- 🎥 **Câmeras com visão computacional** para leitura automática de placas  
- 🧠 **Reconhecimento inteligente** de entrada, saída e movimentações das motos  
- 🖥️ **Painel web centralizado** para monitoramento em tempo real  
- 📱 **Aplicativo mobile** para que funcionários atualizem e consultem dados do pátio  

Essa solução traz **agilidade**, **rastreamento preciso** e **organização eficiente** para os pátios da Mottu.

---

## 🛠️ Tecnologias Utilizadas

- ⚛️ **React Native (Expo)** – Interface mobile  
- 🧠 **Vision AI / OCR** – Leitura de placas via câmera  
- ☕ **Spring Boot (Java)** – Backend robusto e escalável  
- 🐬 **Oracle DB / MySQL** – Armazenamento e gestão de dados  

---

## ▶️ Como Rodar o Projeto Localmente

### 📦 Clone o repositório
```bash
git clone https://github.com/gusandrini/chall-mottu.git
```

### 📁 Acesse a pasta principal do projeto
```bash
cd mottu
```


### ▶️ Como rodar o mobile
npm install

npx expo start

Android: pressione "a" | iOS: "i" | Web: "w"

### Backend usado (Render)
Base URL: https://mottu-java.onrender.com

Observação: o primeiro acesso pode demorar ~1–2 min (cold start grátis).


Você poderá escanear o QR Code exibido com o aplicativo **Expo Go** em seu dispositivo (Obs: Em IOS é necessário estar conectado na mesma internet).

---

## 🔐 Login de Teste

Use as credenciais abaixo para acessar o sistema:

- **Email:** `carlos.silva@empresa.com`  
- **Senha:** `123456`

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, verifique se você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org)
- [Java 17+](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Maven](https://maven.apache.org)
- [MySQL ou Oracle DB](https://www.mysql.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

---
### 📦 Estrutura de Pastas (mobile)
mottu/
  src/
    api/              # axios + endpoints
    components/       # Header, Footer, Home
    context/          # ThemeContext
    models/           # Tipos TS (Cliente, Moto, etc.)
    screens/          # Telas (Login, Cliente, Moto, Manutencao, etc.)
    services/         # SessionProvider (auth)
    theme/            # Paleta de cores
  App.tsx
  package.json

---

## 📝 Observações Importantes

- Toda movimentação de motos é **registrada automaticamente** com **data, hora e localização**.  
- O backend já está preparado para futuras integrações com **tecnologias IoT** (sensores, rastreamento, etc.).  
- A comunicação entre os módulos é feita via **API REST**, garantindo **escalabilidade, segurança e facilidade de manutenção**.  
- A aplicação foi **deployada em ambiente na nuvem**. No plano gratuito pode ocorrer uma **demora inicial** para o servidor acordar e responder às requisições.  


---

## 📎 Repositórios

🔗 MOBILE   -> [https://github.com/gusandrini/chall-mottu](https://github.com/gusandrini/chall-mottu)

🔗 API JAVA -> [https://github.com/gusandrini/mottu-java](https://github.com/gusandrini/mottu-java)

## 📎 Deploy API
🔗 [https://mottu-java.onrender.com/h2-console](https://mottu-java.onrender.com/h2-console)

---

## 🚀 Futuras Melhorias

- Integração com sensores físicos nos portões  
- Dashboard analítico com gráficos de movimentações  
- Reconhecimento facial para segurança adicional  
- Notificações em tempo real no app  

---

📍 *Desenvolvido com dedicação para a Mottu.*
