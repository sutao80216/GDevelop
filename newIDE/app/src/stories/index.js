// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome';
import HelpButton from '../UI/HelpButton';
import HelpIcon from '../UI/HelpIcon';
import StartPage from '../MainFrame/Editors/StartPage';
import AboutDialog from '../MainFrame/AboutDialog';
import CreateProjectDialog from '../ProjectCreation/CreateProjectDialog';
import { Tabs, Tab } from '../UI/Tabs';
import DragHandle from '../UI/DragHandle';
import Background from '../UI/Background';
import HelpFinder from '../HelpFinder';
import LocalFolderPicker from '../UI/LocalFolderPicker';
import LocalFilePicker from '../UI/LocalFilePicker';
import LocalExport from '../Export/LocalExporters/LocalExport';
import LocalCordovaExport from '../Export/LocalExporters/LocalCordovaExport';
import LocalS3Export from '../Export/LocalExporters/LocalS3Export';
import LocalNetworkPreviewDialog from '../Export/LocalExporters/LocalPreviewLauncher/LocalNetworkPreviewDialog';
import TextEditor from '../ObjectEditor/Editors/TextEditor';
import TiledSpriteEditor from '../ObjectEditor/Editors/TiledSpriteEditor';
import PanelSpriteEditor from '../ObjectEditor/Editors/PanelSpriteEditor';
import SpriteEditor from '../ObjectEditor/Editors/SpriteEditor';
import PointsEditor from '../ObjectEditor/Editors/SpriteEditor/PointsEditor';
import CollisionMasksEditor from '../ObjectEditor/Editors/SpriteEditor/CollisionMasksEditor';
import EmptyEditor from '../ObjectEditor/Editors/EmptyEditor';
import ImageThumbnail from '../ResourcesList/ResourceThumbnail/ImageThumbnail';
import ShapePainterEditor from '../ObjectEditor/Editors/ShapePainterEditor';
import ExternalEventsField from '../EventsSheet/ParameterFields/ExternalEventsField';
import LayerField from '../EventsSheet/ParameterFields/LayerField';
import MouseField from '../EventsSheet/ParameterFields/MouseField';
import SceneVariableField from '../EventsSheet/ParameterFields/SceneVariableField';
import ObjectVariableField from '../EventsSheet/ParameterFields/ObjectVariableField';
import KeyField from '../EventsSheet/ParameterFields/KeyField';
import ExpressionField from '../EventsSheet/ParameterFields/ExpressionField';
import StringField from '../EventsSheet/ParameterFields/StringField';
import ColorExpressionField from '../EventsSheet/ParameterFields/ColorExpressionField';
import TrueFalseField from '../EventsSheet/ParameterFields/TrueFalseField';
import YesNoField from '../EventsSheet/ParameterFields/YesNoField';
import ForceMultiplierField from '../EventsSheet/ParameterFields/ForceMultiplierField';
import ObjectsList from '../ObjectsList';
import ObjectSelector from '../ObjectsList/ObjectSelector';
import InstancePropertiesEditor from '../InstancesEditor/InstancePropertiesEditor';
import SerializedObjectDisplay from './SerializedObjectDisplay';
import EventsTree from '../EventsSheet/EventsTree';
import LayoutChooserDialog from '../MainFrame/Editors/LayoutChooserDialog';
import InstructionEditor from '../EventsSheet/InstructionEditor';
import EventsSheet from '../EventsSheet';
import BehaviorsEditor from '../BehaviorsEditor';
import ObjectGroupEditor from '../ObjectGroupEditor';
import ObjectGroupsList from '../ObjectGroupsList';
import muiDecorator from './MuiDecorator';
import i18nProviderDecorator from './I18nProviderDecorator';
import paperDecorator from './PaperDecorator';
import ValueStateHolder from './ValueStateHolder';
import RefGetter from './RefGetter';
import DragDropContextProvider from '../Utils/DragDropHelpers/DragDropContextProvider';
import ResourcesLoader from '../ResourcesLoader';
import VariablesList from '../VariablesList';
import ExpressionSelector from '../EventsSheet/InstructionEditor/InstructionOrExpressionSelector/ExpressionSelector';
import InstructionSelector from '../EventsSheet/InstructionEditor/InstructionOrExpressionSelector/InstructionSelector';
import ParameterRenderingService from '../EventsSheet/ParameterRenderingService';
import { ErrorFallbackComponent } from '../UI/ErrorBoundary';
import { makeTestProject } from '../fixtures/TestProject';
import CreateProfile from '../Profile/CreateProfile';
import ProfileDetails from '../Profile/ProfileDetails';
import LimitDisplayer from '../Profile/LimitDisplayer';
import ResourcePreview from '../ResourcesList/ResourcePreview';
import ResourcesList from '../ResourcesList';
import {
  subscriptionForIndieUser,
  limitsForIndieUser,
  limitsReached,
  noSubscription,
  usagesForIndieUser,
  profileForIndieUser,
  fakeNoSubscriptionUserProfile,
  fakeIndieUserProfile,
  fakeNotAuthenticatedUserProfile,
  fakeAuthenticatedButLoadingUserProfile,
  release,
  releaseWithBreakingChange,
  releaseWithoutDescription,
} from '../fixtures/GDevelopServicesTestData';
import debuggerGameDataDump from '../fixtures/DebuggerGameDataDump.json';
import profilerOutput from '../fixtures/ProfilerOutputsTestData.json';
import SubscriptionDetails from '../Profile/SubscriptionDetails';
import UsagesDetails from '../Profile/UsagesDetails';
import SubscriptionDialog from '../Profile/SubscriptionDialog';
import LoginDialog from '../Profile/LoginDialog';
import UserProfileContext from '../Profile/UserProfileContext';
import { SubscriptionCheckDialog } from '../Profile/SubscriptionChecker';
import DebuggerContent from '../Debugger/DebuggerContent';
import BuildProgress from '../Export/Builds/BuildProgress';
import BuildStepsProgress from '../Export/Builds/BuildStepsProgress';
import MeasuresTable from '../Debugger/Profiler/MeasuresTable';
import Profiler from '../Debugger/Profiler';
import SearchPanel from '../EventsSheet/SearchPanel';
import GDI18nProvider from '../Utils/i18n/GDI18nProvider';
import PlaceholderMessage from '../UI/PlaceholderMessage';
import PlaceholderLoader from '../UI/PlaceholderLoader';
import InlineCheckbox from '../UI/InlineCheckbox';
import LoaderModal from '../UI/LoaderModal';
import ColorField from '../UI/ColorField';
import EmptyMessage from '../UI/EmptyMessage';
import BackgroundText from '../UI/BackgroundText';
import ObjectField from '../EventsSheet/ParameterFields/ObjectField';
import { getInitialSelection } from '../EventsSheet/SelectionHandler';
import EventsFunctionConfigurationEditor from '../EventsFunctionsExtensionEditor/EventsFunctionConfigurationEditor';
import EventsFunctionsList from '../EventsFunctionsList';
import EventsFunctionsExtensionEditor from '../EventsFunctionsExtensionEditor';
import OptionsEditorDialog from '../EventsFunctionsExtensionEditor/OptionsEditorDialog';
import ProjectManager from '../ProjectManager';
import AlertMessage from '../UI/AlertMessage';
import ChangelogRenderer from '../MainFrame/Changelog/ChangelogRenderer';
import ChangelogDialog from '../MainFrame/Changelog/ChangelogDialog';

