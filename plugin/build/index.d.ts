import { ConfigPlugin } from "@expo/config-plugins";
import { AndroidProps } from "./android/props";
interface PluginProps {
    /**
     * Custom location of `google-services.json`,
     * relative to project root
     */
    androidGoogleServicesPath?: string;
    /**
     * Custom location of `GoogleService-Info.plist`,
     * relative to project root
     */
    iosGoogleServicesPath?: string;
    androidOptions?: AndroidProps;
}
declare let plugin: ConfigPlugin<PluginProps>;
export default plugin;
