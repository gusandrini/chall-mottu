# 🛵 **Mottu – Sistema Inteligente de Gestão de Frotas**

> Solução integrada para rastreamento e organização de motos nos pátios da **Mottu**, utilizando **visão computacional**, **inteligência artificial** e **aplicativo mobile**.

---

## 👥 **Integrantes**

| Nome Completo        | RM     | Turma   |
|----------------------|--------|---------|
| **Gustavo Sandrini** | 557505 | 2TDSPW  |
| **Eduarda Tiemi**    | 554756 | 2TDSPH  |
| **Felipe Pizzinato** | 555141 | 2TDSPW  |

---

## 💡 **Descrição da Solução**

A **Mottu** enfrenta desafios no controle de entrada, saída e localização das motos em seus pátios.  
Nossa solução unifica **visão computacional**, **inteligência de dados** e **mobilidade** para resolver o problema de forma moderna e escalável:

- 🎥 **Câmeras com visão computacional (OCR)** para leitura automática de placas
- 🧠 **Reconhecimento inteligente** para registrar movimentações e eventos
- 🖥️ **Painel web centralizado** para monitoramento em tempo real
- 📱 **Aplicativo mobile (Android/iOS)** para uso pelos colaboradores
- 🌎 **Suporte multilíngue** no app (**pt-BR / es-ES**)

Entrega **agilidade**, **rastreamento preciso** e **organização eficiente**.

---

## 🧰 **Tecnologias Utilizadas**

| Camada                 | Tecnologias                                                                 |
|------------------------|------------------------------------------------------------------------------|
| **Frontend Mobile**    | ⚛️ React Native (Expo), TypeScript, React Navigation, Context API, AsyncStorage |
| **Backend**            | ☕ Spring Boot (Java 17), Spring Security (JWT), JPA/Hibernate               |
| **Banco de Dados**     | 🐬 MySQL / Oracle                                                            |
| **Visão Computacional**| 🧠 OCR / Vision AI (Leitura de placas)                                      |
| **Infra & Deploy**     | ☁️ Render, Firebase App Distribution, EAS Build                             |
| **Internacionalização**| 🌐 i18n (pt-BR / es-ES)                                                      |

---

## 📺 **Demonstração**

🔗 **Vídeo**: [https://www.youtube.com/watch?v=NHxCBjBFrJE](https://youtu.be/gazzEQWqWMg)

---

## ▶️ **Como Rodar o Projeto (Mobile)**

### 1) Clonar o repositório
```bash
git clone https://github.com/gusandrini/chall-mottu.git
cd mottu
```

### 2) Instalar dependências
```bash
npm install
```

### 3) Executar
```bash
npx expo start
```
**Atalhos:** Android = `a` | iOS = `i` | Web = `w`  
> No iOS, o **Expo Go** precisa estar na mesma rede Wi-Fi.

---

## 🌐 **Backend (Render Cloud)**

**Base URL:** https://mottu-java.onrender.com

> ⚠️ O primeiro acesso pode demorar **3–5 min** devido ao *cold start* do plano gratuito.

---

## 🔐 **Login de Teste**

| Email                         | Senha   |
|------------------------------|---------|
| `carlos.silva@empresa.com`   | `123456`|

---

## 🗂️ **Estrutura de Pastas (Mobile)**

```
mottu/
│
├──android
│   ├── #app
│
├──assets
│   ├── #icons
│
├──scripts
│   ├──update-commit-hash.cjs
│
├── src/
│   ├── api/              # axios + endpoints
│   ├── components/       # Header, Footer, etc.
│   ├── context/          # ThemeContext
│   ├── i18n/             # locales (pt-BR, es-ES) + I18nProvider
│   ├── images/           # logos e imagens
│   ├── models/           # Tipos/Interfaces TS
│   ├── screens/          # Telas (Login, Cliente, Moto, Manutencao, etc.)
│   ├── services/         # SessionProvider (auth)
│   ├── theme/            # Paleta de cores
│   └── Notificacao.ts    # Funções de notificação
│
├── App.tsx
├── app.json
├── eas.json
├── index.tsx
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## 🧩 **Principais Funcionalidades**

- 📸 Leitura de placas (OCR)
- 🕒 Registro de entrada/saída com **data, hora e localização**
- 🧾 Histórico completo de movimentações
- 🔐 Autenticação via **JWT**
- 🌎 **i18n** (pt-BR / es-ES)
- 🔔 **Notificações** locais no app
- 🌓 Tema **claro/escuro** consistente

---

## 📦 **Requisitos**

- [Node.js](https://nodejs.org)  
- [Java 17+](https://www.oracle.com/java/technologies/javase-downloads.html)  
- [Maven](https://maven.apache.org)  
- [MySQL ou Oracle DB](https://www.mysql.com/)  
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

---

## 🔗 **Repositórios & Deploys**

- **Mobile (GitHub):** https://github.com/gusandrini/chall-mottu  
- **API (GitHub):** https://github.com/gusandrini/mottu-java  
- **API Online (H2 Console):** https://mottu-java.onrender.com/h2-console  
- **Build EAS (Expo):** https://expo.dev/accounts/sandroka/projects/mottu/builds/d47f4387-357e-4312-8d2a-e4bd3c0f19a7  
- **Firebase App Distribution (Android):** https://console.firebase.google.com/u/2/project/challengemottu/appdistribution/app/android:com.challengemottu/releases

> **Nota:** Professor adicionado como *tester* no Firebase App Distribution.

---

## 📝 **Observações Importantes**

- Toda movimentação de motos é **registrada automaticamente** com **data, hora e localização**.  
- O backend está preparado para futuras integrações com **IoT** (sensores, rastreamento).  
- Comunicação entre módulos via **API REST**, garantindo **escalabilidade** e **manutenção**.  
- Deploy em **nuvem** (Render/Firebase); *cold start* pode causar **demora inicial**.

---

## 🚀 **Futuras Melhorias**

- Integração com **sensores físicos** nos portões  
- **Dashboard analítico** com gráficos de movimentações  
- **Reconhecimento facial** para segurança adicional  
- **Rastreamento GPS** em tempo real (módulo IoT)

---

📍 *Desenvolvido com dedicação para a Mottu por alunos FIAP.*
