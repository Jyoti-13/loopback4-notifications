/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Binding, BindingKey, Component, inject, ProviderMap} from '@loopback/core';
import {NotificationBindings} from './keys';
import {NotificationProvider} from './providers';
import {NodemailerBindings, SESBindings} from './providers/email';
import {FcmBindings, PubnubBindings, PubnubConfig} from './providers/push';
import {SocketBindings, SocketConfig} from './providers/push/socketio';
import {SNSBindings} from './providers/sms/sns';


export class NotificationsComponent implements Component {
  constructor(
    @inject(NodemailerBindings.Config,{optional:false})
    private readonly nodemailerBindings : BindingKey<any>,
    @inject(SESBindings.Config)
    private sesBindings: BindingKey<any>,
    @inject(PubnubBindings.Config)
    private pubnubBindings : BindingKey<PubnubConfig | null>,
    @inject(FcmBindings.Config)
    private fcmBindings: BindingKey<any>,
    @inject(SocketBindings.Config)
    private socketBindings: BindingKey<SocketConfig | null>,
    @inject(SNSBindings.Config)
    private snsBindings: BindingKey<any>
  ) {
    if(nodemailerBindings.toString()=== 'sf.notification.config.nodemailer'){
      //Dynamic calling of nodemailer file
      //./providers/email/nodemailer
    }
    if(sesBindings.toString()=== 'sf.notification.config.ses'){
      //Dynamic calling of ses file
      //./providers/email/ses
    }
    if(pubnubBindings.toString()=== 'sf.notification.config.pubnub'){
      //Dynamic calling of pubnub file
      //./providers/push/pubnub
      import("./providers/push/pubnub").then(({PubNubProvider})=>{
        console.log(PubNubProvider);
      }).catch((err) => {
        console.log("Failed to load moment", err);
    });
    }
    if(fcmBindings.toString()=== 'sf.notification.config.fcm'){
      //Dynamic calling of fcm file
      //./providers/push/fcm
    if(socketBindings.toString()=== 'sf.notification.config.socketio'){
      //Dynamic calling of socketio file
      //./providers/push/socketio
    }
    if(snsBindings.toString()=== 'sf.notification.config.sns'){
      //Dynamic calling of sns file
      //./providers/sms/sns
    }
  }

  }

  providers?: ProviderMap = {
    [NotificationBindings.NotificationProvider.key]: NotificationProvider,
  };

  bindings?: Binding[] = [
    Binding.bind(NotificationBindings.Config.key).to(null),
    Binding.bind(SESBindings.Config.key).to(null),
    Binding.bind(SNSBindings.Config.key).to(null),
    Binding.bind(PubnubBindings.Config.key).to(null),
    Binding.bind(SocketBindings.Config.key).to(null),
  ];


}
