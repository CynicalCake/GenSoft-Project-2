const {
  validateTeacherRegistration,
} = require("../../domain/validators/teacherRegistrationValidator");

async function notifyResult(notifier, result) {
  if (!notifier || typeof notifier.notify !== "function") {
    return;
  }

  await notifier.notify(result);
}

async function registerTeacher(input, dependencies) {
  const { teacherRepository, institutionRepository, notifier } =
    dependencies || {};

  try {
    if (!teacherRepository || typeof teacherRepository.create !== "function") {
      throw new Error("TeacherRepository no esta configurado.");
    }

    if (
      !institutionRepository ||
      typeof institutionRepository.findByName !== "function"
    ) {
      throw new Error("InstitutionRepository no esta configurado.");
    }

    const validInput = validateTeacherRegistration(input);

    let institution = await institutionRepository.findByName(
      validInput.institutionName,
    );
    let createdInstitution = false;

    if (!institution) {
      if (typeof institutionRepository.create !== "function") {
        throw new Error("InstitutionRepository no puede crear instituciones.");
      }

      institution = await institutionRepository.create({
        name: validInput.institutionName,
      });
      createdInstitution = true;
    }

    const teacher = await teacherRepository.create({
      fullName: validInput.fullName,
      email: validInput.email,
      institutionId: institution.id,
    });

    const successResult = {
      success: true,
      message: "Registro de docente exitoso.",
      data: {
        teacherId: teacher.id,
        institutionId: institution.id,
        createdInstitution,
      },
    };

    await notifyResult(notifier, successResult);
    return successResult;
  } catch (error) {
    const errorResult = {
      success: false,
      message: error.message || "No se pudo registrar al docente.",
      data: null,
    };

    await notifyResult(notifier, errorResult);
    return errorResult;
  }
}

module.exports = {
  registerTeacher,
};
