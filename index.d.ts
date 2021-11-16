declare module '@hiveio/hive-js';
declare module '@hiveio/keychain';
declare module 'cryptocharts';
declare module 'ping.js'
declare global {
  interface Window {
    hive_keychain: any;
  }
}
