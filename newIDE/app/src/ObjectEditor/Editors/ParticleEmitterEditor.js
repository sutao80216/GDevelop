// @flow
import { Trans } from '@lingui/macro';

import * as React from 'react';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Line, Column } from '../../UI/Grid';
import ColorField from '../../UI/ColorField';
import SemiControlledTextField from '../../UI/SemiControlledTextField';
import { type EditorProps } from './EditorProps.flow';
import ResourceSelectorWithThumbnail from '../../ResourcesList/ResourceSelectorWithThumbnail';
const gd = global.gd;

export default class ParticleEmitterEditor extends React.Component<
  EditorProps,
  void
> {
  render() {
    const {
      object,
      project,
      resourceSources,
      onChooseResource,
      resourceExternalEditors,
    } = this.props;
    const particleEmitterObject = gd.asParticleEmitterObject(object);

    return (
      <Column>
        <Line>
          <Column expand noMargin>
            <SelectField
              fullWidth
              floatingLabelText={<Trans>Particles kind</Trans>}
              value={particleEmitterObject.getRendererType()}
              onChange={(e, i, value) => {
                particleEmitterObject.setRendererType(value);
                if (value !== gd.ParticleEmitterObject.Quad) {
                  particleEmitterObject.setParticleTexture('');
                }
                this.forceUpdate();
              }}
            >
              <MenuItem
                value={gd.ParticleEmitterObject.Point}
                primaryText={<Trans>Point</Trans>}
              />
              <MenuItem
                value={gd.ParticleEmitterObject.Line}
                primaryText={<Trans>Line</Trans>}
              />
              <MenuItem
                value={gd.ParticleEmitterObject.Quad}
                primaryText={<Trans>Textured</Trans>}
              />
            </SelectField>
          </Column>
        </Line>
        {particleEmitterObject.getRendererType() ===
          gd.ParticleEmitterObject.Point && (
          <Line>
            <Column expand noMargin>
              <SemiControlledTextField
                floatingLabelText={<Trans>Size</Trans>}
                fullWidth
                type="number"
                value={particleEmitterObject.getRendererParam1()}
                onChange={value => {
                  particleEmitterObject.setRendererParam1(parseFloat(value));
                  this.forceUpdate();
                }}
              />
            </Column>
          </Line>
        )}
        {particleEmitterObject.getRendererType() ===
          gd.ParticleEmitterObject.Line && (
          <Line>
            <Column expand noMargin>
              <SemiControlledTextField
                floatingLabelText={<Trans>Lines length</Trans>}
                fullWidth
                type="number"
                value={particleEmitterObject.getRendererParam1()}
                onChange={value => {
                  particleEmitterObject.setRendererParam1(parseFloat(value));
                  this.forceUpdate();
                }}
              />
            </Column>
            <Column expand noMargin>
              <SemiControlledTextField
                floatingLabelText={<Trans>Lines thickness</Trans>}
                fullWidth
                type="number"
                value={particleEmitterObject.getRendererParam2()}
                onChange={value => {
                  particleEmitterObject.setRendererParam2(parseFloat(value));
                  this.forceUpdate();
                }}
              />
            </Column>
          </Line>
        )}
        {particleEmitterObject.getRendererType() ===
          gd.ParticleEmitterObject.Quad && (
          <React.Fragment>
            <Line>
              <ResourceSelectorWithThumbnail
                project={project}
                resourceSources={resourceSources}
                onChooseResource={onChooseResource}
                resourceKind="image"
                resourceName={particleEmitterObject.getParticleTexture()}
                resourceExternalEditors={resourceExternalEditors}
                onChange={resourceName => {
                  particleEmitterObject.setParticleTexture(resourceName);
                  this.forceUpdate();
                }}
                floatingLabelText={<Trans>Select an image</Trans>}
              />
            </Line>
            <Line>
              <Column expand noMargin>
                <SemiControlledTextField
                  floatingLabelText={<Trans>Particles start width</Trans>}
                  fullWidth
                  type="number"
                  value={particleEmitterObject.getRendererParam1()}
                  onChange={value => {
                    particleEmitterObject.setRendererParam1(
                      Math.max(0, parseFloat(value))
                    );
                    this.forceUpdate();
                  }}
                />
              </Column>
              <Column expand noMargin>
                <SemiControlledTextField
                  floatingLabelText={<Trans>Particles start height</Trans>}
                  fullWidth
                  type="number"
                  value={particleEmitterObject.getRendererParam2()}
                  onChange={value => {
                    particleEmitterObject.setRendererParam2(
                      Math.max(0, parseFloat(value))
                    );
                    this.forceUpdate();
                  }}
                />
              </Column>
            </Line>
          </React.Fragment>
        )}
        <Line>
          <ColorField
            floatingLabelText={<Trans>Particles start color</Trans>}
            disableAlpha
            fullWidth
            color={{
              r: particleEmitterObject.getParticleRed1(),
              g: particleEmitterObject.getParticleGreen1(),
              b: particleEmitterObject.getParticleBlue1(),
              a: 255,
            }}
            onChangeComplete={color => {
              particleEmitterObject.setParticleRed1(color.rgb.r);
              particleEmitterObject.setParticleGreen1(color.rgb.g);
              particleEmitterObject.setParticleBlue1(color.rgb.b);

              this.forceUpdate();
            }}
          />
          <SemiControlledTextField
            floatingLabelText={<Trans>Start opacity (0-255)</Trans>}
            fullWidth
            type="number"
            value={particleEmitterObject.getParticleAlpha1()}
            onChange={value => {
              particleEmitterObject.setParticleAlpha1(parseInt(value, 10));
              this.forceUpdate();
            }}
          />
        </Line>
        <Line>
          <ColorField
            floatingLabelText={<Trans>Particles end color</Trans>}
            disableAlpha
            fullWidth
            color={{
              r: particleEmitterObject.getParticleRed2(),
              g: particleEmitterObject.getParticleGreen2(),
              b: particleEmitterObject.getParticleBlue2(),
              a: 255,
            }}
            onChangeComplete={color => {
              particleEmitterObject.setParticleRed2(color.rgb.r);
              particleEmitterObject.setParticleGreen2(color.rgb.g);
              particleEmitterObject.setParticleBlue2(color.rgb.b);

              this.forceUpdate();
            }}
          />
          <SemiControlledTextField
            floatingLabelText={<Trans>End opacity (0-255)</Trans>}
            fullWidth
            type="number"
            value={particleEmitterObject.getParticleAlpha2()}
            onChange={value => {
              particleEmitterObject.setParticleAlpha2(parseInt(value, 10));
              this.forceUpdate();
            }}
          />
        </Line>
        <Line>
          <Checkbox
            label={<Trans>Additive rendering</Trans>}
            checked={particleEmitterObject.isRenderingAdditive()}
            onCheck={(e, checked) => {
              if (checked) particleEmitterObject.setRenderingAdditive();
              else particleEmitterObject.setRenderingAlpha();
              this.forceUpdate();
            }}
          />
        </Line>
        <Line>
          <Checkbox
            label={<Trans>Delete when out of particles</Trans>}
            checked={particleEmitterObject.getDestroyWhenNoParticles()}
            onCheck={(e, checked) => {
              particleEmitterObject.setDestroyWhenNoParticles(checked);
              this.forceUpdate();
            }}
          />
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Maximum number of particles displayed</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getMaxParticleNb()}
              onChange={value => {
                particleEmitterObject.setMaxParticleNb(parseInt(value, 10));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Number of particles in tank (-1 for infinite)</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getTank()}
              onChange={value => {
                particleEmitterObject.setTank(parseInt(value, 10));
                this.forceUpdate();
              }}
            />
          </Column>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Flow of particles (particles/seconds)</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getFlow()}
              onChange={value => {
                particleEmitterObject.setFlow(parseInt(value, 10));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Minimum emitter force applied on particles</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getEmitterForceMin()}
              onChange={value => {
                particleEmitterObject.setEmitterForceMin(parseInt(value, 10));
                this.forceUpdate();
              }}
            />
          </Column>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Maximum emitter force applied on particles</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getEmitterForceMax()}
              onChange={value => {
                particleEmitterObject.setEmitterForceMax(parseInt(value, 10));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={<Trans>Spray cone angle (in degrees)</Trans>}
              fullWidth
              type="number"
              value={particleEmitterObject.getConeSprayAngle()}
              onChange={value => {
                particleEmitterObject.setConeSprayAngle(parseInt(value, 10));
                this.forceUpdate();
              }}
            />
          </Column>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={<Trans>Radius of the emitter</Trans>}
              fullWidth
              type="number"
              value={particleEmitterObject.getZoneRadius()}
              onChange={value => {
                particleEmitterObject.setZoneRadius(parseInt(value, 10));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={<Trans>Gravity on particles on X axis</Trans>}
              fullWidth
              type="number"
              value={particleEmitterObject.getParticleGravityX()}
              onChange={value => {
                particleEmitterObject.setParticleGravityX(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={<Trans>Gravity on particles on Y axis</Trans>}
              fullWidth
              type="number"
              value={particleEmitterObject.getParticleGravityY()}
              onChange={value => {
                particleEmitterObject.setParticleGravityY(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={<Trans>Friction on particles</Trans>}
              fullWidth
              type="number"
              value={particleEmitterObject.getFriction()}
              onChange={value => {
                particleEmitterObject.setFriction(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Particle minimum lifetime (in seconds)</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getParticleLifeTimeMin()}
              onChange={value => {
                particleEmitterObject.setParticleLifeTimeMin(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Particle maximum lifetime (in seconds)</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getParticleLifeTimeMax()}
              onChange={value => {
                particleEmitterObject.setParticleLifeTimeMax(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Particle start size (in percents)</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getParticleSize1()}
              onChange={value => {
                particleEmitterObject.setParticleSize1(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={<Trans>Particle end size (in percents)</Trans>}
              fullWidth
              type="number"
              value={particleEmitterObject.getParticleSize2()}
              onChange={value => {
                particleEmitterObject.setParticleSize2(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
        <Line>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Particle minimum rotation speed (degrees/second)</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getParticleAngle1()}
              onChange={value => {
                particleEmitterObject.setParticleAngle1(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
          <Column expand noMargin>
            <SemiControlledTextField
              floatingLabelText={
                <Trans>Particle maximum rotation speed (degrees/second)</Trans>
              }
              fullWidth
              type="number"
              value={particleEmitterObject.getParticleAngle2()}
              onChange={value => {
                particleEmitterObject.setParticleAngle2(parseFloat(value));
                this.forceUpdate();
              }}
            />
          </Column>
        </Line>
      </Column>
    );
  }
}