// No i18n in this file

const gd = global.gd;
const {
  project,
  shapePainterObject,
  tiledSpriteObject,
  panelSpriteObject,
  textObject,
  spriteObject,
  testLayout,
  testLayoutInstance1,
  testInstruction,
  spriteObjectWithBehaviors,
  group2,
  emptyLayout,
  testEventsFunction,
  testEventsFunctionsExtension,
} = makeTestProject(gd);

const Placeholder = () => <div>Placeholder component</div>;

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('UI Building Blocks/Background', module)
  .addDecorator(muiDecorator)
  .add('default', () => <Background>Hello world</Background>);

storiesOf('UI Building Blocks/LoaderModal', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => <LoaderModal show />);

storiesOf('UI Building Blocks/InlineCheckbox', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <div style={{ display: 'flex' }}>
      <InlineCheckbox label={'My label'} checked={true} />
      <InlineCheckbox label={'My label 2'} checked={false} />
    </div>
  ));

storiesOf('UI Building Blocks/PlaceholderMessage', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <PlaceholderMessage>
      <p>
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit
      </p>
    </PlaceholderMessage>
  ));

storiesOf('UI Building Blocks/PlaceholderLoader', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => <PlaceholderLoader />);

storiesOf('UI Building Blocks/DragHandle', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => <DragHandle />);

storiesOf('UI Building Blocks/EmptyMessage', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <EmptyMessage>
      Hello World, this is an empty message, which is centered.
    </EmptyMessage>
  ));

storiesOf('UI Building Blocks/BackgroundText', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <BackgroundText>Hello World, this is a background text</BackgroundText>
  ));

storiesOf('UI Building Blocks/AlertMessage', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <AlertMessage kind="info">Hello World, this is an alert text</AlertMessage>
  ))
  .add('default with button', () => (
    <AlertMessage kind="info" onHide={() => {}}>
      Hello World, this is an alert text
    </AlertMessage>
  ))
  .add('long text', () => (
    <AlertMessage kind="info">
      Hello World, this is a long alert text. Lorem ipsum dolor sit amet, at
      cibo erroribus sed, sea in meis laoreet. Has modus epicuri ne, dicat
      nostrum eos ne, elit virtute appetere cu sea. Ut nec erat maluisset
      argumentum, duo integre propriae ut. Sed cu eius sonet verear, ne sit
      legendos senserit. Ne mel mundi perpetua dissentiunt. Nec ei nusquam
      inimicus.
    </AlertMessage>
  ))
  .add('long text with button', () => (
    <AlertMessage kind="info" onHide={() => {}}>
      Hello World, this is a long alert text. Lorem ipsum dolor sit amet, at
      cibo erroribus sed, sea in meis laoreet. Has modus epicuri ne, dicat
      nostrum eos ne, elit virtute appetere cu sea. Ut nec erat maluisset
      argumentum, duo integre propriae ut. Sed cu eius sonet verear, ne sit
      legendos senserit. Ne mel mundi perpetua dissentiunt. Nec ei nusquam
      inimicus.
    </AlertMessage>
  ))
  .add('warning', () => (
    <AlertMessage kind="warning">
      Hello World, this is an alert text
    </AlertMessage>
  ));

storiesOf('UI Building Blocks/ColorField', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <div>
      <ColorField
        floatingLabelText="Particles start color"
        disableAlpha
        fullWidth
        color={{
          r: 100,
          g: 100,
          b: 200,
          a: 255,
        }}
        onChangeComplete={() => {}}
      />
      <ColorField
        floatingLabelText="This is not full width"
        disableAlpha
        color={{
          r: 100,
          g: 100,
          b: 200,
          a: 255,
        }}
        onChangeComplete={() => {}}
      />
    </div>
  ));

storiesOf('UI Building Blocks/Tabs', module)
  .addDecorator(muiDecorator)
  .add('3 tabs', () => (
    <div style={{ height: 400, display: 'flex' }}>
      <Tabs>
        <Tab label="Tab 1" onClose={action('Close tab 1')}>
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            Tab 1 content
          </div>
        </Tab>
        <Tab label="Tab 2" onClose={action('Close tab 2')}>
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            Tab 2 content
          </div>
        </Tab>
        <Tab label="Tab 3 with a long label" onClose={action('Close tab 3')}>
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            Tab 3 content
          </div>
        </Tab>
      </Tabs>
    </div>
  ))
  .add('long labels', () => (
    <div style={{ height: 400, display: 'flex' }}>
      <Tabs>
        <Tab
          label="Tab 1 with a very very long label"
          onClose={action('Close tab 1')}
        >
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            Tab 1 content
          </div>
        </Tab>
        <Tab label="Small 2" onClose={action('Close tab 2')}>
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            Tab 2 content
          </div>
        </Tab>
        <Tab
          label="Tab 3 with a very very loooong label"
          onClose={action('Close tab 3')}
        >
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            Tab 3 content
          </div>
        </Tab>
        <Tab label="Small 4" onClose={action('Close tab 4')}>
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            Tab 4 content
          </div>
        </Tab>
      </Tabs>
    </div>
  ))
  .add('with ObjectsList (to check scrolling)', () => (
    <div style={{ height: 400, display: 'flex' }}>
      <Tabs>
        <Tab label="Tab 1" onClose={action('Close tab 1')}>
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            The second tab has a list of objects. Check that the scrolling
            position is maintained while navigating between tabs.
          </div>
        </Tab>
        <Tab label="Tab 2" onClose={action('Close tab 2')}>
          <ObjectsList
            getThumbnail={() => 'res/unknown32.png'}
            project={project}
            objectsContainer={testLayout}
            onEditObject={action('On edit object')}
            selectedObjectNames={[]}
          />
        </Tab>
        <Tab label="Tab 3" onClose={action('Close tab 3')}>
          <div style={{ backgroundColor: 'green', height: '100%' }}>
            Tab 3 content
          </div>
        </Tab>
      </Tabs>
    </div>
  ));

