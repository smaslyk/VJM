export const GET = ({ request }) =>
  Response.json({
    host: request.headers.get("host"),
    authority: request.headers.get(":authority"),
    forwardedHost: request.headers.get("x-forwarded-host"),
    origin: request.headers.get("origin"),
    referer: request.headers.get("referer"),
  });