import { useNavigate, useLocation, useSearchParams as useRRSearchParams, useParams as useRRParams } from "react-router";

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (url: string) => navigate(url),
    replace: (url: string) => navigate(url, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => navigate(0),
  };
}

export function usePathname() {
  const location = useLocation();
  return location.pathname;
}

export function useSearchParams() {
  const [searchParams] = useRRSearchParams();
  return searchParams;
}

export function useParams() {
  return useRRParams();
}

export function notFound() {
  throw new Response("Not Found", { status: 404 });
}

export function redirect(url: string) {
  throw new Response(null, { status: 302, headers: { Location: url } });
}
