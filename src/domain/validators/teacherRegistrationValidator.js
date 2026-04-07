function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateTeacherRegistration(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Debe enviar los datos del docente.");
  }

  const fullName = (input.fullName || "").trim();
  const email = (input.email || "").trim();
  const institutionName = (input.institutionName || "").trim();

  if (!fullName) {
    throw new Error("El nombre completo es obligatorio.");
  }

  if (!email) {
    throw new Error("El correo electronico es obligatorio.");
  }

  if (!isValidEmail(email)) {
    throw new Error("El formato del correo electronico no es valido.");
  }

  if (!institutionName) {
    throw new Error("La unidad educativa es obligatoria.");
  }

  return {
    fullName,
    email,
    institutionName,
  };
}

module.exports = {
  validateTeacherRegistration,
};
