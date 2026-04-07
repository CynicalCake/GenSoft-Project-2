const {
  registerTeacher,
} = require("../../src/application/services/registerTeacherService");

describe("registerTeacher service", () => {
  test("registers teacher when institution already exists", async () => {
    const institutionRepository = {
      findByName: jest.fn().mockResolvedValue({ id: 10, name: "UE 1" }),
      create: jest.fn(),
    };

    const teacherRepository = {
      create: jest.fn().mockResolvedValue({ id: 50 }),
    };

    const notifier = {
      notify: jest.fn(),
    };

    const result = await registerTeacher(
      {
        fullName: "Ana Perez",
        email: "ana@correo.com",
        institutionName: "UE 1",
      },
      { teacherRepository, institutionRepository, notifier },
    );

    expect(institutionRepository.findByName).toHaveBeenCalledWith("UE 1");
    expect(institutionRepository.create).not.toHaveBeenCalled();
    expect(teacherRepository.create).toHaveBeenCalledWith({
      fullName: "Ana Perez",
      email: "ana@correo.com",
      institutionId: 10,
    });

    expect(result.success).toBe(true);
    expect(result.data.createdInstitution).toBe(false);
    expect(notifier.notify).toHaveBeenCalledWith(result);
  });

  test("creates institution when it does not exist in catalog", async () => {
    const institutionRepository = {
      findByName: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 22, name: "UE 2" }),
    };

    const teacherRepository = {
      create: jest.fn().mockResolvedValue({ id: 80 }),
    };

    const notifier = {
      notify: jest.fn(),
    };

    const result = await registerTeacher(
      {
        fullName: "Luis Gomez",
        email: "luis@correo.com",
        institutionName: "UE 2",
      },
      { teacherRepository, institutionRepository, notifier },
    );

    expect(institutionRepository.create).toHaveBeenCalledWith({ name: "UE 2" });
    expect(result.success).toBe(true);
    expect(result.data.createdInstitution).toBe(true);
    expect(notifier.notify).toHaveBeenCalledWith(result);
  });

  test("returns error when full name is missing", async () => {
    const institutionRepository = {
      findByName: jest.fn(),
      create: jest.fn(),
    };

    const teacherRepository = {
      create: jest.fn(),
    };

    const notifier = {
      notify: jest.fn(),
    };

    const result = await registerTeacher(
      {
        fullName: "",
        email: "ana@correo.com",
        institutionName: "UE 1",
      },
      { teacherRepository, institutionRepository, notifier },
    );

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/nombre completo/i);
    expect(teacherRepository.create).not.toHaveBeenCalled();
    expect(notifier.notify).toHaveBeenCalledWith(result);
  });

  test("returns error when email format is invalid", async () => {
    const institutionRepository = {
      findByName: jest.fn(),
      create: jest.fn(),
    };

    const teacherRepository = {
      create: jest.fn(),
    };

    const notifier = {
      notify: jest.fn(),
    };

    const result = await registerTeacher(
      {
        fullName: "Mario Lopez",
        email: "correo-invalido",
        institutionName: "UE 1",
      },
      { teacherRepository, institutionRepository, notifier },
    );

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/correo/i);
    expect(teacherRepository.create).not.toHaveBeenCalled();
    expect(notifier.notify).toHaveBeenCalledWith(result);
  });

  test("returns failure notification when repository throws error", async () => {
    const institutionRepository = {
      findByName: jest.fn().mockResolvedValue({ id: 10, name: "UE 1" }),
      create: jest.fn(),
    };

    const teacherRepository = {
      create: jest.fn().mockRejectedValue(new Error("DB error")),
    };

    const notifier = {
      notify: jest.fn(),
    };

    const result = await registerTeacher(
      {
        fullName: "Ana Perez",
        email: "ana@correo.com",
        institutionName: "UE 1",
      },
      { teacherRepository, institutionRepository, notifier },
    );

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/db error/i);
    expect(notifier.notify).toHaveBeenCalledWith(result);
  });
});
