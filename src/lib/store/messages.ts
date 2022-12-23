import { writable, type Writable } from "svelte/store";

function newMessageStore() {
	const { subscribe, set, update }: Writable<Array<Message>> = writable([]);

	function initMessages(messages: Message[]) {
		set(messages);
	}

	function updateMessage(messageId: string) {
		update((messages) => {
			const index = messages.findIndex((m) => m.id === messageId);
			if (index !== -1) {
				messages[index].seen = true;
			}

			return messages;
		});
	}

	function updateData(messages: Message[]) {
		set(messages);
	}

	function deleteMessage(messageId: string) {
		update((messages) => {
			const index = messages.findIndex((m) => m.id === messageId);
			if (index !== -1) {
				messages.splice(index, 1);
			}
			return messages;
		});
	}

	return {
		subscribe,
		initMessages,
		updateMessage,
		updateData,
		deleteMessage,
		add: (message: Message) => update((messages) => [...messages, message]),
		clear: () => set([]),
	};
}

const messageStore = newMessageStore();
export default messageStore;