storiesOf('UI Building Blocks/HelpButton', module)
  .addDecorator(muiDecorator)
  .add('default', () => <HelpButton helpPagePath="/test" />);

storiesOf('UI Building Blocks/HelpIcon', module)
  .addDecorator(muiDecorator)
  .add('default', () => <HelpIcon helpPagePath="/test" />);

storiesOf('HelpFinder', module)
  .addDecorator(muiDecorator)
  .add('default', () => <HelpFinder open onClose={action('close')} />);

storiesOf('ParameterFields', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('ExpressionField', () => (
    <ValueStateHolder
      initialValue={'MySpriteObject.X() + MouseX("", 0)'}
      render={(value, onChange) => (
        <ExpressionField
          project={project}
          layout={testLayout}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
          parameterRenderingService={ParameterRenderingService}
        />
      )}
    />
  ))
  .add('ExpressionField (with errors)', () => (
    <ValueStateHolder
      initialValue={
        'Test()+3-Test()+3-Test()+3-Test()+3-Test()+3-Test()+3-Test()+3-Test()+3\n-Test2()+3-/2//2 \n+ 3()'
      }
      render={(value, onChange) => (
        <ExpressionField
          project={project}
          layout={testLayout}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
          parameterRenderingService={ParameterRenderingService}
        />
      )}
    />
  ))
  .add('StringField', () => (
    <ValueStateHolder
      initialValue={'ToString(0) + "Test" + NewLine() + VariableString(MyVar)'}
      render={(value, onChange) => (
        <StringField
          project={project}
          layout={testLayout}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
          parameterRenderingService={ParameterRenderingService}
        />
      )}
    />
  ))
  .add('ObjectField', () => (
    <ValueStateHolder
      initialValue={'MySpriteObject'}
      render={(value, onChange) => (
        <ObjectField
          project={project}
          layout={testLayout}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
        />
      )}
    />
  ))
  .add('ExternalEventsField', () => (
    <ValueStateHolder
      initialValue={'Test'}
      render={(value, onChange) => (
        <ExternalEventsField
          project={project}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
        />
      )}
    />
  ))
  .add('ExternalEventsField (without project)', () => (
    <ValueStateHolder
      initialValue={'Test'}
      render={(value, onChange) => (
        <ExternalEventsField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ))
  .add('LayerField', () => (
    <ValueStateHolder
      initialValue={'Test'}
      render={(value, onChange) => (
        <LayerField
          project={project}
          layout={testLayout}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
        />
      )}
    />
  ))
  .add('LayerField (without project and layout)', () => (
    <ValueStateHolder
      initialValue={'Test'}
      render={(value, onChange) => (
        <LayerField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ))
  .add('KeyField', () => (
    <ValueStateHolder
      initialValue={'Space'}
      render={(value, onChange) => (
        <KeyField
          project={project}
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ))
  .add('MouseField', () => (
    <ValueStateHolder
      initialValue={'Left'}
      render={(value, onChange) => (
        <MouseField
          project={project}
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ))
  .add('SceneVariableField', () => (
    <ValueStateHolder
      initialValue={'Variable1'}
      render={(value, onChange) => (
        <SceneVariableField
          project={project}
          layout={testLayout}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
        />
      )}
    />
  ))
  .add('SceneVariableField (without layout and project)', () => (
    <ValueStateHolder
      initialValue={'Variable1'}
      render={(value, onChange) => (
        <SceneVariableField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ))
  .add('ObjectVariableField (without expression, layout and project)', () => (
    <ValueStateHolder
      initialValue={'Variable1'}
      render={(value, onChange) => (
        <ObjectVariableField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ))
  .add('ParameterColorField', () => (
    <ValueStateHolder
      initialValue={'"123;342;345"'}
      render={(value, onChange) => (
        <ColorExpressionField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ))
  .add('ParameterColorField (inline)', () => (
    <ValueStateHolder
      initialValue={'"123;342;345"'}
      render={(value, onChange) => (
        <ColorExpressionField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          isInline
        />
      )}
    />
  ))
  .add('TrueFalseField', () => (
    <ValueStateHolder
      initialValue={''}
      render={(value, onChange) => (
        <TrueFalseField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          isInline
        />
      )}
    />
  ))
  .add('YesNoField', () => (
    <ValueStateHolder
      initialValue={''}
      render={(value, onChange) => (
        <YesNoField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          isInline
        />
      )}
    />
  ))
  .add('ForceMultiplierField', () => (
    <ValueStateHolder
      initialValue={''}
      render={(value, onChange) => (
        <ForceMultiplierField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ))
  .add('ForceMultiplierField (with a deprecated value)', () => (
    <ValueStateHolder
      initialValue={'0.8'}
      render={(value, onChange) => (
        <ForceMultiplierField
          value={value}
          onChange={onChange}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
        />
      )}
    />
  ));

storiesOf('LocalExport', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <GDI18nProvider language="en">
      <LocalExport open project={project} onClose={action('close')} />
    </GDI18nProvider>
  ));

storiesOf('LocalS3Export', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <GDI18nProvider language="en">
      <LocalS3Export open project={project} onClose={action('close')} />
    </GDI18nProvider>
  ));

storiesOf('LocalCordovaExport', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <GDI18nProvider language="en">
      <LocalCordovaExport project={project} />
    </GDI18nProvider>
  ));

storiesOf('BuildStepsProgress', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('BuildStepsProgress (not started)', () => (
    <BuildStepsProgress
      exportStep={''}
      build={null}
      onDownload={action('download')}
      uploadMax={0}
      uploadProgress={0}
      errored={false}
    />
  ))
  .add('BuildStepsProgress (export)', () => (
    <BuildStepsProgress
      exportStep={'export'}
      build={null}
      onDownload={action('download')}
      uploadMax={0}
      uploadProgress={0}
      errored={false}
    />
  ))
  .add('BuildStepsProgress (compress)', () => (
    <BuildStepsProgress
      exportStep={'compress'}
      build={null}
      onDownload={action('download')}
      uploadMax={0}
      uploadProgress={0}
      errored={false}
    />
  ))
  .add('BuildStepsProgress (upload)', () => (
    <BuildStepsProgress
      exportStep={'upload'}
      build={null}
      onDownload={action('download')}
      uploadMax={100}
      uploadProgress={20}
      errored={false}
    />
  ))
  .add('BuildStepsProgress (upload) (errored)', () => (
    <BuildStepsProgress
      exportStep={'upload'}
      build={null}
      onDownload={action('download')}
      uploadMax={100}
      uploadProgress={20}
      errored
    />
  ))
  .add('BuildStepsProgress (waiting-for-build)', () => (
    <BuildStepsProgress
      exportStep={'waiting-for-build'}
      build={null}
      onDownload={action('download')}
      uploadMax={100}
      uploadProgress={20}
      errored
    />
  ))
  .add('BuildStepsProgress (build)', () => (
    <BuildStepsProgress
      exportStep={'build'}
      build={{
        id: 'fake-build-id',
        userId: 'fake-user-id',
        type: 'electron-build',
        status: 'pending',
        updatedAt: Date.now(),
        createdAt: Date.now(),
      }}
      onDownload={action('download')}
      uploadMax={100}
      uploadProgress={20}
      errored
      showSeeAllMyBuildsExplanation
    />
  ))
  .add('BuildStepsProgress (build) (errored)', () => (
    <BuildStepsProgress
      exportStep={'build'}
      build={{
        id: 'fake-build-id',
        userId: 'fake-user-id',
        type: 'cordova-build',
        status: 'error',
        logsKey: '/fake-error.log',
        updatedAt: Date.now(),
        createdAt: Date.now(),
      }}
      onDownload={action('download')}
      uploadMax={100}
      uploadProgress={20}
      errored
    />
  ))
  .add('BuildStepsProgress (build) (complete)', () => (
    <BuildStepsProgress
      exportStep={'build'}
      build={{
        id: 'fake-build-id',
        userId: 'fake-user-id',
        type: 'cordova-build',
        status: 'complete',
        logsKey: '/fake-error.log',
        apkKey: '/fake-game.apk',
        updatedAt: Date.now(),
        createdAt: Date.now(),
      }}
      onDownload={action('download')}
      uploadMax={100}
      uploadProgress={20}
      errored
    />
  ));

storiesOf('BuildProgress', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('errored', () => (
    <BuildProgress
      build={{
        status: 'error',
        logsKey: '/fake-error.log',
      }}
      onDownload={action('download')}
    />
  ))
  .add('pending (electron-build)', () => (
    <BuildProgress
      build={{
        type: 'electron-build',
        status: 'pending',
        updatedAt: Date.now(),
      }}
      onDownload={action('download')}
    />
  ))
  .add('pending (cordova-build)', () => (
    <BuildProgress
      build={{
        type: 'cordova-build',
        status: 'pending',
        updatedAt: Date.now(),
      }}
      onDownload={action('download')}
    />
  ))
  .add('pending and very old (cordova-build)', () => (
    <BuildProgress
      build={{
        type: 'cordova-build',
        status: 'pending',
        updatedAt: Date.now() - 1000 * 3600 * 24,
      }}
      onDownload={action('download')}
    />
  ))
  .add('complete (cordova-build)', () => (
    <BuildProgress
      build={{
        type: 'cordova-build',
        status: 'complete',
        logsKey: '/fake-error.log',
        apkKey: '/fake-game.apk',
        updatedAt: Date.now(),
      }}
      onDownload={action('download')}
    />
  ))
  .add('complete (electron-build)', () => (
    <BuildProgress
      build={{
        type: 'electron-build',
        status: 'complete',
        logsKey: '/fake-error.log',
        windowsExeKey: '/fake-windows-game.exe',
        windowsZipKey: '/fake-windows-game.zip',
        macosZipKey: '/fake-macos-game.zip',
        linuxAppImageKey: '/fake-linux-game.AppImage',
        updatedAt: Date.now(),
      }}
      onDownload={action('download')}
    />
  ));

storiesOf('LocalFolderPicker', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => <LocalFolderPicker floatingLabelText="Export folder" />)
  .add('full width', () => (
    <LocalFolderPicker floatingLabelText="Export folder" fullWidth />
  ));

storiesOf('LocalFilePicker', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('full width', () => (
    <ValueStateHolder
      initialValue={'/test/myfile.txt'}
      render={(value, onChange) => (
        <LocalFilePicker
          title="File picker title"
          message="File picker message"
          filters={[
            {
              name: 'Compressed file',
              extensions: ['zip'],
            },
          ]}
          value={value}
          defaultPath={'/'}
          onChange={onChange}
          fullWidth
        />
      )}
    />
  ));

storiesOf('StartPage', module)
  .addDecorator(muiDecorator)
  .addDecorator(i18nProviderDecorator)
  .add('default', () => (
    <StartPage onOpenLanguageDialog={action('open language dialog')} />
  ));

storiesOf('DebuggerContent', module)
  .addDecorator(muiDecorator)
  .add('with data', () => (
    <DragDropContextProvider>
      <div style={{ height: 550, display: 'flex' }}>
        <DebuggerContent
          gameData={debuggerGameDataDump}
          onPause={action('on pause')}
          onPlay={action('on play')}
          onRefresh={action('on refresh')}
          onEdit={() => false}
          onCall={() => false}
          onStartProfiler={action('start profiler')}
          onStopProfiler={action('stop profiler')}
          profilerOutput={profilerOutput}
          profilingInProgress={false}
        />
      </div>
    </DragDropContextProvider>
  ))
  .add('without data', () => (
    <DragDropContextProvider>
      <div style={{ height: 550, display: 'flex' }}>
        <DebuggerContent
          gameData={null}
          onPause={action('on pause')}
          onPlay={action('on play')}
          onRefresh={action('on refresh')}
          onEdit={() => false}
          onCall={() => false}
          onStartProfiler={action('start profiler')}
          onStopProfiler={action('stop profiler')}
          profilerOutput={profilerOutput}
          profilingInProgress={true}
        />
      </div>
    </DragDropContextProvider>
  ));

storiesOf('Profiler', module)
  .addDecorator(muiDecorator)
  .add('without profiler output', () => (
    <DragDropContextProvider>
      <div style={{ height: 550, display: 'flex' }}>
        <Profiler
          onStart={action('start profiler')}
          onStop={action('stop profiler')}
          profilerOutput={null}
          profilingInProgress={false}
        />
      </div>
    </DragDropContextProvider>
  ))
  .add('without profiler output, while profiling', () => (
    <DragDropContextProvider>
      <div style={{ height: 550, display: 'flex' }}>
        <Profiler
          onStart={action('start profiler')}
          onStop={action('stop profiler')}
          profilerOutput={null}
          profilingInProgress={true}
        />
      </div>
    </DragDropContextProvider>
  ))
  .add('with profiler output', () => (
    <DragDropContextProvider>
      <div style={{ height: 550, display: 'flex' }}>
        <Profiler
          onStart={action('start profiler')}
          onStop={action('stop profiler')}
          profilerOutput={profilerOutput}
          profilingInProgress={false}
        />
      </div>
    </DragDropContextProvider>
  ))
  .add('with profiler output, while profiling', () => (
    <DragDropContextProvider>
      <div style={{ height: 550, display: 'flex' }}>
        <Profiler
          onStart={action('start profiler')}
          onStop={action('stop profiler')}
          profilerOutput={profilerOutput}
          profilingInProgress={true}
        />
      </div>
    </DragDropContextProvider>
  ));

storiesOf('MeasuresTable', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <div style={{ height: 250 }}>
      <MeasuresTable profilerMeasures={profilerOutput.framesAverageMeasures} />
    </div>
  ));

storiesOf('AboutDialog', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <AboutDialog
      open
      onClose={action('close')}
      updateStatus={{ message: '', status: 'unknown' }}
    />
  ));

storiesOf('CreateProjectDialog', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <CreateProjectDialog
      open
      examplesComponent={Placeholder}
      startersComponent={Placeholder}
    />
  ));

storiesOf('LayoutChooserDialog', module)
  .addDecorator(muiDecorator)
  .add('default', () => <LayoutChooserDialog open project={project} />);

storiesOf('EventsTree', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <DragDropContextProvider>
      <div className="gd-events-sheet" style={{ height: 500, display: 'flex' }}>
        <EventsTree
          events={testLayout.getEvents()}
          project={project}
          layout={testLayout}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          selection={getInitialSelection()}
          onAddNewInstruction={action('add new instruction')}
          onMoveToInstruction={action('move to instruction')}
          onMoveToInstructionsList={action('move instruction to list')}
          onInstructionClick={action('instruction click')}
          onInstructionDoubleClick={action('instruction double click')}
          onInstructionContextMenu={action('instruction context menu')}
          onInstructionsListContextMenu={action(
            'instruction list context menu'
          )}
          onParameterClick={action('parameter click')}
          onEventClick={action('event click')}
          onEventContextMenu={action('event context menu')}
          onAddNewEvent={action('add new event')}
          onOpenExternalEvents={action('open external events')}
          onOpenLayout={action('open layout')}
          searchResults={null}
          searchFocusOffset={null}
          onEventMoved={() => {}}
        />
      </div>
    </DragDropContextProvider>
  ));

storiesOf('EventsSheet', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <DragDropContextProvider>
      <div className="gd-events-sheet" style={{ height: 500, display: 'flex' }}>
        <EventsSheet
          project={project}
          layout={testLayout}
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          events={testLayout.getEvents()}
          onOpenExternalEvents={action('Open external events')}
          resourceSources={[]}
          onChooseResource={source =>
            action('Choose resource from source', source)
          }
          resourceExternalEditors={[]}
          onOpenDebugger={action('open debugger')}
          onOpenLayout={action('open layout')}
          onOpenSettings={action('open settings')}
          onPreview={action('preview')}
          setToolbar={() => {}}
          showNetworkPreviewButton={false}
          showPreviewButton={false}
          openInstructionOrExpression={action('open instruction or expression')}
        />
      </div>
    </DragDropContextProvider>
  ))
  .add('empty (no events)', () => (
    <DragDropContextProvider>
      <div className="gd-events-sheet" style={{ height: 500, display: 'flex' }}>
        <EventsSheet
          project={project}
          layout={emptyLayout}
          globalObjectsContainer={project}
          objectsContainer={emptyLayout}
          events={emptyLayout.getEvents()}
          onOpenExternalEvents={action('Open external events')}
          resourceSources={[]}
          onChooseResource={source =>
            action('Choose resource from source', source)
          }
          resourceExternalEditors={[]}
          onOpenDebugger={action('open debugger')}
          onOpenLayout={action('open layout')}
          onOpenSettings={action('open settings')}
          onPreview={action('preview')}
          setToolbar={() => {}}
          showNetworkPreviewButton={false}
          showPreviewButton={false}
          openInstructionOrExpression={action('open instruction or expression')}
        />
      </div>
    </DragDropContextProvider>
  ));

storiesOf('SearchPanel', module)
  .addDecorator(muiDecorator)
  .add('default (no search done)', () => (
    <SearchPanel
      onSearchInEvents={() => {}}
      onReplaceInEvents={() => {}}
      resultsCount={null}
      hasEventSelected={false}
      onGoToNextSearchResult={action('next')}
      onGoToPreviousSearchResult={action('previous')}
    />
  ))
  .add('default (no results)', () => (
    <SearchPanel
      onSearchInEvents={() => {}}
      onReplaceInEvents={() => {}}
      resultsCount={0}
      hasEventSelected={false}
      onGoToNextSearchResult={action('next')}
      onGoToPreviousSearchResult={action('previous')}
    />
  ))
  .add('3 results', () => (
    <SearchPanel
      onSearchInEvents={() => {}}
      onReplaceInEvents={() => {}}
      resultsCount={3}
      hasEventSelected={false}
      onGoToNextSearchResult={action('next')}
      onGoToPreviousSearchResult={action('previous')}
    />
  ));

storiesOf('ExpressionSelector', module)
  .addDecorator(muiDecorator)
  .add('number (with focusOnMount)', () => (
    <ExpressionSelector
      selectedType=""
      expressionType="number"
      onChoose={action('Expression chosen')}
      focusOnMount
    />
  ))
  .add('string (with focusOnMount)', () => (
    <ExpressionSelector
      selectedType=""
      expressionType="string"
      onChoose={action('(String) Expression chosen')}
      focusOnMount
    />
  ));

storiesOf('InstructionSelector', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <InstructionSelector
      selectedType=""
      onChoose={action('Instruction chosen')}
      isCondition
    />
  ));

storiesOf('InstructionEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <InstructionEditor
      project={project}
      layout={testLayout}
      globalObjectsContainer={project}
      objectsContainer={testLayout}
      isCondition
      instruction={testInstruction}
      resourceExternalEditors={[]}
      onChooseResource={() => {
        action('onChooseResource');
        return Promise.reject();
      }}
      resourceSources={[]}
      openInstructionOrExpression={action('open instruction or expression')}
    />
  ))
  .add('without layout', () => (
    <InstructionEditor
      project={project}
      layout={null}
      globalObjectsContainer={project}
      objectsContainer={testLayout}
      isCondition
      instruction={testInstruction}
      resourceExternalEditors={[]}
      onChooseResource={() => {
        action('onChooseResource');
        return Promise.reject();
      }}
      resourceSources={[]}
      openInstructionOrExpression={action('open instruction or expression')}
    />
  ));

storiesOf('TextEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={textObject}>
      <TextEditor object={textObject} project={project} />
    </SerializedObjectDisplay>
  ));

storiesOf('TiledSpriteEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={tiledSpriteObject}>
      <TiledSpriteEditor
        object={tiledSpriteObject}
        project={project}
        resourceSources={[]}
        onChooseResource={source =>
          action('Choose resource from source', source)
        }
        resourceExternalEditors={[]}
      />
    </SerializedObjectDisplay>
  ));

storiesOf('PanelSpriteEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={panelSpriteObject}>
      <PanelSpriteEditor
        object={panelSpriteObject}
        project={project}
        resourceSources={[]}
        onChooseResource={source =>
          action('Choose resource from source', source)
        }
        resourceExternalEditors={[]}
      />
    </SerializedObjectDisplay>
  ));

storiesOf('SpriteEditor and related editors', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('SpriteEditor', () => (
    <SerializedObjectDisplay object={spriteObject}>
      <SpriteEditor
        object={spriteObject}
        project={project}
        resourceSources={[]}
        onChooseResource={source =>
          action('Choose resource from source', source)
        }
        resourceExternalEditors={[]}
      />
    </SerializedObjectDisplay>
  ))
  .add('PointsEditor', () => (
    <SerializedObjectDisplay object={spriteObject}>
      <PointsEditor
        object={spriteObject}
        project={project}
        resourcesLoader={ResourcesLoader}
      />
    </SerializedObjectDisplay>
  ))
  .add('CollisionMasksEditor', () => (
    <SerializedObjectDisplay object={spriteObject}>
      <CollisionMasksEditor
        object={spriteObject}
        project={project}
        resourcesLoader={ResourcesLoader}
      />
    </SerializedObjectDisplay>
  ));

storiesOf('ShapePainterEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={shapePainterObject}>
      <ShapePainterEditor object={shapePainterObject} project={project} />
    </SerializedObjectDisplay>
  ));

storiesOf('ImageThumbnail', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <ImageThumbnail
      project={project}
      resourceName="res/icon128.png"
      resourcesLoader={ResourcesLoader}
    />
  ))
  .add('selectable', () => (
    <ImageThumbnail
      selectable
      project={project}
      resourceName="res/icon128.png"
      resourcesLoader={ResourcesLoader}
    />
  ));

storiesOf('EmptyEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => <EmptyEditor />);

storiesOf('ObjectsList', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={testLayout}>
      <div style={{ height: 250 }}>
        <ObjectsList
          getThumbnail={() => 'res/unknown32.png'}
          project={project}
          objectsContainer={testLayout}
          onEditObject={action('On edit object')}
          selectedObjectNames={[]}
        />
      </div>
    </SerializedObjectDisplay>
  ));

storiesOf('ObjectSelector', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('without groups', () => (
    <ValueStateHolder
      initialValue={''}
      render={(value, onChange) => (
        <ObjectSelector
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
          onChoose={action('onChoose in ObjectSelector')}
          noGroups
          hintText="Choose an object to add to the group"
          fullWidth
          openOnFocus
        />
      )}
    />
  ))
  .add('with groups', () => (
    <ValueStateHolder
      initialValue={''}
      render={(value, onChange) => (
        <ObjectSelector
          globalObjectsContainer={project}
          objectsContainer={testLayout}
          value={value}
          onChange={onChange}
          onChoose={action('onChoose in ObjectSelector')}
          hintText="Choose an object or a group"
          fullWidth
          openOnFocus
        />
      )}
    />
  ));

storiesOf('InstancePropertiesEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={testLayout}>
      <InstancePropertiesEditor
        project={project}
        layout={testLayout}
        instances={[testLayoutInstance1]}
        editInstanceVariables={action('edit instance variables')}
        editObjectVariables={action('edit object variables')}
        onEditObjectByName={action('edit object')}
      />
    </SerializedObjectDisplay>
  ));

storiesOf('ObjectGroupEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <ObjectGroupEditor project={project} layout={testLayout} group={group2} />
  ));

storiesOf('ObjectGroupsList', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={testLayout}>
      <div style={{ height: 250 }}>
        <ObjectGroupsList
          project={project}
          objectsContainer={testLayout}
          onEditGroup={() => {}}
        />
      </div>
    </SerializedObjectDisplay>
  ));

storiesOf('BehaviorsEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={spriteObjectWithBehaviors}>
      <BehaviorsEditor project={project} object={spriteObjectWithBehaviors} />
    </SerializedObjectDisplay>
  ));

storiesOf('VariablesList', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SerializedObjectDisplay object={testLayout}>
      <VariablesList variablesContainer={testLayout.getVariables()} />
    </SerializedObjectDisplay>
  ));

const fakeError = new Error('Fake error for storybook');
storiesOf('ErrorBoundary', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <ErrorFallbackComponent componentStack="Fake stack" error={fakeError} />
  ));

storiesOf('Changelog', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('no breaking changes in this version (but in a previous)', () => (
    <ChangelogRenderer
      releases={[release, releaseWithBreakingChange]}
      error={null}
      currentReleaseName="5.0.0-beta62"
    />
  ))
  .add('breaking changes in this version', () => (
    <ChangelogRenderer
      releases={[releaseWithBreakingChange]}
      error={null}
      currentReleaseName="5.0.0-beta60"
    />
  ))
  .add('release without a description', () => (
    <ChangelogRenderer
      releases={[releaseWithoutDescription]}
      error={null}
      currentReleaseName="5.0.0-beta60"
    />
  ))
  .add('loading', () => (
    <ChangelogRenderer
      releases={null}
      error={null}
      currentReleaseName="5.0.0-beta62"
    />
  ))
  .add('with error', () => (
    <ChangelogRenderer
      releases={null}
      error={new Error('Fake error')}
      currentReleaseName="5.0.0-beta62"
    />
  ))
  .add('complete changelog dialog', () => (
    <ChangelogDialog open onClose={action('close dialog')} />
  ));

storiesOf('CreateProfile', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => <CreateProfile onLogin={action('login')} />);

storiesOf('LimitDisplayer', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <LimitDisplayer
      subscription={subscriptionForIndieUser}
      limit={limitsForIndieUser['cordova-build']}
      onChangeSubscription={action('change subscription')}
    />
  ))
  .add('limit reached', () => (
    <LimitDisplayer
      subscription={subscriptionForIndieUser}
      limit={limitsReached['cordova-build']}
      onChangeSubscription={action('change subscription')}
    />
  ))
  .add('limit reached without subscription', () => (
    <LimitDisplayer
      subscription={noSubscription}
      limit={limitsReached['cordova-build']}
      onChangeSubscription={action('change subscription')}
    />
  ));

storiesOf('ProfileDetails', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('profile', () => <ProfileDetails profile={profileForIndieUser} />)
  .add('loading', () => <ProfileDetails profile={null} />);

storiesOf('SubscriptionDetails', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <SubscriptionDetails
      subscription={subscriptionForIndieUser}
      onChangeSubscription={action('change subscription')}
    />
  ))
  .add('limit reached', () => (
    <SubscriptionDetails
      subscription={noSubscription}
      onChangeSubscription={action('change subscription')}
    />
  ));

storiesOf('UsagesDetails', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => <UsagesDetails usages={usagesForIndieUser} />)
  .add('empty', () => <UsagesDetails usages={[]} />);

storiesOf('SubscriptionDialog', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('not authenticated', () => (
    <UserProfileContext.Provider value={fakeNotAuthenticatedUserProfile}>
      <SubscriptionDialog open onClose={action('on close')} />
    </UserProfileContext.Provider>
  ))
  .add('authenticated but loading', () => (
    <UserProfileContext.Provider value={fakeAuthenticatedButLoadingUserProfile}>
      <SubscriptionDialog open onClose={action('on close')} />
    </UserProfileContext.Provider>
  ))
  .add('authenticated user with subscription', () => (
    <UserProfileContext.Provider value={fakeIndieUserProfile}>
      <SubscriptionDialog open onClose={action('on close')} />
    </UserProfileContext.Provider>
  ))
  .add('authenticated user with no subscription', () => (
    <UserProfileContext.Provider value={fakeNoSubscriptionUserProfile}>
      <SubscriptionDialog open onClose={action('on close')} />
    </UserProfileContext.Provider>
  ));

storiesOf('LoginDialog', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <LoginDialog
      open
      onClose={action('on close')}
      loginInProgress={false}
      createAccountInProgress={false}
      onCreateAccount={action('on create account')}
      onLogin={action('on login')}
      onForgotPassword={action('on forgot password')}
      onCloseResetPasswordDialog={action('on close reset password dialog')}
      resetPasswordDialogOpen={false}
      forgotPasswordInProgress={false}
      error={null}
    />
  ))
  .add('login in progress', () => (
    <LoginDialog
      open
      onClose={action('on close')}
      loginInProgress
      createAccountInProgress={false}
      onCreateAccount={action('on create account')}
      onLogin={action('on login')}
      onForgotPassword={action('on forgot password')}
      onCloseResetPasswordDialog={action('on close reset password dialog')}
      resetPasswordDialogOpen={false}
      forgotPasswordInProgress={false}
      error={null}
    />
  ))
  .add('create account in progress', () => (
    <LoginDialog
      open
      onClose={action('on close')}
      loginInProgress={false}
      createAccountInProgress
      onCreateAccount={action('on create account')}
      onLogin={action('on login')}
      onForgotPassword={action('on forgot password')}
      onCloseResetPasswordDialog={action('on close reset password dialog')}
      resetPasswordDialogOpen={false}
      forgotPasswordInProgress={false}
      error={null}
    />
  ))
  .add('weak-password error', () => (
    <LoginDialog
      open
      onClose={action('on close')}
      loginInProgress={false}
      createAccountInProgress={false}
      onCreateAccount={action('on create account')}
      onLogin={action('on login')}
      onForgotPassword={action('on forgot password')}
      onCloseResetPasswordDialog={action('on close reset password dialog')}
      resetPasswordDialogOpen={false}
      forgotPasswordInProgress={false}
      error={{
        code: 'auth/weak-password',
      }}
    />
  ))
  .add('invalid-email error', () => (
    <LoginDialog
      open
      onClose={action('on close')}
      loginInProgress={false}
      createAccountInProgress={false}
      onCreateAccount={action('on create account')}
      onLogin={action('on login')}
      onForgotPassword={action('on forgot password')}
      onCloseResetPasswordDialog={action('on close reset password dialog')}
      resetPasswordDialogOpen={false}
      forgotPasswordInProgress={false}
      error={{
        code: 'auth/invalid-email',
      }}
    />
  ))
  .add('Reset password', () => (
    <LoginDialog
      open
      onClose={action('on close')}
      loginInProgress={false}
      createAccountInProgress={false}
      onCreateAccount={action('on create account')}
      onLogin={action('on login')}
      onForgotPassword={action('on forgot password')}
      onCloseResetPasswordDialog={action('on close reset password dialog')}
      forgotPasswordInProgress={false}
      resetPasswordDialogOpen
      error={null}
    />
  ));

storiesOf('LocalNetworkPreviewDialog', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <LocalNetworkPreviewDialog
      open
      url="192.168.0.1:2929"
      error={null}
      onRunPreviewLocally={action('on run preview locally')}
      onExport={action('on export')}
      onClose={action('on close')}
    />
  ))
  .add('waiting for url', () => (
    <LocalNetworkPreviewDialog
      open
      url=""
      error={null}
      onRunPreviewLocally={action('on run preview locally')}
      onExport={action('on export')}
      onClose={action('on close')}
    />
  ))
  .add('error', () => (
    <LocalNetworkPreviewDialog
      open
      url="192.168.0.1:2929"
      error={{ message: 'Oops' }}
      onRunPreviewLocally={action('on run preview locally')}
      onExport={action('on export')}
      onClose={action('on close')}
    />
  ));

