export interface IChatMessage {
  sender: string;
  content: string;
  roomId: string;
  type: "CHAT" | "JOIN" | "LEAVE";
}
