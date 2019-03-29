// @flow
import Keen from 'keen-tracking';
import Window from '../Window';
import { getUserUUID } from './UserUUID';
import Authentification from '../GDevelopServices/Authentification';
import {
  getProgramOpeningCount,
  incrementProgramOpeningCount,
} from './LocalStats';

const isDev = Window.isDev();
let client = null;

export const installAnalyticsEvents = (authentification: Authentification) => {
  if (isDev) {
    console.info('Development build - Analytics disabled');
    return;
  }

  const sessionCookie = Keen.utils.cookie('visitor-stats');
  const sessionTimer = Keen.utils.timer();
  sessionTimer.start();

  client = new Keen({
    projectId: '593d9f0595cfc907a1f8126a',
    writeKey:
      'B917F1DB50EE4C8949DBB374D2962845A22838B425AA43322A37138691A5270EB0358AEE45A4F61AFA7713B9765B4980517A1E276D4973A2E546EA851BF7757523706367ED430C041D2728A63BF61B5D1B2079C75E455DDDFAAC4324128AC2DB',
  });

  client.extendEvents(function() {
    const userProfile = authentification.getUserProfileSync();

    return {
      user: {
        uuid: getUserUUID(),
        uid: userProfile ? userProfile.uid : undefined,
        providerId: userProfile ? userProfile.providerId : undefined,
        email: userProfile ? userProfile.email : undefined,
        emailVerified: userProfile ? userProfile.emailVerified : undefined,
      },
      localStats: {
        programOpeningCount: getProgramOpeningCount(),
      },
      page: {
        title: document.title,
        url: document.location.href,
        // info: {} (add-on)
      },
      referrer: {
        url: document.referrer,
        // info: {} (add-on)
      },
      tech: {
        browser: Keen.helpers.getBrowserProfile(),
        // info: {} (add-on)
        ip: '${keen.ip}', // eslint-disable-line
        ua: '${keen.user_agent}', // eslint-disable-line
      },
      time: Keen.helpers.getDatetimeIndex(),
      visitor: {
        id: sessionCookie.get('user_id'),
        time_on_page: sessionTimer.value(),
      },
      // geo: {} (add-on)
      keen: {
        timestamp: new Date().toISOString(),
        addons: [
          {
            name: 'keen:ip_to_geo',
            input: {
              ip: 'tech.ip',
            },
            output: 'geo',
          },
          {
            name: 'keen:ua_parser',
            input: {
              ua_string: 'tech.ua',
            },
            output: 'tech.info',
          },
          {
            name: 'keen:url_parser',
            input: {
              url: 'page.url',
            },
            output: 'page.info',
          },
          {
            name: 'keen:referrer_parser',
            input: {
              page_url: 'page.url',
              referrer_url: 'referrer.url',
            },
            output: 'referrer.info',
          },
        ],
      },
    };
  });
};

export const sendProgramOpening = () => {
  if (isDev || !client) return;

  incrementProgramOpeningCount();
  client.recordEvent('program_opening');
};

export const sendExportLaunched = (exportKind: string) => {
  if (isDev || !client) return;

  client.recordEvent('export_launched', {
    platform: 'GDevelop JS Platform', // Hardcoded here for now
    exportKind,
  });
};

export const sendNewGameCreated = (templateName: string) => {
  if (isDev || !client) return;

  client.recordEvent('new_game_creation', {
    platform: 'GDevelop JS Platform', // Hardcoded here for now
    templateName,
  });
};

export const sendTutorialOpened = (tutorialName: string) => {
  if (isDev || !client) return;

  client.recordEvent('tutorial_opened', {
    tutorialName,
  });
};

export const sendHelpFinderOpened = () => {
  if (isDev || !client) return;

  client.recordEvent('help_finder_opened', {});
};

export const sendHelpSearch = (searchText: string) => {
  console.log('sendHelpSearch', searchText);
  if (isDev || !client) return;

  client.recordEvent('help_search', {
    searchText,
  });
};

export const sendErrorMessage = (
  errorMessage: string,
  type: string,
  rawError: any
) => {
  if (isDev || !client) return;

  client.recordEvent('error_message', {
    message: errorMessage,
    type,
    rawError,
  });
};

export const sendSignupDone = (email: string) => {
  if (isDev || !client) return;

  client.recordEvent('signup', {
    email,
  });
};

export const sendSubscriptionCheckDialogShown = ({
  mode,
  id,
}: {|
  mode: string,
  id: string,
|}) => {
  if (isDev || !client) return;

  client.recordEvent('subscription-check-dialog-shown', {
    mode,
    title: id,
  });
};

export const sendSubscriptionCheckDismiss = () => {
  if (isDev || !client) return;

  client.recordEvent('subscription-check-dialog-dismiss');
};

export const sendSubscriptionDialogShown = () => {
  if (isDev || !client) return;

  client.recordEvent('subscription-dialog-shown', {});
};

export const sendChoosePlanClicked = (planId: string | null) => {
  if (isDev || !client) return;

  client.recordEvent('choose-plan-click', { planId });
};

export const sendExternalEditorOpened = (editorName: string) => {
  if (isDev || !client) return;

  client.recordEvent('open_external_editor', { editorName });
};
