import { IChatMessage } from "./chat-message.interface";

type JSONString<T> = string & { __jsonType?: T };

export interface IChatMessageResponse {
  body: JSONString<IChatMessage>;
}