storiesOf('SubscriptionCheckDialog', module)
  .addDecorator(muiDecorator)
  .add('default (try mode)', () => (
    <RefGetter onRef={ref => ref.checkHasSubscription()}>
      <SubscriptionCheckDialog
        title="Preview over wifi"
        id="Preview over wifi"
        userProfile={fakeNoSubscriptionUserProfile}
        onChangeSubscription={action('change subscription')}
        mode="try"
      />
    </RefGetter>
  ))
  .add('default (mandatory mode)', () => (
    <RefGetter onRef={ref => ref.checkHasSubscription()}>
      <SubscriptionCheckDialog
        title="Preview over wifi"
        id="Preview over wifi"
        userProfile={fakeNoSubscriptionUserProfile}
        onChangeSubscription={action('change subscription')}
        mode="mandatory"
      />
    </RefGetter>
  ));

storiesOf('ResourcePreview', module)
  .addDecorator(muiDecorator)
  .add('not existing/missing resource', () => (
    <ResourcePreview
      project={project}
      resourceName="resource-that-does-not-exists-in-the-project"
      resourcesLoader={ResourcesLoader}
    />
  ))
  .add('image resource', () => (
    <ResourcePreview
      project={project}
      resourceName="icon128.png"
      resourcesLoader={ResourcesLoader}
    />
  ))
  .add('audio resource', () => (
    <ResourcePreview
      project={project}
      resourceName="fake-audio1.mp3"
      resourcesLoader={ResourcesLoader}
    />
  ));

