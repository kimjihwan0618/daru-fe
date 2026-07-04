import { notFound } from "next/navigation";
import { OAuthCallback } from "@/features/auth/components/OAuthCallback";
import { socialProviderSchema } from "@/features/auth/model";

export default async function OAuthCallbackPage({
  params,
  searchParams,
}: {
  params: Promise<{ provider: string }>;
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  const [{ provider }, query] = await Promise.all([params, searchParams]);
  const parsedProvider = socialProviderSchema.safeParse(provider);
  if (!parsedProvider.success) notFound();

  return (
    <OAuthCallback
      provider={parsedProvider.data}
      code={query.code}
      error={query.error}
    />
  );
}
