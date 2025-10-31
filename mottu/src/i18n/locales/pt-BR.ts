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
    },
    clients: {
    placeholders: {
      name: "Nome",
      email: "Email",
      cpf: "CPF",
      addressIdOptional: "ID LOGRADOURO (opcional)"
    },
    actions: {
      add: "Adicionar Cliente",
      update: "Atualizar Cliente",
      clear: "Limpar Campos",
      backHome: "Voltar ao Home"
    },
    labels: {
      cpf: "CPF",
      addressId: "Logradouro ID"
    },
    empty: "Nenhum cliente cadastrado.",
    alerts: {
      errorTitle: "Erro",
      successTitle: "Sucesso",
      loadError: "Não foi possível carregar os clientes.",
      requiredFields: "Preencha Nome, Email e CPF!",
      invalidEmail: "Digite um e-mail válido!",
      invalidCpf: "CPF deve ter 11 dígitos.",
      created: "Cliente criado!",
      updated: "Cliente atualizado!",
      deleted: "Cliente excluído!",
      saveError: "Não foi possível salvar.",
      deleteError: "Não foi possível excluir."
    },
    confirm: {
      title: "Confirmação",
      message: "Deseja realmente excluir?",
      cancel: "Cancelar",
      delete: "Excluir"
    }
  }
  }
};
