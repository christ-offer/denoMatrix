import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { config } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
import { SmallBot } from "https://raw.githubusercontent.com/cybertim/SmallBotMatrix/main/mod.ts";

const config = {
  accessToken: Deno.env.get("MATRIX_ACCESS_TOKEN"),
  homeserverUrl: Deno.env.get("MATRIX_SERVER_NAME") || generateSecret(),
  matrixRoomId: Deno.env.get("GITHUB_WEBHOOK_ROOM_ID"),
};

const matrixBot = new SmallBot({
    accessToken: config.accessToken,
    homeserverUrl: config.homeserverUrl,
    matrixRoomId: "!phxFsseDFtRienTcza:matrix.org",
    eventHandler: async (matrixBot, matrixRoomId, event) => {
      if (event.sender !== matrixBot.ownUserId) {        
        console.log('new message')
        await matrixBot.sendRoomNotice(matrixRoomId, "You said: <b>" + event.content.body + "</b>");
      }
      // await matrixBot.sendMessage("!phxFsseDFtRienTcza:matrix.org", "m.text", "<b>hello world</b>")
    }
});
await matrixBot.start();


serve((_req) => {

});