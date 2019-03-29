// @flow
import { Trans } from '@lingui/macro';

import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import optionalRequire from '../../Utils/OptionalRequire.js';
const electron = optionalRequire('electron');
const dialog = electron ? electron.remote.dialog : null;

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'baseline',
  },
  button: {
    marginLeft: 10,
  },
  textField: {
    flex: 1,
  },
};

export default class LocalFolderPicker extends PureComponent<*, *> {
  onChooseFolder = () => {
    if (!dialog || !electron) return;

    const browserWindow = electron.remote.getCurrentWindow();
    dialog.showOpenDialog(
      browserWindow,
      {
        title: this.props.title || 'Export folder',
        properties: ['openDirectory', 'createDirectory'],
        message: this.props.message || 'Choose where to export the game',
        defaultPath: this.props.defaultPath,
      },
      paths => {
        if (!paths || !paths.length) return;

        this.props.onChange(paths[0]);
      }
    );
  };

  render() {
    return (
      <div
        style={{
          ...styles.container,
          width: this.props.fullWidth ? '100%' : undefined,
        }}
      >
        <TextField
          style={styles.textField}
          floatingLabelText={this.props.floatingLabelText}
          floatingLabelFixed
          type="text"
          hintText={<Trans>Click to choose</Trans>}
          value={this.props.value}
          onChange={(event, value) => this.props.onChange(value)}
        />
        <FlatButton
          label={<Trans>Choose folder</Trans>}
          style={styles.button}
          onClick={this.onChooseFolder}
        />
      </div>
    );
  }
}
