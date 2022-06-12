import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
//RUN npm install popup-ui
import { Root, Popup } from 'popup-ui';

export default function SuccessPrompt() {
  return (
    <Root>
      <View>
        <TouchableOpacity
            onPress={() =>
              Popup.show({
                type: 'Success',
                title: 'Upload complete',
                button: true,
                textBody: 'Congrats! Your upload successfully done',
                buttontext: 'Ok',
                callback: () => Popup.hide()
              })
            }
        >
            <Text>Open Popup</Text>
        </TouchableOpacity>
    </View>
  </Root>
  );
}