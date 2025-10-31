export default {
  common: { close: "Cerrar", ok: "OK", back: "Volver" },

  home: {
    language: {
      title: "Selecciona el idioma",
      button: "Idioma",
      portuguese: "Portugués (Brasil)",
      spanish: "Español (España)",
      portugueseShort: "PT-BR",
      spanishShort: "ES-ES"
    },
    // (opcional, para o modal de boas-vindas)
    welcomeTitle: "🎉 ¡Bienvenido al sistema de Mottu!",
    welcomeBody: "Aquí gestionas con practicidad y agilidad todas las operaciones esenciales de tu unidad.",
    bullets: {
      clientsEmployees: "✔ Clientes y Empleados",
      bikesMaintenances: "✔ Motos y Mantenimientos",
      branchInfo: "✔ Información de la Sucursal",
      fullPanel: "✔ Panel completo y práctico"
    },

    start: "Empezar 🚀",
    mainTitle: "Control Inteligente",
    mainSubtitle: "Mottu en Movimiento",
    mainDescription: "Gestiona todas las operaciones esenciales de tu unidad con agilidad y seguridad.",
    buttons: {
      client: "Cliente",
      bike: "Moto",
      maintenance: "Mantenimiento",
      employee: "Empleado",
      about: "Sobre Nosotros"
    },
    theme: {
      lightMode: "Modo Claro",
      darkMode: "Modo Oscuro"
    }
  },

  employeeForm: {
    labels: {
      name: "Nombre",
      corpEmail: "Correo Corporativo",
      password: "Contraseña",
      role: "Cargo",
      branchIdOptional: "ID Sucursal (opcional)"
    },
    placeholders: {
      name: "Escribe el nombre",
      corpEmail: "ejemplo@empresa.com",
      password: "Escribe la contraseña",
      role: "Escribe el cargo",
      branchId: "Escribe el ID de la sucursal"
    },
    actions: {
      saveEmployee: "Guardar Empleado"
    },
    loading: "Creando empleado...",
    alerts: {
      errorTitle: "Error",
      required: "¡Completa todos los campos obligatorios!",
      invalidEmail: "¡Introduce un correo corporativo válido!",
      successTitle: "Éxito",
      created: "¡Empleado registrado!",
      unauthorizedTitle: "No autorizado",
      unauthorizedMsg: "Tu token es inválido o expiró. Inicia sesión nuevamente.",
      forbiddenTitle: "Acceso denegado",
      forbiddenMsg: "No tienes permiso para registrar empleados.",
      unknownServerError: "Error desconocido en el servidor.",
      cannotConnect: "No fue posible conectar con el servidor.",
      errorCode: "Error"
    }
  },
  clients: {
    placeholders: {
      name: "Nombre",
      email: "Correo",
      cpf: "CPF",
      addressIdOptional: "ID DIRECCIÓN (opcional)"
    },
    actions: {
      add: "Añadir Cliente",
      update: "Actualizar Cliente",
      clear: "Limpiar Campos",
      backHome: "Volver al Home"
    },
    labels: {
      cpf: "CPF",
      addressId: "ID Dirección"
    },
    empty: "No hay clientes registrados.",
    alerts: {
      errorTitle: "Error",
      successTitle: "Éxito",
      loadError: "No fue posible cargar los clientes.",
      requiredFields: "¡Completa Nombre, Correo y CPF!",
      invalidEmail: "¡Introduce un correo válido!",
      invalidCpf: "El CPF debe tener 11 dígitos.",
      created: "¡Cliente creado!",
      updated: "¡Cliente actualizado!",
      deleted: "¡Cliente eliminado!",
      saveError: "No fue posible guardar.",
      deleteError: "No fue posible eliminar."
    },
    confirm: {
      title: "Confirmación",
      message: "¿Realmente deseas eliminar?",
      cancel: "Cancelar",
      delete: "Eliminar"
    }
  },
   profile: {
    title: "Datos del Empleado",
    fields: {
      name: "Nombre",
      email: "Correo",
      role: "Cargo"
    },
    empty: "No se encontraron datos.",
    actions: {
      logout: "Cerrar sesión"
    },
    alerts: {
      errorTitle: "Error",
      unauthenticated: "¡Usuario no autenticado!",
      loadError: "No fue posible cargar los datos del empleado.",
      logoutError: "No fue posible cerrar la sesión."
    }
  }
};
