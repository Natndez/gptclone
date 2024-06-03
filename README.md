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
- Could use PlanetScale  (Simplest solution but expensive, Antonio uses this, better to find my own option)
    - https://planetscale.com/ 
- Research more options if these two aren't realistic

## Time Stamp:
- 3:11:02
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
