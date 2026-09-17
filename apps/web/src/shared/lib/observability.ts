export const SUPERLOG_ENDPOINT = "https://intake.superlog.sh";
export const SUPERLOG_PUBLIC_TOKEN =
  "sl_public_uNk-VyQWrcw5A__1Ea3Yo0N5rk_8eU3Whm8Sh-jK02s";

export const VCS_REPOSITORY_URL = "https://github.com/mashafrancis/plutus";

export function superlogHeaders(token: string): Record<string, string> {
  return { "x-api-key": token };
}

export function getDeploymentEnvironment(): string {
  if (typeof process !== "undefined" && process.env) {
    if (process.env.VERCEL_ENV) {
      return process.env.VERCEL_ENV;
    }
    if (process.env.CLOUDFLARE_ENV) {
      return process.env.CLOUDFLARE_ENV;
    }
    if (process.env.NODE_ENV === "production") {
      return "production";
    }
    if (process.env.NODE_ENV === "development") {
      return "development";
    }
  }

  if (typeof import.meta !== "undefined") {
    const mode = (import.meta as { env?: { MODE?: string; PROD?: boolean } }).env;
    if (mode?.PROD) {
      return "production";
    }
    if (mode?.MODE) {
      return mode.MODE;
    }
  }

  return "local";
}

export function getVcsRevision(): string | undefined {
  if (typeof process === "undefined" || !process.env) {
    return undefined;
  }

  return (
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    process.env.CF_PAGES_COMMIT_SHA ??
    process.env.RAILWAY_GIT_COMMIT_SHA ??
    process.env.SOURCE_COMMIT ??
    process.env.GIT_COMMIT
  );
}

export function buildResourceAttributes(serviceName: string): Record<string, string> {
  const attributes: Record<string, string> = {
    "service.name": serviceName,
    "deployment.environment.name": getDeploymentEnvironment(),
    "vcs.repository.url.full": VCS_REPOSITORY_URL,
  };

  const revision = getVcsRevision();
  if (revision) {
    attributes["vcs.ref.head.revision"] = revision;
  }

  return attributes;
}
