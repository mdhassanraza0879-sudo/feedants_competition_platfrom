import { Alert, Platform } from 'react-native';

export const showAppAlert = (
  title: string,
  message?: string,
  buttons?: Array<{ text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }>
) => {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      if (buttons && buttons.length > 1) {
        const confirmed = window.confirm(`${title}\n\n${message || ''}`);
        if (confirmed) {
          const okBtn = buttons.find((b) => b.style !== 'cancel') || buttons[0];
          if (okBtn && okBtn.onPress) okBtn.onPress();
        } else {
          const cancelBtn = buttons.find((b) => b.style === 'cancel');
          if (cancelBtn && cancelBtn.onPress) cancelBtn.onPress();
        }
      } else {
        window.alert(`${title}\n\n${message || ''}`);
        if (buttons && buttons[0] && buttons[0].onPress) {
          buttons[0].onPress();
        }
      }
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};
