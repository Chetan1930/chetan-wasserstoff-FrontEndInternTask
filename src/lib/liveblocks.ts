
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_API_KEY!,
});

type Presence = {
  cursor: { x: number; y: number } | null;
  name: string;
  color: string;
  cursorPosition: number;
  selectionStart?: number;
  selectionEnd?: number;
};

type Storage = {
  content: string;
};

export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useOthers,
  useMutation,
  useStorage,
  useBroadcastEvent,
  useEventListener,
} = createRoomContext<Presence, Storage>(client);
