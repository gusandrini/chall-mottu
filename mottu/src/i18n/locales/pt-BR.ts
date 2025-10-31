export default {
  common: { close: "Fechar", ok: "OK", back: "Voltar" },

  home: {
    language: {
      title: "Selecione o idioma",
      button: "Idioma",
      portuguese: "Português (Brasil)",
      spanish: "Espanhol (Espanha)",
      portugueseShort: "PT-BR",
      spanishShort: "ES-ES"
    },
    start: "Começar 🚀",
    mainTitle: "Controle Inteligente",
    mainSubtitle: "Mottu em Movimento",
    mainDescription: "Gerencie todas as operações essenciais da sua unidade com agilidade e segurança.",
    buttons: {
      client: "Cliente",
      bike: "Moto",
      maintenance: "Manutenção",
      employee: "Funcionário",
      about: "Sobre Nós"
    },
    theme: {
      lightMode: "Modo Claro",
      darkMode: "Modo Escuro"
    }
  },

  employeeForm: {
    labels: {
      name: "Nome",
      corpEmail: "Email Corporativo",
      password: "Senha",
      role: "Cargo",
      branchIdOptional: "ID Filial (opcional)"
    },
    placeholders: {
      name: "Digite o nome",
      corpEmail: "exemplo@empresa.com",
      password: "Digite a senha",
      role: "Digite o cargo",
      branchId: "Digite o ID da filial"
    },
    actions: {
      saveEmployee: "Salvar Funcionário"
    },
    loading: "Criando funcionário...",
    alerts: {
      errorTitle: "Erro",
      required: "Preencha todos os campos obrigatórios!",
      invalidEmail: "Digite um e-mail corporativo válido!",
      successTitle: "Sucesso",
      created: "Funcionário cadastrado!",
      unauthorizedTitle: "Não autorizado",
      unauthorizedMsg: "Seu token é inválido ou expirou. Faça login novamente.",
      forbiddenTitle: "Acesso negado",
      forbiddenMsg: "Você não tem permissão para cadastrar funcionários.",
      unknownServerError: "Erro desconhecido no servidor.",
      cannotConnect: "Não foi possível conectar ao servidor.",
      errorCode: "Erro"
    }
  }
};
