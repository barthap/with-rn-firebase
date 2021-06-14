# Expo with-`react-native-firebase`

An [Expo config plugin](https://docs.expo.io/guides/config-plugins) for paineless setup of [`react-native-firebase`](https://rnfirebase.io/), without touching any native code!

You can learn more about it here:

- [Config Plugins - Expo docs](https://docs.expo.io/guides/config-plugins)
- Expo Managed Workflow in 2021: [part 1](https://blog.expo.io/expo-managed-workflow-in-2021-5b887bbf7dbb), [part 2](https://blog.expo.io/expo-managed-workflow-in-2021-d1c9b68aa10)

## Installation

#### Prerequisites:

- App project using Expo SDK 41+.
- Installed `expo-cli@4.4.4` or later.
- Installed `react-native-firebase` JavaScript libraries:
  ```sh
  yarn add @react-native-firebase/app
  yarn add @react-native-firebase/firestore
  # ...
  ```

#### With `expo install`

```
expo install with-rn-firebase
```

#### Without `expo install`

```sh
# using yarn
yarn add with-rn-firebase

# using npm
npm install with-rn-firebase
```

Open your `app.json` and update your `plugins` section (`expo install` would do it for you):

```json
{
  "plugins": ["with-rn-firebase"]
}
```

## Configuration

The plugin needs to know the location of your app's [Google Services files](https://support.google.com/firebase/answer/7015592#zippy=%2Cin-this-article) generated by Firebase. By default, it searches for them in `<project-root>/firebase` directory, but you can put them in any location. You can configure it by setting plugin properties in `app.json`:

```json
{
  "plugins": [
    [
      "with-rn-firebase",
      {
        "androidGoogleServicesPath": "./firebase/google-services.json",
        "iosGoogleServicesPath": "./firebase/GoogleServices-Info.plist"
      }
    ]
  ]
}
```

> The paths should be relative to your project root.

The plugin can also resolve them from traditional Expo config values [`expo.[ios|android].googleServicesFile`](https://docs.expo.io/versions/v41.0.0/config/app/#googleservicesfile). Be aware that these values are also used by built-in Expo plugins, which shouldn't, but in extreme cases may interfere with this plugin.

### Other configuration options

<details>
<summary>Install Performance Monitoring for Android</summary>

In order to install [Performance Monitoring](https://rnfirebase.io/perf/usage) on Android, set `androidOptions.installPerfMonitoring` to `true`:

```json
{
  "plugins": [
    [
      "with-rn-firebase",
      {
        //...
        "androidOptions": {
          "installPerfMonitoring": true
        }
      }
    ]
  ]
}
```

</details>

## Building and running

You can either:

- use `expo prebuild` or `expo run:android`/`expo run:ios` to update your native projects,
- use _[EAS Build](https://docs.expo.io/build/introduction/)_ to build your development client.

## Contributing

Contributions are very welcome! The package uses `expo-module-scripts` for most tasks. You can find detailed information [at this link](https://github.com/expo/expo/tree/master/packages/expo-module-scripts#-config-plugin).

Please make sure to run `yarn build`/`yarn rebuild` to update the `build` directory before pushing. The CI will fail otherwise.

## Credits

- _the Expo team_

## License

MIT
