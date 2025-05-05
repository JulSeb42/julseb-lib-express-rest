import {
	BASE_SERVER_PATH,
	BASE_SHARED_PATH,
	TEMPLATES_PATH,
} from "../utils/index.js"
import type { NodePlopAPI } from "plop"

export default (plop: NodePlopAPI) => {
	const { setGenerator } = plop

	setGenerator("route", {
		description: "Generate route",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Enter route's name",
			},
		],
		actions: [
			"Creating new server route",
			{
				type: "add",
				path: `${BASE_SERVER_PATH}/routes/{{ kebabCase name }}.ts`,
				templateFile: `${TEMPLATES_PATH}/route/route.hbs`,
			},
			"Importing your new route to all the other routes",
			{
				type: "modify",
				path: `${BASE_SERVER_PATH}/routes/index.ts`,
				template:
					'import {{ camelCase name }} from "./{{ kebabCase name }}"\n$1',
				pattern:
					/(\/\* Prepend import new route - DO NOT REMOVE \*\/)/g,
			},
			"Adding your new route to the router",
			{
				type: "modify",
				path: `${BASE_SERVER_PATH}/routes/index.ts`,
				template:
					"router.use(SERVER_PATHS.{{ constantCase name }}.ROOT, {{ camelCase name }})\n$1",
				pattern: /(\/\* Prepend router use - DO NOT REMOVE \*\/)/g,
			},
			"Creating a new type",
			{
				type: "add",
				path: `${BASE_SHARED_PATH}/types/{{ pascalCase name }}.type.ts`,
				templateFile: `${TEMPLATES_PATH}/types/type.hbs`,
			},
			"Exporting your new type",
			{
				type: "modify",
				path: `${BASE_SHARED_PATH}/types/index.ts`,
				template: `export * from "./{{ pascalCase name }}.type"\n$1`,
				pattern: /(\/\* Prepend export new type - DO NOT REMOVE \*\/)/g,
			},
			"Creating a new model",
			{
				type: "add",
				path: `${BASE_SERVER_PATH}/models/{{ pascalCase name }}.model.ts`,
				templateFile: `${TEMPLATES_PATH}/model.hbs`,
			},
			"Exporting the new model",
			{
				type: "modify",
				path: `${BASE_SERVER_PATH}/models/index.ts`,
				template: 'export * from "./{{ pascalCase name }}.model"\n$1',
				pattern: /(\/\* Prepend new model - DO NOT REMOVE \*\/)/g,
			},
			"Creating new server path",
			{
				type: "modify",
				path: `${BASE_SHARED_PATH}/server-paths.ts`,
				template: `{{ constantCase name }}: "/{{ kebabCase name }}",\n\t$1`,
				pattern: /(\/\* Prepend path root - DO NOT REMOVE \*\/)/g,
			},
			"Creating basic API calls",
			{
				type: "modify",
				path: `${BASE_SHARED_PATH}/server-paths.ts`,
				template:
					'{{ constantCase name }}: {\n\t\tROOT: SERVER_PATH_ROOTS.{{ constantCase name }},\n\t\tALL_{{ constantCase name }}S: "/all-{{ kebabCase name }}",\n\t\tGET_{{ constantCase name }}: (id = ":id") => `/{{ kebabCase name }}/${id}`,\n\t},\n\t$1',
				pattern: /(\/\* Prepend server path - DO NOT REMOVE \*\/)/g,
			},
		],
	})
}