storiesOf('ResourcesList', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <div style={{ height: 200 }}>
      <ValueStateHolder
        initialValue={null}
        render={(value, onChange) => (
          <ResourcesList
            onSelectResource={onChange}
            selectedResource={value}
            onDeleteResource={() => {}}
            onRenameResource={() => {}}
            project={project}
          />
        )}
      />
    </div>
  ));

storiesOf('EventsFunctionConfigurationEditor', module)
  .addDecorator(paperDecorator)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <div style={{ height: 500, display: 'flex' }}>
      <EventsFunctionConfigurationEditor
        project={project}
        eventsFunction={testEventsFunction}
        onParametersUpdated={() => {}}
      />
    </div>
  ));

storiesOf('EventsFunctionsList', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <div style={{ height: 500, display: 'flex' }}>
      <EventsFunctionsList
        project={project}
        eventsFunctionsContainer={testEventsFunctionsExtension}
        selectedEventsFunction={testEventsFunctionsExtension.getEventsFunctionAt(
          1
        )}
        onSelectEventsFunction={action('select')}
        onDeleteEventsFunction={(eventsFunction, cb) => cb(true)}
        onRenameEventsFunction={(eventsFunction, newName, cb) => cb(true)}
        onEditOptions={action('edit options')}
      />
    </div>
  ));

