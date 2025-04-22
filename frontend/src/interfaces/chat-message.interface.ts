export interface IChatMessage {
  sender: string;
  content: string;
  type: "CHAT" | "JOIN" | "LEAVE";
}
