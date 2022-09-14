import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { config } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
import { on, webhooks } from "https://deno.land/x/github_webhooks@0.1.0/mod.ts";
import * as SmallBot from "https://raw.githubusercontent.com/cybertim/SmallBotMatrix/main/mod.ts";

const config = {
  accessToken: Deno.env.get("MATRIX_ACCESS_TOKEN"),
  homeserverUrl: Deno.env.get("MATRIX_SERVER_NAME") || generateSecret(),
  roomId: Deno.env.get("GITHUB_WEBHOOK_ROOM_ID"),
};

const matrixBot = new SmallBot({
    accessToken: config.accessToken,
    homeserverUrl: config.homeserverUrl,
    roomId: config.roomId,
    eventHandler: async (matrixBot, roomId, event) => {
        if (event.sender !== matrixBot.ownUserId) {
            const profile = await matrixBot.getUserProfile(event.sender);
            await matrixBot.sendRoomNotice(roomId, profile.displayname + ", you said: <b>" + event.content.body + "</b>");
        }
    }
});

serve((_req) => {
  console.log('hello world')

  await matrixBot.start();
});