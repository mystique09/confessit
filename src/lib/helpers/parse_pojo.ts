export const parseNonPOJO = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}