# 🛵 Sistema de Gestão de Frotas - Mottu

> Solução inteligente para rastreamento e organização de motos nos pátios da Mottu, com visão computacional e aplicativo mobile.

---

## 👥 Integrantes

| Nome Completo        | RM       |
|----------------------|----------|
| Gustavo Sandrini     | 557505   |
| Eduarda Tiemi        | 554756   |
| Felipe Pizzinato     | 555141   |

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


### 📱 App Mobile (React Native com Expo)
```bash
cd mobile
npm install
npm start
```

Ou, se quiser abrir diretamente no celular:
```bash
npx expo start --tunnel
```

Você poderá escanear o QR Code exibido com o aplicativo **Expo Go** em seu dispositivo.

---

## 🔐 Login de Teste

Use as credenciais abaixo para acessar o sistema:

- **Email:** `teste@teste.com`  
- **Senha:** `000000`

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, verifique se você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org)
- [Java 17+](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Maven](https://maven.apache.org)
- [MySQL ou Oracle DB](https://www.mysql.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

---

## 📝 Observações Importantes

- Toda movimentação de motos é **registrada automaticamente** com **data**, **hora** e **localização**.  
- O backend está preparado para futuras integrações com outras tecnologias como sensores IoT.  
- A comunicação entre os módulos é feita via **API REST**, garantindo escalabilidade e segurança.  

---

## 📎 Repositório

🔗 [https://github.com/gusandrini/chall-mottu](https://github.com/gusandrini/chall-mottu)

---

## 🚀 Futuras Melhorias

- Integração com sensores físicos nos portões  
- Dashboard analítico com gráficos de movimentações  
- Reconhecimento facial para segurança adicional  
- Notificações em tempo real no app  

---

📍 *Desenvolvido com dedicação para a Mottu.*
