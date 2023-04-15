export interface Message {
	user: { name: string; avatar: string; };
	text: string;
	reply: boolean;
}