// @flow
import React from 'react';
import HelpOutline from 'material-ui/svg-icons/action/help-outline';
import IconButton from 'material-ui/IconButton';
import { getHelpLink } from '../../Utils/HelpLink';
import Window from '../../Utils/Window';

type PropsType = {
  helpPagePath: ?string,
};

/**
 * The icon that can be used in any dialog to open a help page
 */
export default (props: PropsType) => {
  const { helpPagePath } = props;
  if (!helpPagePath) return null;

  return (
    <IconButton
      onClick={() => Window.openExternalURL(getHelpLink(helpPagePath))}
    >
      <HelpOutline />
    </IconButton>
  );
};
