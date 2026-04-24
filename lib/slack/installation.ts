import { SlackInstallation } from '@/types/types';

// Slack workspace persistence requires a database, which is disabled in this
// deployment. The OAuth callback short-circuits to a clear error.
export async function storeInstallation(_installation: SlackInstallation, _state: string): Promise<never> {
  throw new Error('Slack integration is disabled in this deployment.');
}
