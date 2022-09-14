import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { config } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
import { on, webhooks } from "https://deno.land/x/github_webhooks@0.1.0/mod.ts";
import * as smallbotmatrix from "https://raw.githubusercontent.com/cybertim/SmallBotMatrix/main/mod.ts";

// const crypto = require('crypto');
const config = {
  appId: Deno.env.get("MATRIX_ACCESS_TOKEN"),
  homeserver: Deno.env.get("MATRIX_SERVER_NAME") || generateSecret(),
  roomId: Deno.env.get("GITHUB_WEBHOOK_ROOM_ID"),
};

serve((_req) => {
  const client = new SmallBot({
    accessToken: config.appId,
    homeserverUrl: config.homeserver,
    roomId: config.roomId,
    eventHandler: async (client, roomId, event) => {
        if (event.sender !== client.ownUserId) {
            const prf = await client.getUserProfile(event.sender);
            await client.sendRoomNotice(roomId, prf.displayname + ", you said: <b>" + event.content.body + "</b>");
        }
    },
  });
  await client.start()
});