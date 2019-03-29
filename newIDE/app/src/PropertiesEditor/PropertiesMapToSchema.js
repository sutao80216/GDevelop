// @flow
import { mapFor } from '../Utils/MapFor';
import { type Schema, type Instance } from '.';

/**
 * Transform a MapStringPropertyDescriptor to a schema that can be used in PropertiesEditor.
 *
 * @param {gdMapStringPropertyDescriptor} properties The properties to use
 * @param {*} getProperties The function called to read again the properties
 * @param {*} onUpdateProperty The function called to update a property of an object
 */
export default (
  properties: gdMapStringPropertyDescriptor,
  getProperties: (instance: Instance) => any,
  onUpdateProperty: (
    instance: Instance,
    propertyName: string,
    newValue: string
  ) => void
): Schema => {
  const propertyNames = properties.keys();
  const propertyFields = mapFor(0, propertyNames.size(), i => {
    const name = propertyNames.at(i);
    const property = properties.get(name);
    const valueType = property.getType().toLowerCase();
    const getLabel = (instance: Instance) => {
      const propertyName = getProperties(instance)
        .get(name)
        .getLabel();
      if (propertyName) return propertyName;
      return (
        name.charAt(0).toUpperCase() +
        name
          .slice(1)
          .split(/(?=[A-Z])/)
          .join(' ')
      );
    };

    if (valueType === 'number') {
      return {
        name,
        valueType,
        getValue: (instance: Instance): number => {
          return parseFloat(
            getProperties(instance)
              .get(name)
              .getValue()
          );
        },
        setValue: (instance: Instance, newValue: number) => {
          onUpdateProperty(instance, name, '' + newValue);
        },
        getLabel,
      };
    } else if (valueType === 'string' || valueType === '') {
      return {
        name,
        valueType: 'string',
        getValue: (instance: Instance): string => {
          return getProperties(instance)
            .get(name)
            .getValue();
        },
        setValue: (instance: Instance, newValue: string) => {
          onUpdateProperty(instance, name, newValue);
        },
        getLabel,
      };
    } else if (valueType === 'boolean') {
      return {
        name,
        valueType,
        getValue: (instance: Instance): boolean => {
          return (
            getProperties(instance)
              .get(name)
              .getValue() === 'true'
          );
        },
        setValue: (instance: Instance, newValue: boolean) => {
          onUpdateProperty(instance, name, newValue ? '1' : '0');
        },
        getLabel,
      };
    } else if (valueType === 'choice') {
      // Choice is a "string" (with a selector for the user in the UI)
      const choices = property
        .getExtraInfo()
        .toJSArray()
        .map(value => ({ value, label: value }));
      return {
        name,
        valueType: 'string',
        getChoices: () => choices,
        getValue: (instance: Instance): string => {
          return getProperties(instance)
            .get(name)
            .getValue();
        },
        setValue: (instance: Instance, newValue: string) => {
          onUpdateProperty(instance, name, newValue);
        },
        getLabel,
      };
    } else if (valueType === 'resource') {
      // Resource is a "string" (with a selector in the UI)
      const kind = property.getExtraInfo().toJSArray()[0] || '';
      return {
        name,
        valueType: 'resource',
        resourceKind: kind,
        getValue: (instance: Instance): string => {
          return getProperties(instance)
            .get(name)
            .getValue();
        },
        setValue: (instance: Instance, newValue: string) => {
          onUpdateProperty(instance, name, newValue);
        },
        getLabel,
      };
    } else {
      console.error(
        `A property with type=${valueType} could not be mapped to a field. Ensure that this type is correct and understood by the IDE.`
      );
      return null;
    }
  }).filter(Boolean);

  return propertyFields;
};
