
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_0ctO3BHkPs-4snwJuvUq1ilm3rafBIeTauE28NQFfk4AreLsE26zVgZJZ0KNPeVs",
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
