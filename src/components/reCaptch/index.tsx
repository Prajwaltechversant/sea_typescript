import {View, Text, Button, Alert} from 'react-native';
import React, {useRef} from 'react';
import Recaptcha, { RecaptchaRef,RecaptchaProps } from 'react-native-recaptcha-that-works';

const ReCaptcha: React.FC = () => {
  const recaptcha = useRef<RecaptchaRef | null>(null);


  const send = () => {
    try {
        recaptcha.current?.open();
    } catch (error) {
        console.log(error);

    }
  };

  const onVerify = (token: string) => {
    try {
        console.log('success!', token);
    } catch (error) {
        console.log(error);
    }
  };

  const onExpire = () => {
    console.warn('expired!');
  };

  return (
    <View>
      <Recaptcha
        ref={recaptcha}
        siteKey="6LfUHA4qAAAAAAbwfibxvlCM5BIC1ZAGXDPpxx4-"
        baseUrl="http://localhost:8081/"
        onVerify={onVerify}
        onExpire={onExpire}
        onLoad={()=>{
          Alert.alert("Load")}}
        size="normal"
        onError={(err) => {
            console.log(err);
          }}        
          style={{justifyContent:'center', alignItems:'center', backgroundColor:'gray'}}
        
          modalProps={{ presentationStyle: 'pageSheet', animationType: 'slide', transparent: false }}

          loadingComponent={<Text>Loading....</Text>}


          footerComponent={<Text style={{textAlign:'center'}}>Loading...</Text>}
      />
      <Button title="Send" onPress={send} />
    </View>
  );
};


export default ReCaptcha