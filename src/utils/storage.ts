const { ipcRenderer } = window.require("electron");

export enum StorageKey {
  steamId = "steamId",
  steamSecret = "steamSecret",
}

export class Storage {
  static async set(key: StorageKey, value: string): Promise<void> {
    return await ipcRenderer.invoke("set-store-value", key, value);
  }

  static async get(key: StorageKey): Promise<string> {
    return await ipcRenderer.invoke("get-store-value", key);
  }

  static async remove(key: StorageKey) {
    return await this.set(key, "");
  }
}
