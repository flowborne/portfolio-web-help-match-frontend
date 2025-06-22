import { RequestBody, RequestHeaders } from "~types/httpHook";

type RequestFunction = <T>(
  url: string,
  method?: "GET" | "POST" | "PUT" | "DELETE",
  data?: RequestBody | RequestBody[] | null,
  headers?: RequestHeaders,
  isAuthRequest?: boolean,
  isBinaryResponse?: boolean
) => Promise<T>;

export interface ChatRoomResponse {
  roomId:      string;
  productId:   string;
  participants: string[];
}

export interface ChatRoom {
  roomId:       string;
  productId:    string;
  participants: string[];
  unreadCount:  number;
  chatName:     string;
}

export interface ChatMessage {
  _id:      string;
  roomId:   string;
  senderId: { _id: string; userName: string };
  content:  string;
  createdAt: string;
  readBy:   string[];
}


export const createChatRoom = async (
  request: RequestFunction,
  productId: string
): Promise<ChatRoomResponse> => {
  const response = await request<ChatRoomResponse>(
    `/help/api/chat/rooms`,
    "POST",
    { productId }
  );
  return response;
};


export const getChatRooms = async (
  request: RequestFunction
): Promise<ChatRoom[]> => {
  const rooms = await request<ChatRoom[]>(
    `/help/api/chat/rooms`,
    "GET"
  );
  return rooms;
};


export const getChatHistory = async (
  request: RequestFunction,
  roomId: string,
  limit = 50,
  offset = 0
): Promise<ChatMessage[]> => {
  const messages = await request<ChatMessage[]>(
    `/help/api/chat/rooms/${roomId}/messages?limit=${limit}&offset=${offset}`,
    "GET"
  );
  return messages;
};


export const getChatParticipants = async (
  request: RequestFunction,
  roomId: string
): Promise<{ _id: string; userName: string }[]> => {
  const participants = await request<{ _id: string; userName: string }[]>(
    `/help/api/chat/rooms/${roomId}/participants`,
    "GET"
  );
  return participants;
};


export const getUnreadCount = async (
  request: RequestFunction,
  roomId: string
): Promise<{ count: number }> => {
  const data = await request<{ count: number }>(
    `/help/api/chat/rooms/${roomId}/unread-count`,
    "GET"
  );
  return data;
};
