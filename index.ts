import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { config } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
import { on, webhooks } from "https://deno.land/x/github_webhooks@0.1.0/mod.ts";
import { SmallBot } from "https://raw.githubusercontent.com/cybertim/SmallBotMatrix/main/mod.ts";

const config = {
  accessToken: Deno.env.get("MATRIX_ACCESS_TOKEN"),
  homeserverUrl: Deno.env.get("MATRIX_SERVER_NAME") || generateSecret(),
  matrixRoomId: Deno.env.get("GITHUB_WEBHOOK_ROOM_ID"),
};

const matrixBot = new SmallBot({
    accessToken: config.accessToken,
    homeserverUrl: config.homeserverUrl,
    matrixRoomId: config.matrixRoomId,
    eventHandler: async (matrixBot, roomId, event) => {
      webhooks()(
        on("issue_comment", ({ issue, comment }, _context) => {
          await matrixBot.sendRoomNotice(matrixRoomId, 
            `@${comment.user.login} commented on issue #${issue.number}: ${comment.body}`,
          );
        }),
      );  
    }
});
await matrixBot.start();



serve((_req) => {
  console.log('hello world')
});