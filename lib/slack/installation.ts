import { prisma } from '@/db/db';
import { SlackInstallation } from '@/types/types';

export async function storeInstallation(installation: SlackInstallation) {
  try {
    const { team, access_token, bot_user_id, app_id } = installation;
    
    const tenant = await prisma.tenants.upsert({
      where: {
        workspace_team_id: team.id,
      },
      update: {
        subdomain: team.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        status: 'active'
      },
      create: {
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


    console.log(`Installation stored for team: ${team.name} (${team.id})`);
    
    return {
      tenant, 
      workspace
    };
  } catch (error) {
    console.error('Error storing Slack installation:', error);
    throw error;
  }
}