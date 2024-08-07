### Project Information
This is an application intended to be a clone of ChatGPT with an interface I prefer.

### Technologies:
- Next.js
- Clerk
- TypeScript
- Tailwind
- Stripe
- Prisma
- API's Listed below...

### APIs for tools:
- OpenAI API for Text, Code, and Image
- Replicate AI for music(Riffusion) and video(Zeroscope-v2)
- Waiting on OpenAI for video (Feature Release Date TBD)

### Database Information
- Currently using Supabase (Linked with GitHub Account)
    - https://supabase.com/ 
    - use `npx prisma db push` to update db and `npx prisma generate` to add to modules
    - To view data `npx prisma studio`
- Could use PlanetScale  (Simplest solution but expensive, Antonio uses this, better to find my own option)
    - https://planetscale.com/ 
- Research more options if these two aren't realistic
- Run `npx prisma migrate reset` to clear entire database, then run above commands starting with generate

## Time Stamp:
- 5:21:09
- Clerk issue resolved... loading times need improvement
https://www.youtube.com/watch?v=ffJ38dBzrlY 

## Node Commands:
- Clear Next.js Cache:
    - rm -rf .next
    - rm -rf node_modules/.cache
- Reinstall Modules:
    - rm -rf node_modules
    - npm install

## OpenAI API Docs:
- https://platform.openai.com/docs/api-reference/chat/create#chat-create-model 

## OpenAI Usage:
- https://platform.openai.com/usage

## Replicate API Docs:
- https://replicate.com/docs 

## Tailwind Docs:
- https://tailwindcss.com/docs/installation 

## Stripe API:
- Make sure to run the commands on the following page when testing stripe connection.
- May have to update `STRIPE_WEBHOOK_SECRET` in `.env` everytime.
- https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
- Command to run:
    - `stripe listen --forward-to localhost:3000/api/webhook`
- Stripe Test Credit Card
    - 4242 4242 4242 4242 (NUM)
    - 5/55 (EXP)
    - 555  (CVV)
