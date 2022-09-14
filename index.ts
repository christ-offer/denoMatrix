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
  console.log('hello world')
});