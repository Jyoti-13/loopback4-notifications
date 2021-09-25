/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {EmailMessage, EmailNotification, EmailSubscriber} from '../types';

export interface SESNotification extends EmailNotification {
  publish(message: SESMessage): Promise<void>;
}

export interface SESMessage extends EmailMessage {
  receiver: SESReceiver;
}

export interface SESReceiver {
  to: EmailSubscriber[];
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

export type apiVersion = "2010-12-01"|"latest"|string;
export interface ClientApiVersions {
  /**
   * A string in YYYY-MM-DD format that represents the latest possible API version that can be used in this service. Specify 'latest' to use the latest possible version.
   */
  apiVersion?: apiVersion;
}

export interface ServiceConfigurationOptions  {
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

export namespace SES {
   export namespace Types{
    export type ClientConfiguration = ServiceConfigurationOptions & ClientApiVersions;
   }

}
