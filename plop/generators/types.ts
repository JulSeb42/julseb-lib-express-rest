import { BASE_SHARED_PATH, TEMPLATES_PATH } from "../utils/index.js"
import type { NodePlopAPI } from "plop"

export default (plop: NodePlopAPI) => {
	const { setGenerator } = plop

	setGenerator("type", {
		description: "TS type",
		prompts: [
			{ type: "input", name: "name", message: "Enter's name" },
			{
				type: "confirm",
				name: "interface",
				message: "Create it as interface?",
				default: false,
			},
		],
		actions: data => {
			const extensionPrepend = data?.interface ? "interface" : "type"
			const fileName = `{{ pascalCase name }}.${extensionPrepend}`

			const actions = [
				{
					type: "add",
					path: `${BASE_SHARED_PATH}/types/${fileName}.ts`,
					templateFile: `${TEMPLATES_PATH}/types/${extensionPrepend}.hbs`,
				},
				{
					type: "modify",
					path: `${BASE_SHARED_PATH}/types/index.ts`,
					template: `export * from "./${fileName}"\n$1`,
					pattern:
						/(\/\* Prepend export new type - DO NOT REMOVE \*\/)/g,
				},
			]

			return actions
		},
	})
}
