import prisma from '@/lib/db/db';
import { SlackInstallation } from '@/types/types';
import logger from '../utils/logger';
import loggerService from '../utils/logger';

export async function storeInstallation(installation: SlackInstallation, state: string) {
  try {
    const { team, access_token, bot_user_id, app_id } = installation;
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    const tenant = await prisma.tenants.upsert({
      where: {
        workspace_team_id: team.id,
      },
      update: {
        timezone,
        subdomain: team.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        status: 'active'
      },
      create: {
        timezone,
        workspace_team_id: team.id,
        subdomain: team.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        status: 'active',
      },
    });

    const workspace = await prisma.slack_workspace.upsert({
      where: {
        team_id: team.id,
      },
      update: {
        access_token,
        bot_user_id,
        app_id,
        team_name: team.name,
        team_id: team.id,
        bot_token: access_token, 
        scope: installation.scope,
      },
      create: {
        team_id: team.id,
        team_name: team.name,
        access_token,
        bot_token: access_token,
        bot_user_id,
        app_id,
        scope: installation.scope,
      },
    })


    const connectUser = await prisma.users.update({
      where: {
        id: state,
      },
      data: {
        tenant_id: tenant.id
      },
    }).catch((error) => {
      console.error('Error updating user:', error);
    })


    logger.info('slack-integration', `Installation stored for team: ${team.name} (${team.id})`);
    logger.info('slack-integration', `Updated user with ID: ${state} to tenant ID: ${tenant.id}`);
    
    return {
      tenant, 
      workspace
    };
  } catch (error: any) {
    await loggerService.critical('slack-installation', 
      'Failed to store Slack installation', 
      { 
        teamId: installation.team?.id,
        error: error.message,
        state 
      }
    );    throw error;
  }
}