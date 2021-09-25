import * as admin from 'firebase-admin';
import { appCheck, AppOptions, auth, database, firestore, installations, instanceId, machineLearning, messaging, projectManagement, remoteConfig, securityRules, storage } from 'firebase-admin';
import {
  PushMessage,
  PushNotification,
  PushReceiver,
  PushSubscriber,
} from '../types';

export interface FcmNotification extends PushNotification {
  publish(message: FcmMessage): Promise<void>;
}

export interface FcmMessage extends PushMessage {
  /**
   * If the requirement is to send push on topic or condition,
   * send receiver as empty array
   */
  receiver: FcmReceiver;
  options: {
    /**
     * URL of an image to be displayed in the notification.
     */
    imageUrl?: string;
    /**
     * @param dryRun Whether to send the message in the dry-run
     *   (validation only) mode.
     *
     * Whether or not the message should actually be sent. When set to `true`,
     * allows developers to test a request without actually sending a message. When
     * set to `false`, the message will be sent.
     *
     * **Default value:** `false`
     */
    dryRun?: boolean;
    android?: admin.messaging.AndroidConfig;
    webpush?: admin.messaging.WebpushConfig;
    apns?: admin.messaging.ApnsConfig;
    fcmOptions?: admin.messaging.FcmOptions;
    // sonarignore:start
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    // sonarignore:end
  };
}

export interface FcmReceiver extends PushReceiver {
  to: FcmSubscriber[];
}

export interface FcmSubscriber extends PushSubscriber {
  type: FcmSubscriberType;
  id: string;
}

/**
 * The topic name can be optionally prefixed with "/topics/".
 *
 * the following condition will send messages to devices that are subscribed
 * to TopicA and either TopicB or TopicC
 *
 * "'TopicA' in topics && ('TopicB' in topics || 'TopicC' in topics)"
 *
 *
 * topic?: string;
 *
 * FCM first evaluates any conditions in parentheses, and then evaluates the
 * expression from left to right. In the above expression, a user subscribed
 * to any single topic does not receive the message. Likewise, a user who does
 * not subscribe to TopicA does not receive the message.
 *
 * You can include up to five topics in your conditional expression.
 *
 * example"
 * "'stock-GOOG' in topics || 'industry-tech' in topics"
 *
 * condition?: string;
 */

export const enum FcmSubscriberType {
  RegistrationToken,
  FCMTopic,
  FCMCondition,
}

export interface FcmConfig {
  dbUrl: string;
  serviceAccountPath: string;
}

export declare namespace app {
  /**
   * A Firebase app holds the initialization information for a collection of
   * services.
   *
   * Do not call this constructor directly. Instead, use
   * {@link
   *   https://firebase.google.com/docs/reference/admin/node/admin#.initializeApp
   *   `admin.initializeApp()`}
   * to create an app.
   */
  interface App {
      /**
       * The (read-only) name for this app.
       *
       * The default app's name is `"[DEFAULT]"`.
       *
       * @example
       * ```javascript
       * // The default app's name is "[DEFAULT]"
       * admin.initializeApp(defaultAppConfig);
       * console.log(admin.app().name);  // "[DEFAULT]"
       * ```
       *
       * @example
       * ```javascript
       * // A named app's name is what you provide to initializeApp()
       * var otherApp = admin.initializeApp(otherAppConfig, "other");
       * console.log(otherApp.name);  // "other"
       * ```
       */
      name: string;
      /**
       * The (read-only) configuration options for this app. These are the original
       * parameters given in
       * {@link
       *   https://firebase.google.com/docs/reference/admin/node/admin#.initializeApp
       *   `admin.initializeApp()`}.
       *
       * @example
       * ```javascript
       * var app = admin.initializeApp(config);
       * console.log(app.options.credential === config.credential);  // true
       * console.log(app.options.databaseURL === config.databaseURL);  // true
       * ```
       */
      options: AppOptions;
      appCheck(): appCheck.AppCheck;
      auth(): auth.Auth;
      database(url?: string): database.Database;
      firestore(): firestore.Firestore;
      installations(): installations.Installations;
      /** @deprecated */
      instanceId(): instanceId.InstanceId;
      machineLearning(): machineLearning.MachineLearning;
      messaging(): messaging.Messaging;
      projectManagement(): projectManagement.ProjectManagement;
      remoteConfig(): remoteConfig.RemoteConfig;
      securityRules(): securityRules.SecurityRules;
      storage(): storage.Storage;
      /**
       * Renders this local `FirebaseApp` unusable and frees the resources of
       * all associated services (though it does *not* clean up any backend
       * resources). When running the SDK locally, this method
       * must be called to ensure graceful termination of the process.
       *
       * @example
       * ```javascript
       * app.delete()
       *   .then(function() {
       *     console.log("App deleted successfully");
       *   })
       *   .catch(function(error) {
       *     console.log("Error deleting app:", error);
       *   });
       * ```
       */
      delete(): Promise<void>;
  }
}
