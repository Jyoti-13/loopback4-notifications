/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  SMSMessage,
  SMSNotification,
  SMSReceiver,
  SMSSubscriber,
} from '../types';

export interface SNSNotification extends SMSNotification {
  publish(message: SNSMessage): Promise<void>;
}

export interface SNSMessage extends SMSMessage {
  receiver: SNSReceiver;
}

export interface SNSReceiver extends SMSReceiver {
  to: SNSSubscriber[];
}

export interface SNSSubscriber extends SMSSubscriber {
  type: SNSSubscriberType;
}

export const enum SNSSubscriberType {
  PhoneNumber,
  Topic,
}

export const enum SNSSMSType {
  Promotional = 'Promotional',
  Transactional = 'Transactional',
}

export class Endpoint {


  /**
   * The host portion of the endpoint including the port, e.g., example.com:80.
   */
  host: string;
  /**
   * The host portion of the endpoint, e.g., example.com.
   */
  hostname: string;
  /**
   * The full URL of the endpoint.
   */
  href: string;
  /**
   * The port of the endpoint.
   */
  port: number;
  /**
   * The protocol (http or https) of the endpoint URL.
   */
  protocol: string;
}

export type apiVersion = "2010-03-31"|"latest"|string;
  export interface ClientApiVersions {
    /**
     * A string in YYYY-MM-DD format that represents the latest possible API version that can be used in this service. Specify 'latest' to use the latest possible version.
     */
    apiVersion?: apiVersion;
  }

  export interface ServiceConfigurationOptions {
    /**
     * The endpoint URI to send requests to. The default endpoint is built from the configured region.
     * The endpoint should be a string like 'https://{service}.{region}.amazonaws.com' or an Endpoint object.
     */
    endpoint?: string | Endpoint;
    /**
     * An optional map of parameters to bind to every request sent by this service object.
     * For more information on bound parameters, see "Working with Services" in the Getting Started Guide.
     */
    params?: {
        [key: string]: any;
    }
}

export namespace SNS{

  export type ClientConfiguration = ServiceConfigurationOptions & ClientApiVersions;

}
