// @flow
import * as React from 'react';
import SemiControlledTextField from '../../UI/SemiControlledTextField';
import { type ParameterFieldProps } from './ParameterFieldProps.flow';

export default class DefaultField extends React.Component<
  ParameterFieldProps,
  void
> {
  _field: ?any = null;

  focus() {
    if (this._field) this._field.focus();
  }

  render() {
    const { parameterMetadata } = this.props;
    const description = parameterMetadata
      ? parameterMetadata.getDescription()
      : undefined;

    return (
      <SemiControlledTextField
        commitOnBlur
        value={this.props.value}
        floatingLabelText={description}
        onChange={(text: string) => this.props.onChange(text)}
        ref={field => (this._field = field)}
        fullWidth
      />
    );
  }
}
