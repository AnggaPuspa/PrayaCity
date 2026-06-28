import "server-only";

import type { ContactInput } from "../schemas/contact.schema";

/**
 * Service / data-access layer. The ONLY place that talks to infrastructure
 * (database, email provider, queue...). `import "server-only"` guarantees
 * this never ends up in a client bundle.
 *
 * Swap the mock below for a real persistence call later — the action and UI
 * above it do not need to change.
 */
export async function saveContactMessage(input: ContactInput): Promise<void> {
  // Simulate network/DB latency.
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.info("[contact] new message from %s <%s>", input.name, input.email);
}
