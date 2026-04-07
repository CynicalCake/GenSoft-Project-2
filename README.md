# GenSoft-Project-2

Primera parte del backend para registro de docentes con enfoque TDD (Jest).

## Lo que ya incluye esta iteracion

- Caso de uso de registro de docente en backend (sin API HTTP por ahora).
- Validaciones basicas:
	- nombre completo obligatorio
	- correo obligatorio
	- formato de correo valido
	- unidad educativa obligatoria
- Logica de catalogo institucional:
	- si la unidad existe, se reutiliza
	- si no existe, se crea y se incorpora
- Notificacion de resultado (exito o error) via adaptador de notificacion.
- Tests unitarios basicos con Jest.

## Estructura

```
__tests__/
	unit/
		registerTeacherService.test.js
src/
	application/
		ports/
			institutionRepositoryPort.js
			teacherRepositoryPort.js
		services/
			registerTeacherService.js
	domain/
		validators/
			teacherRegistrationValidator.js
	infrastructure/
		notifications/
			consoleNotifier.js
		repositories/
			postgres/
				institutionPostgresRepository.js
				teacherPostgresRepository.js
db/
	schema.sql
```

## Ejecutar tests

```bash
npm test
```

## Flujo TDD aplicado

1. Se escribieron primero los tests de `registerTeacher`.
2. Se implemento el servicio y validaciones para pasar los tests.
3. Se dejo la base de repositorios para PostgreSQL sin acoplar tests a BD real.

## PostgreSQL (siguiente paso)

La configuracion real de PostgreSQL todavia no esta conectada al proyecto.
Ya existe `db/schema.sql` con tablas base para empezar.

Cuando quieras, en la siguiente iteracion te ayudo a:

1. agregar la dependencia `pg`
2. crear el cliente de conexion por variables de entorno
3. ejecutar `schema.sql` en tu base local
4. crear tests de integracion minimos contra Postgres