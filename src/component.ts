/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Binding, Component, inject, ProviderMap} from '@loopback/core';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {NotificationBindings} from './keys';
import {NotificationProvider} from './providers';
import {NodemailerBindings} from './providers/email/nodemailer';
import {SES, SESBindings} from './providers/email/ses';
import {FcmBindings} from './providers/push/fcm';
import { PubnubBindings, PubnubConfig} from './providers/push/pubnub';
import {SocketBindings, SocketConfig} from './providers/push/socketio';
import {SNS, SNSBindings} from './providers/sms/sns';
import * as admin from './providers/push/fcm/types'

export class NotificationsComponent implements Component {

  constructor(
    @inject(NodemailerBindings.Config,{optional:false})
    private readonly nodemailerBindings : SMTPTransport.Options | null,
    @inject(SESBindings.Config)
    private sesBindings: SES.Types.ClientConfiguration | null,
    @inject(PubnubBindings.Config)
    private pubnubBindings : PubnubConfig | null,
    @inject(FcmBindings.Config)
    private fcmBindings: admin.app.App | null,
    @inject(SocketBindings.Config)
    private socketBindings: SocketConfig | null,
    @inject(SNSBindings.Config)
    private snsBindings: SNS.ClientConfiguration | null
  ) {
    async function importFunction() {
      if(nodemailerBindings!= null){
        //Dynamic calling of nodemailer file
        //./providers/email/nodemailer
        const NodemailerBindings = await import('./providers/email/nodemailer')
        NodemailerBindings.NodemailerProvider
      }
      if(sesBindings!= null){
        //Dynamic calling of ses file
        //./providers/email/ses
        const SESBindings = await import('./providers/email/ses');
        SESBindings.SesProvider
      }
      if(pubnubBindings != null){
        //Dynamic calling of pubnub file
        //./providers/push/pubnub
        const PubnubBindings = await import('./providers/push/pubnub')
        PubnubBindings.PubNubProvider
      }
      if(fcmBindings!= null){
        //Dynamic calling of fcm file
        //./providers/push/fcm
        const FcmBindings = await import('./providers/push/fcm')
        FcmBindings.FcmProvider
      }
      if(socketBindings != null){
        //Dynamic calling of socketio file
        //./providers/push/socketio
        const SocketBindings = await import('./providers/push/socketio')
        SocketBindings.SocketIOProvider
      }
      if(snsBindings!= null){
        //Dynamic calling of sns file
        //./providers/sms/sns
        const SNSBindings = await import('./providers/sms/sns')
        SNSBindings.SnsProvider
      }

    }
    importFunction();
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
