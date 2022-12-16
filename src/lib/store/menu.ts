import { writable, type Writable } from "svelte/store";

const toggleMenu: Writable<boolean> = writable(false);

export const toggle = () => {
	toggleMenu.update((value) => !value);
};

export default toggleMenu;