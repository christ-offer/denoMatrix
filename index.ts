import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { config } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
import { Config, generateSecret, on, webhooks } from "https://deno.land/x/github_webhooks@0.1.1/mod.ts";
import { SmallBot } from "https://raw.githubusercontent.com/cybertim/SmallBotMatrix/main/mod.ts";

const config = {
  accessToken: Deno.env.get("MATRIX_ACCESS_TOKEN"),
  homeserverUrl: Deno.env.get("MATRIX_SERVER_NAME") || generateSecret(),
  matrixRoomId: Deno.env.get("GITHUB_WEBHOOK_ROOM_ID"),
};

const gitConf = {
  appId: Deno.env.get("APP_ID"),
  secret: Deno.env.get("APP_SECRET") || generateSecret(),
  privateKey: Deno.env.get("APP_PRIVATE_KEY"),
};



const matrixBot = new SmallBot({
    accessToken: config.accessToken,
    homeserverUrl: config.homeserverUrl,
    matrixRoomId: config.matrixRoomId,
    eventHandler: async (client, roomId, event) => {
      if (event.sender !== client.ownUserId) {        
        await client.sendRoomNotice(roomId, "You said: <b>" + event.content.body + "</b>");
      }
      // await matrixBot.sendMessage("!phxFsseDFtRienTcza:matrix.org", "m.text", "<b>hello world</b>")
    }
});



await matrixBot.start();



serve((_req) => {

  console.log('hello world')
});