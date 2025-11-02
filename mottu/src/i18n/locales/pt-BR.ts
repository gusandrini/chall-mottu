export default {
  common: { close: "Fechar", ok: "OK", back: "Voltar" },

  home: {
    welcomeTitle: "Bem-vindo(a) ao painel!",
    welcomeBody:
      "Aqui você gerencia clientes, funcionários, motos e manutenções do pátio de forma simples e rápida.",
    bullets: {
      clientsEmployees: "• Cadastre e gerencie clientes e funcionários",
      bikesMaintenances: "• Controle motos e ordens de manutenção",
      branchInfo: "• Visualize informações por filial e status",
      fullPanel: "• Painel completo com ações rápidas",
    },
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
  },

  profile: {
    title: "Dados do Funcionário",
    fields: {
      name: "Nome",
      email: "Email",
      role: "Cargo"
    },
    empty: "Nenhum dado encontrado.",
    actions: {
      logout: "Logout"
    },
    alerts: {
      errorTitle: "Erro",
      unauthenticated: "Usuário não autenticado!",
      loadError: "Não foi possível carregar os dados do funcionário.",
      logoutError: "Não foi possível sair da conta."
    }
  },
    login: {
    title: "Bem-vindo",
    subtitle: "Faça login para continuar",
    placeholders: {
      email: "Email",
      password: "Senha"
    },
    actions: {
      enter: "Entrar",
      register: "Não tem conta? Criar agora"
    },
    alerts: {
      warningTitle: "Atenção",
      fillFields: "Preencha e-mail e senha.",
      invalidTitle: "Dados inválidos",
      invalidMessage: "E-mail ou senha incorretos.",
      serverErrorTitle: "Erro no servidor",
      serverErrorMessage: "Tente novamente mais tarde.",
      errorTitle: "Erro",
      connectionError: "Não foi possível conectar ao servidor.",
      unexpectedError: "Erro inesperado. Verifique sua conexão."
    },
    loading: "Conectando com o servidor..."
  },
    maintenance: {
    titles: {
      add: "Adicionar Manutenção",
      edit: "Editar Manutenção"
    },
    placeholders: {
      motorId: "ID da Moto",
      description: "Descrição",
      entryDate: "Data Entrada (YYYY-MM-DD)",
      exitDate: "Data Saída (YYYY-MM-DD)"
    },
    actions: {
      add: "Adicionar",
      update: "Atualizar",
      backHome: "Voltar ao Home"
    },
    labels: {
      motor: "Moto",
      entry: "Entrada",
      exit: "Saída",
      open: "Em aberto"
    },
    alerts: {
      errorTitle: "Erro",
      successTitle: "Sucesso",
      loadError: "Não foi possível carregar as manutenções.",
      requiredFields: "Preencha os campos obrigatórios.",
      saveError: "Não foi possível salvar.",
      deleted: "Manutenção excluída!",
      updated: "Manutenção atualizada!",
      created: "Manutenção criada!",
      deleteError: "Não foi possível excluir."
    },
    confirm: {
      title: "Confirmação",
      message: "Deseja realmente excluir?",
      cancel: "Cancelar",
      delete: "Excluir"
    }
  },
    bikes: {
    titles: {
      add: "Cadastro de Motos",
      edit: "Editar Moto"
    },
    placeholders: {
      clientId: "ID Cliente",
      branchDeptId: "ID Filial Departamento",
      model: "Modelo",
      plate: "Placa",
      kmDriven: "Km Rodado",
      status: "Status"
    },
    actions: {
      add: "Adicionar",
      update: "Atualizar",
      backHome: "Voltar ao Home"
    },
    labels: {
      model: "Modelo",
      plate: "Placa",
      status: "Status",
      kmDriven: "Km Rodado"
    },
    alerts: {
      errorTitle: "Erro",
      successTitle: "Sucesso",
      loadError: "Não foi possível carregar as motos.",
      requiredFields: "Preencha todos os campos obrigatórios.",
      saveError: "Não foi possível salvar.",
      created: "Moto cadastrada!",
      updated: "Moto atualizada!"
    }
  },
    about: {
    title: "Sobre Nós",
    description:
      "Somos uma empresa especializada em soluções de locação de motos para diversos tipos de serviços. Nosso objetivo é oferecer qualidade, segurança e praticidade aos nossos clientes.",
    phone: "Telefone",
    email: "Email",
    hours: {
      title: "Funcionamento das bases:",
      weekdays: "Seg. a Sex. das 08:00 às 18:00",
      saturday: "Sáb. das 09:00 às 12:00"
    },
    version: "Versão",
    commit: "Commit",
    build: "Build",
    actions: {
      backHome: "Voltar ao Início"
    },

  }




};
