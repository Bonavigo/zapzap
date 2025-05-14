export interface IChatMessage {
  sender: string;
  content: string | string[];
  roomId: string;
  type: "CHAT" | "JOIN" | "LEAVE" | "USER_LIST";
}