storiesOf('EventsFunctionsExtensionEditor/index', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <DragDropContextProvider>
      <div style={{ height: 500, display: 'flex' }}>
        <EventsFunctionsExtensionEditor
          project={project}
          eventsFunctionsExtension={testEventsFunctionsExtension}
          setToolbar={() => {}}
          resourceSources={[]}
          onChooseResource={source =>
            action('Choose resource from source', source)
          }
          resourceExternalEditors={[]}
          openInstructionOrExpression={action('open instruction or expression')}
          initiallyFocusedFunctionName={null}
        />
      </div>
    </DragDropContextProvider>
  ));

storiesOf('EventsFunctionsExtensionEditor/OptionsEditorDialog', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <OptionsEditorDialog
      eventsFunctionsExtension={testEventsFunctionsExtension}
      open
      onClose={action('close')}
    />
  ));

storiesOf('ProjectManager', module)
  .addDecorator(muiDecorator)
  .add('default', () => (
    <ProjectManager
      project={project}
      onOpenExternalEvents={action('onOpenExternalEvents')}
      onOpenLayout={action('onOpenLayout')}
      onOpenExternalLayout={action('onOpenExternalLayout')}
      onOpenEventsFunctionsExtension={action('onOpenEventsFunctionsExtension')}
      onAddLayout={action('onAddLayout')}
      onAddExternalLayout={action('onAddExternalLayout')}
      onAddEventsFunctionsExtension={action('onAddEventsFunctionsExtension')}
      onAddExternalEvents={action('onAddExternalEvents')}
      onDeleteLayout={action('onDeleteLayout')}
      onDeleteExternalLayout={action('onDeleteExternalLayout')}
      onDeleteEventsFunctionsExtension={action(
        'onDeleteEventsFunctionsExtension'
      )}
      onDeleteExternalEvents={action('onDeleteExternalEvents')}
      onRenameLayout={action('onRenameLayout')}
      onRenameExternalLayout={action('onRenameExternalLayout')}
      onRenameEventsFunctionsExtension={action(
        'onRenameEventsFunctionsExtension'
      )}
      onRenameExternalEvents={action('onRenameExternalEvents')}
      onSaveProject={action('onSaveProject')}
      onCloseProject={action('onCloseProject')}
      onExportProject={action('onExportProject')}
      onOpenPreferences={action('onOpenPreferences')}
      onOpenResources={action('onOpenResources')}
      onOpenPlatformSpecificAssets={action('onOpenPlatformSpecificAssets')}
      onChangeSubscription={action('onChangeSubscription')}
      eventsFunctionsExtensionsError={null}
      onReloadEventsFunctionsExtensions={action(
        'onReloadEventsFunctionsExtensions'
      )}
      freezeUpdate={false}
    />
  ))
  .add('Error in functions', () => (
    <ProjectManager
      project={project}
      onOpenExternalEvents={action('onOpenExternalEvents')}
      onOpenLayout={action('onOpenLayout')}
      onOpenExternalLayout={action('onOpenExternalLayout')}
      onOpenEventsFunctionsExtension={action('onOpenEventsFunctionsExtension')}
      onAddLayout={action('onAddLayout')}
      onAddExternalLayout={action('onAddExternalLayout')}
      onAddEventsFunctionsExtension={action('onAddEventsFunctionsExtension')}
      onAddExternalEvents={action('onAddExternalEvents')}
      onDeleteLayout={action('onDeleteLayout')}
      onDeleteExternalLayout={action('onDeleteExternalLayout')}
      onDeleteEventsFunctionsExtension={action(
        'onDeleteEventsFunctionsExtension'
      )}
      onDeleteExternalEvents={action('onDeleteExternalEvents')}
      onRenameLayout={action('onRenameLayout')}
      onRenameExternalLayout={action('onRenameExternalLayout')}
      onRenameEventsFunctionsExtension={action(
        'onRenameEventsFunctionsExtension'
      )}
      onRenameExternalEvents={action('onRenameExternalEvents')}
      onSaveProject={action('onSaveProject')}
      onCloseProject={action('onCloseProject')}
      onExportProject={action('onExportProject')}
      onOpenPreferences={action('onOpenPreferences')}
      onOpenResources={action('onOpenResources')}
      onOpenPlatformSpecificAssets={action('onOpenPlatformSpecificAssets')}
      onChangeSubscription={action('onChangeSubscription')}
      eventsFunctionsExtensionsError={
        new Error('Fake error during code generation')
      }
      onReloadEventsFunctionsExtensions={action(
        'onReloadEventsFunctionsExtensions'
      )}
      freezeUpdate={false}
    />
  ));
