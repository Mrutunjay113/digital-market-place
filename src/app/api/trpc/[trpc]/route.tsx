import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: "/api/trpc",
    //@ts-expect-error context already passed from middleware
    createContext: () => ({}),
  });
};
export { handler as GET, handler as POST };
